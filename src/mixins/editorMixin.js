import componentMixin from "./componentMixin";
import themeMixin from "./themeMixin";

export default {
  mixins: [componentMixin, themeMixin],
  props: {
    value: {
      required: true,
    },
    left: {
      type: Number,
      default: 0,
    },
    top: {
      type: Number,
      default: 0,
    },
    uuid: {
      type: String,
      required: "",
    },
  },
  created() {
    if (this.value) {
      if (typeof this.data !== "undefined") {
        if (typeof this.value === "object") {
          this.data = { ...this.data, ...this.value };
        }
      } else {
        this.data = this.value;
      }
    }

    window.addEventListener("scroll", () => {
      this.$el.remove();
    });

    this.isIE =
      navigator.appName === "Microsoft Internet Explorer" ||
      (navigator.appName === "Netscape" &&
        /Trident\/.\*rv:([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent) !==
          null);
    this.isEdge = /Edge\/\d+/.exec(navigator.userAgent) !== null;
    this.isMac = window.navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    this.isFF = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  },
  data() {
    return {
      isIE: null,
      isEdge: null,
      isFF: null,
      isMac: null,
    };
  },
  computed: {
    editableBackgroundColors() {
      const originalColors = {
        primaryColor: this.theme[this.themeMode].primaryColor,
        secondaryColor: this.theme[this.themeMode].secondaryColor,
        lightModeColor: this.theme[this.themeMode].lightModeColor,
        darkModeColor: this.theme[this.themeMode].darkModeColor,
      };
      return this.filteredColors(originalColors);
    },
    editableColors() {
      const originalColors = {
        primaryColor: this.theme[this.themeMode].primaryColor,
        secondaryColor: this.theme[this.themeMode].secondaryColor,
        lightModeColor: this.theme[this.themeMode].lightModeColor,
        darkModeColor: this.theme[this.themeMode].darkModeColor,
        whiteColor: "#ffffff",
        blackColor: "#000000",
      };
      return this.filteredColors(originalColors);
    },
  },
  watch: {
    data(value) {
      this.$emit("input", value);
    },
  },
  methods: {
    handleOutsideClick(event) {
      let uuid = null;
      let target = event.target;
      while (target) {
        uuid = target.dataset?.uuid;
        if (uuid) break;
        target = target.parentNode;
      }
      if (this.uuid !== uuid) {
        this.$el.remove();
      }
    },
    filteredColors(colors) {
      const brightNess = [];
      const editableColors = [];
      const brightNessOfBackgroundColor = window.getBrightness(
        this.backgroundColor
      );
      brightNess.push(brightNessOfBackgroundColor);
      for (const colorName in colors) {
        const b = window.getBrightness(colors[colorName]);
        if (brightNess.every((item) => Math.abs(item - b) > 10)) {
          editableColors.push(colors[colorName]);
        }
        brightNess.push(b);
      }
      return editableColors;
    },
  },
};
