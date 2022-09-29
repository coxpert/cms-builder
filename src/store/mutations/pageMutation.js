import { cloneDeep } from "lodash";
import Template from "../../custom/Template";
import defaultTemplate from "@/data/defaultTemplate";

export const pageMutation = {
  setTemplate(state) {
    state.countries = defaultTemplate.countries;
    state.allCategories = defaultTemplate.allCategories;
    state.template = defaultTemplate.template;
    state.moduleCategories = defaultTemplate.moduleCategories;
    state.pages = defaultTemplate.template.pages;
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
  saveAllPages(state, callback) {},
  saveTemplate(state) {},
  duplicatePage(state) {
    const clonePage = cloneDeep(state.pages[state.indexOfActivePage]);
    state.pages.push(clonePage);
    state.pages = cloneDeep(state.pages);
  },
  updatePageStatus(state, pageId) {},
  deletePage(state, pageId) {},
  updatePagesOrder(state) {},
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
