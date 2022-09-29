import { createStore } from "vuex";
import mutations from "./mutations";
import { getters } from "./getters";
import { actions } from "./actions";
import defaultTheme from "../data/defaultTheme";
import defaultSetting from "../data/defaultSetting";
import defaultHeader from "../data/defaultHeader";
import defaultFooter from "../data/defaultFooter";

export default createStore({
  state: {
    template: null,
    allCategories: [],
    pages: [],
    indexOfActivePage: 0,
    activePosition: "header",
    addPosition: null,
    viewMode: "desktop",
    edit: false,
    openSlider: false,
    activeSlider: "sections",
    activeTab: 0,
    activeSubTab: "",
    panelArrow: "",
    activeCompanyIndex: 0,
    background: { color: "#fafafa" },
    loading: false,
    loadingData: true,
    stockImages: null,
    userFavicons: null,
    stockFavicons: null,
    userLogos: null,
    stockLogos: null,
    unsplashApiKey: window.unsplashApiKey,
    isUndoAvailable: false,
    isRedoAvailable: false,
    refreshEditor: false,
    countries: [],
    scrollToActiveSection: false,
    moduleCategories: {
      activeModules: null,
    },
    modules: null,
    modals: {
      openPageSettingModal: false,
      basic: {
        name: null,
        value: null,
        onChange: null,
      },
      embedLink: {
        open: false,
        value: "",
        onChange: function (value) {
          console.log("embed link", value);
        },
      },
      manageMarkers: {
        open: false,
        value: [],
        onChange: function (value) {
          console.log("manage markers", value);
        },
      },
      promotion: {
        open: false,
        value: {
          successMessage: {
            title: "",
            message: "",
            footNote: "",
          },
          permissionMessage:
            "By submitting your information, you are granting us permission to email you. You may unsubscribe at any time",
        },
        onChange: function (value) {
          console.log("promotion", value);
        },
      },
      subscribe: {
        open: false,
        value: {
          formAddress: "",
          successMessage: {
            title: "",
            message: "",
            footNote: "",
          },
          permissionMessage:
            "By submitting your information, you are granting us permission to email you. You may unsubscribe at any time",
        },
        onChange: function (value) {
          console.log("subscribe", value);
        },
      },
      youtubeVideo: {
        open: false,
        value: {
          source: "",
          setting: {
            autoPlay: false,
            loop: false,
            controls: true,
          },
        },
        onChange: function (value) {
          console.log("youtube video", value);
        },
      },
      openedModals: [],
      contactFormSetting: {
        open: false,
        form: {
          formFields: {
            firstName: {
              label: "First Name",
              enabled: true,
            },
            lastName: {
              label: "Last Name",
              enabled: true,
            },
            subject: {
              label: "Subject",
              enabled: true,
            },
            message: {
              label: "Message",
              enabled: true,
            },
            email: {
              label: "Email",
              enabled: true,
            },
            phone: {
              label: "Phone",
              enabled: true,
            },
            date: {
              label: "Date",
              enabled: true,
            },
            address: {
              label: "Address",
              enabled: true,
            },
          },
          formAddress: "",
          successMessage: {
            title: "Message Sent!",
            message:
              "Your message has been sent successfully, I hope to respond within 24 hours. You can also contact us through social media, links can be found below!",
          },
          permissionMessage:
            "By checking this box and submitting your information, you are granting us permission to email you. You may unsubscribe at any time.",
        },
        onChange: function (value) {
          console.log("alt text", value);
        },
      },
      timePicker: {
        open: false,
        time: "00:00 am",
        onChange: (val) => {
          console.log(val);
        },
      },
    },
    // page setting
    theme: defaultTheme,
    defaultTheme: defaultTheme,
    setting: defaultSetting,
    header: defaultHeader,
    footer: defaultFooter,
  },
  mutations: mutations,
  getters: getters,
  actions: actions,
});
