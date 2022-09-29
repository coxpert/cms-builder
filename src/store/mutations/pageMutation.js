import Vue from "vue";
import axios from "axios";
import { cloneDeep } from "lodash";
import Template from "../../custom/Template";

export const pageMutation = {
  setTemplate(state) {
    axios
      .get(Vue.prototype.$config.urls.getWebsiteDataURL)
      .then((res) => {
        if (res.data.success) {
          window.LOG.info("Template data loaded", res.data);
          const template = res.data.template;

          if (template.data) {
            if (template.data.setting) {
              state.setting = template.data.setting;
            }

            if (template.data.theme) {
              state.theme = template.data.theme;
            }

            if (template.data.header) {
              state.header = template.data.header;
            }

            if (template.data.footer) {
              state.footer = template.data.footer;
            }
          }

          state.countries = res.data.countries;
          state.allCategories = res.data.allCategories;
          state.template = template;
          state.moduleCategories = res.data.moduleCategories;
          state.modules = res.data.modules;
          state.pages = template.pages;

          // set active page index, because the first page may be a module page which should not be editable here for now.
          for (let i = 0; i < state.pages.length; i++) {
            if (state.pages[i].type !== "module") {
              state.indexOfActivePage = i;
              break;
            }
          }

          // set theme of the active page
          const activePage = state.pages[state.indexOfActivePage];
          if (
            activePage.data?.themeId &&
            activePage.data.themeId !== state.theme.themeId
          ) {
            const pageTheme = state.theme.savedThemeColors.find((item) => {
              return item.themeId === activePage.data?.themeId;
            });
            state.theme = {
              ...state.theme,
              ...pageTheme,
            };
          }

          setTimeout(() => {
            state.loadingData = false;
          }, 300);
        }
      })
      .catch((err) => {
        window.LOG.error("pageMutation: can't get template data", err);
        state.loadingData = false;
      });
  },
  updatePages(state, payload) {
    if (payload) {
      state.pages = cloneDeep(payload);
    } else {
      state.pages = cloneDeep(state.pages);
    }
  },
  setActivePage(state, payload) {
    if (payload.type !== "module") {
      if (
        typeof payload.index === "number" &&
        payload.index > -1 &&
        payload.index < state.pages.length
      ) {
        state.indexOfActivePage = payload.index;
      } else {
        console.error("Invalid page index", payload.index);
      }
    }
  },
  updateTemplate(state, payload) {
    state.template = cloneDeep(payload);
  },
  updateHeader(state, payload) {
    state.header = cloneDeep(payload);
  },
  updateFooter(state, payload) {
    state.footer = cloneDeep(payload);
  },
  saveAllPages(state, callback) {
    const promise = [];
    const isTemplate = !state.template.domain;
    for (const page of state.pages) {
      if (page.type !== "moduel") {
        const updatePageUrl = isTemplate
          ? window.route("admin.template.page.updatePage", page.id)
          : window.route("user.website.updatePages", page.id);
        if (typeof page.url === "object") page.url = "";
        promise.push(axios.post(updatePageUrl, { ...page }));
      }
    }

    promise.push(storeTemplate(state));

    Promise.all(promise)
      .then((res) => {
        console.log("Successfully saved all pages & template", res);
        if (typeof callback === "function") {
          callback(true);
        }
      })
      .catch((error) => {
        console.error("Failed saving pages: ", error);
        if (typeof callback === "function") {
          callback(false);
        }
      });
  },
  saveTemplate(state) {
    // storeTemplate(state).then(({ success }) => {
    //     if (success) {
    //         window.LOG.success('Saved template successfully')
    //     } else {
    //         window.LOG.error('in updating template')
    //     }
    // })
  },
  duplicatePage(state) {
    const clonePage = cloneDeep(state.pages[state.indexOfActivePage]);
    let url;
    if (state.template.domain) {
      url = window.route("user.website.duplicatePage", clonePage.id);
    } else {
      url = window.route("admin.template.page.duplicatePage", clonePage.id);
    }
    axios
      .post(url)
      .then((res) => {
        const newPage = res.data.data;
        console.log(newPage);
        state.pages.push(newPage);
        state.pages = cloneDeep(state.pages);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  updatePageStatus(state, pageId) {},
  deletePage(state, pageId) {
    if (!pageId) {
      const activePage = cloneDeep(state.pages[state.indexOfActivePage]);
      pageId = activePage.id;
    }
    const deleteUrl = Vue.prototype.$config.urls.deletePageUrl;
    if (!deleteUrl) {
      return console.error("Delete Page Url is undefined");
    }
    axios
      .post(deleteUrl, { pageId })
      .then(() => {
        const indexOfDeletePage = state.indexOfActivePage;
        if (state.indexOfActivePage === state.pages.length - 1) {
          state.indexOfActivePage = state.indexOfActivePage - 1;
        }
        state.pages.splice(indexOfDeletePage, 1);
        state.pages = cloneDeep(state.pages);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  updatePagesOrder(state) {
    const pageIds = (state.pages || []).map((page) => page.id);
    let updateOrderUrl = window.route("admin.template.page.updateOrder");
    if (state.template.domain) {
      updateOrderUrl = window.route("user.website.updatePagesOrder");
    }
    axios
      .post(updateOrderUrl, { ids: pageIds.join(",") })
      .then((res) => {
        if (res.data.status) {
          window.LOG.success("update page order success");
        } else {
          window.LOG.error("update page order failed", res.data);
        }
      })
      .catch((err) => {
        window.LOG.error("update page order failed", err);
      });
  },
  loadStockFavicons(state) {
    axios
      .get(window.route("api.v1.loadStockFavicons"))
      .then((res) => {
        if (res.data.status) {
          window.LOG.success("Load Stack Favicons", res.data.data);
          if (state.stockFavicons && Array.isArray(state.stockFavicons)) {
            state.stockFavicons = state.stockFavicons.concat(
              res.data.data.stockFavicons
            );
          } else {
            state.stockFavicons = res.data.data.stockFavicons;
          }
        } else {
          window.LOG.error("Failed Loading Stack Favicons", res.data.data);
          state.stockFavicons = [];
        }
      })
      .catch((err) => {
        window.LOG.error("Load Stack Favicons", err.message);
        state.stockFavicons = [];
      });
  },
  loadUserFavicons(state) {
    axios
      .get(window.route("api.v1.loadUserFavicons"))
      .then((res) => {
        if (res.data.status) {
          window.LOG.success("Load Stack Favicons", res.data.data);
          if (state.userFavicons && Array.isArray(state.userFavicons)) {
            state.userFavicons = state.userFavicons.concat(
              res.data.data.userFavicons
            );
          } else {
            state.userFavicons = res.data.data.userFavicons;
          }
        } else {
          window.LOG.error("Failed Loading Stack Favicons", res.data.data);
          state.userFavicons = [];
        }
      })
      .catch((err) => {
        window.LOG.error("Load Stack Favicons", err.message);
        state.userFavicons = [];
      });
  },
  loadStockLogos(state, page = 0) {
    axios
      .get(window.route("api.v1.loadStockLogos", { page }))
      .then((res) => {
        if (res.data.status) {
          window.LOG.success("Load Stock Logos", res.data.data);
          if (state.stockLogos && Array.isArray(state.stockLogos)) {
            state.stockLogos = state.stockLogos.concat(
              res.data.data.stockLogos
            );
          } else {
            state.stockLogos = res.data.data.stockLogos;
          }
        } else {
          window.LOG.error("Failed Loading Stock Logos", res.data.data);
          state.stockLogos = [];
        }
      })
      .catch((err) => {
        window.LOG.error("Load Stack Favicons", err.message);
        state.stockLogos = [];
      });
  },
  loadUserLogos(state) {
    axios
      .get(window.route("api.v1.loadUserLogos"))
      .then((res) => {
        if (res.data.status) {
          window.LOG.success("Load User Logos", res.data.data);
          state.userLogos = res.data.data.userLogos;
        } else {
          window.LOG.error("Failed Loading User Logos", res.data.data);
          state.userLogos = [];
        }
      })
      .catch((err) => {
        window.LOG.error("Load User Logos", err.message);
        state.userLogos = [];
      });
  },
  pushTemplate(state, newTemplate) {
    Template.push(cloneDeep(newTemplate));
    state.isRedoAvailable = Template.isRedoAvailable();
    state.isUndoAvailable = Template.isUndoAvailable();
  },
  undoTemplate() {
    const template = Template.undo();
    this.commit("updateStoreTemplateWithAllData", template);
  },
  redoTemplate() {
    const template = Template.redo();
    this.commit("updateStoreTemplateWithAllData", template);
  },
  updateStoreTemplateWithAllData(state, template) {
    if (template) {
      state.template = cloneDeep(template);
      state.setting = state.template.data.setting;
      state.pages = state.template.pages;
      state.theme = state.template.data.theme;
      state.header = state.template.data.header;
      state.footer = state.template.data.footer;
    }
    state.isRedoAvailable = Template.isRedoAvailable();
    state.isUndoAvailable = Template.isUndoAvailable();
    state.refreshEditor = !state.refreshEditor;
  },
};

const storeTemplate = (state) => {
  return new Promise((resolve) => {
    const templateData = {
      ...state.template.data,
      theme: state.theme,
      setting: state.setting,
      header: state.header,
      footer: state.footer,
    };

    if (!Vue.prototype.$config.urls.websiteSaveURL) {
      console.error("Website Save URL is undefined");
      return;
    }

    if (state.template) {
      axios
        .post(Vue.prototype.$config.urls.websiteSaveURL, {
          ...state.template,
          data: templateData,
        })
        .then((res) => {
          if (res.status) {
            resolve({ success: true });
          } else {
            resolve({ success: false });
          }
        })
        .catch((err) => {
          console.log("storeTemplate", err);
          resolve({ success: false });
        });
    }
  });
};
