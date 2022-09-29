import { mapMutations } from "vuex";

export default {
  data() {
    return {
      appURL: "",
      appDomain: "",
      imageHost: "",
      contact: {
        data: {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          subject: "",
          address: "",
          date: "",
        },
        submitted: false,
        success: false,
      },
    };
  },
  computed: {
    isWebsite() {
      return this.template.domain;
    },
    panelArrow() {
      return this.$store.state.panelArrow;
    },
    loadingData() {
      return this.$store.state.loadingData;
    },
    viewMode() {
      return this.$store.state.viewMode;
    },
    indexOfActivePage() {
      return this.$store.state.indexOfActivePage;
    },
    activePage: {
      get() {
        return this.allPages[this.indexOfActivePage] || {};
      },
      set(val) {
        this.allPages[this.indexOfActivePage] = val;
      },
    },
    template: {
      get() {
        return this.$store.state.template;
      },
      set(value) {
        this.$store.commit("updateTemplate", value);
      },
    },
    moduleUrls() {
      if (this.template) {
        return this.template.module_url;
      }
      return {};
    },
    addPosition: {
      get() {
        return this.$store.state.addPosition;
      },
      set(value) {
        this.setAddPosition(value);
      },
    },
    allPages: {
      get() {
        return this.$store.state.pages;
      },
      set(value) {
        this.updatePages(value);
      },
    },
    activeSections: {
      get() {
        if (this.activePage) {
          return this.activePage.sections || [];
        }
        return [];
      },
      set(val) {
        this.activePage.sections = val;
      },
    },
    header: {
      get() {
        return this.$store.state.header;
      },
      set(value) {
        this.$store.commit("updateHeader", value);
      },
    },
    footer: {
      get() {
        return this.$store.state.footer;
      },
      set(value) {
        this.$store.commit("updateFooter", value);
      },
    },
    activeSection: {
      get() {
        if (this.activePosition === "header") {
          return this.header;
        }
        if (this.activePosition === "footer") {
          return this.footer;
        }
        return this.activeSections[this.activePosition];
      },
      set(val) {
        return (this.activeSections[this.activePosition] = val);
      },
    },
    activeSetting() {
      if (this.activeSection) {
        return this.activeSection.data.setting;
      }
      return null;
    },
    activeCompanyIndex: {
      get() {
        return this.$store.state.activeCompanyIndex;
      },
      set(val) {
        this.$store.commit("setActiveCompanyIndex", val);
      },
    },
    templateSetting: {
      get() {
        return this.$store.state.setting;
      },
      set(val) {
        this.$store.commit("updateTemplateSetting", val);
      },
    },
    isDarkMode() {
      return this.themeMode === "dark";
    },
    isLightMode() {
      return this.themeMode === "light";
    },
    /**
     *  Redefine theme colors based on current selected mode.
     */
    backgroundColor: {
      get() {
        return this.theme[this.theme.mode].backgroundColor;
      },
      set(value) {
        this.theme[this.theme.mode].backgroundColor = value;
      },
    },
    /**
     *  Background setting object of the active section currently selected.
     */
    activeBackground: {
      get() {
        return this.activeSection.data.background || {};
      },
      set(value) {
        this.$store.commit("updateBackground", value);
      },
    },
    /**
     *  Background color of the currently selected section.
     */
    activeBackgroundColor: {
      get() {
        if (this.activeSection.data.background.color) {
          return this.activeSection.data.background.color;
        }
        return this.backgroundColor;
      },
      set(value) {
        this.updateBackground({ color: value });
      },
    },
    /**
     *  Background Type of the action section currently selected
     */
    activeBackgroundType: {
      get() {
        return this.activeSection.data.background.type || "color";
      },
      set(value) {
        this.updateBackground({ type: value });
      },
    },
    /**
     *  Background Vide url of the active section currently selected
     */
    activeBackgroundVideo: {
      get() {
        return this.activeSection.data.background.video;
      },
      set(value) {
        this.updateBackground({ video: value });
      },
    },
    /**
     *  Background pattern url of the active section currently selected.
     */
    activeBackgroundPattern: {
      get() {
        return this.activeSection.data.background.patternName;
      },
      set(value) {
        this.updateBackground({ patternName: value });
      },
    },
    /**
     *  Background overlay color of the active section currently selected.
     */
    activeBackgroundOverlayColor: {
      get() {
        return this.activeBackground.overlayColor;
      },
      set(value) {
        this.activeBackground.overlayColor = value;
        this.activeBackground = window._copy(this.activeBackground);
      },
    },
  },
  mounted() {
    this.imageHost = window.imageHost;
  },
  methods: {
    /**
     *  Validates Email address
     */
    validateEmail(mail) {
      return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail);
    },
    panelArrowAction(action) {
      this.updateLayout(action);
    },
    removeBusiness(index) {
      this.$dialog.confirm().then((res) => {
        if (res) {
          this.templateSetting.businesses.splice(index, 1);
        }
      });
    },
    pageUrl(url) {
      if (window.location.pathname.includes(`/preview/${this.template.slug}`)) {
        if (url) {
          return `/preview/${this.template.slug}/${url}`;
        }
        return `/preview/${this.template.slug}`;
      } else {
        if (url) {
          if (url.startsWith("/")) {
            return url;
          }
          return `/${url}`;
        }
        return "/";
      }
    },
    isActiveMenu(url) {
      if (this.edit) {
        return this.activePage.url === url;
      } else {
        return window.location.pathname === this.pageUrl(url);
      }
    },
    componentFromStr(numStr, percent) {
      const num = Math.max(0, parseInt(numStr, 10));
      return percent
        ? Math.floor((255 * Math.min(100, num)) / 100)
        : Math.min(255, num);
    },
    /**
     *  Returns text color which is contrast to the background color.
     */
    getColor(bgColor) {
      if (!bgColor) {
        bgColor = this.backgroundColor;
      }
      bgColor = bgColor.replace(/ /g, "");
      if (bgColor.includes("rgb")) {
        bgColor = this.rgbToHex(bgColor);
      }
      const color =
        bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
      const r = parseInt(color.substring(0, 2), 16); // hexToR
      const g = parseInt(color.substring(2, 4), 16); // hexToG
      const b = parseInt(color.substring(4, 6), 16); // hexToB
      return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#555555" : "#ffffff";
    },
    rgbToHex(rgb) {
      const rgbRegex =
        /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
      let result;
      let r;
      let g;
      let b;
      let hex = "";
      if ((result = rgbRegex.exec(rgb))) {
        r = this.componentFromStr(result[1], result[2]);
        g = this.componentFromStr(result[3], result[4]);
        b = this.componentFromStr(result[5], result[6]);
        hex =
          "#" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
      }
      return hex;
    },
    getBrightness(color) {
      if (color.includes("rgb")) {
        color = this.rgbToHex(color);
      }
      color = color.replace(/ /g, "").replace("#", "");
      const r = parseInt(color.substring(0, 2), 16);
      const g = parseInt(color.substring(2, 4), 16);
      const b = parseInt(color.substring(4, 6), 16);

      return (299 * r + 587 * g + 114 * b) / 1000;
    },
    isBrighter(color1, color2) {
      return this.getBrightness(color1) > this.getBrightness(color2);
    },
    ...mapMutations({
      updatePages: "updatePages",
    }),
  },
};
