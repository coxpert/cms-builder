import confirm from "./confirm";

export default {
  install(Vue) {
    Vue.prototype.$dialog = {
      confirm: async ({ title, description } = {}) => {
        return confirm({
          title: title || "Confirmation",
          description: description || "Are you sure with this action?",
        });
      },
    };

    Vue.prototype.$utils = {
      getTextColor(bgColor, defaultColor = "#ffffff", whiteOrBlack = true) {
        const bgBrightNess = window.getBrightness(bgColor || defaultColor);

        if (whiteOrBlack) {
          if (bgBrightNess < 190) {
            return "#ffffff";
          } else {
            return "#000000";
          }
        }
        if (bgBrightNess < 50) {
          return "#ffffff";
        }
        if (bgBrightNess > 200) {
          return "#000000";
        }
        if (Math.abs(window.getBrightness(defaultColor) - bgBrightNess) > 50) {
          return defaultColor;
        }
        if (
          Math.abs(
            window.getBrightness(this.theme.primaryColor) - bgBrightNess
          ) > 50
        ) {
          return this.theme.primaryColor;
        }
        if (
          Math.abs(
            window.getBrightness(this.theme.secondaryColor) - bgBrightNess
          ) > 50
        ) {
          return this.theme.secondaryColor;
        }
        if (
          Math.abs(
            window.getBrightness(this.theme.darkModeColor) - bgBrightNess
          ) > 50
        ) {
          return this.theme.darkModeColor;
        }
        if (
          Math.abs(
            window.getBrightness(this.theme.lightModeColor) - bgBrightNess
          ) > 50
        ) {
          return this.theme.lightModeColor;
        }
        return window.getColor(bgColor);
      },
    };
  },
};
