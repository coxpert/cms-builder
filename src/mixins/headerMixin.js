import sectionMixin from "./sectionMixin";

export default {
  mixins: [sectionMixin],
  data() {
    return {
      openMenu: false,
    };
  },
  computed: {
    headerButtonColor() {
      return this.theme[this.themeMode].buttonColor.brighten(30);
    },
    headerStyle() {
      return {
        backgroundColor: this.backgroundColor,
      };
    },
    lineColor() {
      return this.textColor.brighten(80);
    },
  },
  watch: {
    background: {
      deep: true,
      handler() {
        this.setBackground();
      },
    },
    textColor: {
      immediate: true,
      handler(value) {
        this.$nextTick(() => {
          this.$el.style.setProperty("--bz-header-menu-item-color", value);
        });
      },
    },
  },
  mounted() {
    const self = this;
    new ResizeObserver((rect) => {
      self.setBackground();
    }).observe(this.$el);
  },
  methods: {
    toggleMenu() {
      if (!this.edit) {
        this.openMenu = !this.openMenu;
      }
    },
    setBackground() {
      if (!this.preview) {
        if (this.background.connectToSectionBelow) {
          document.documentElement.style.setProperty(
            "--navigate-bar-height",
            this.$el.clientHeight + "px"
          );
        } else {
          document.documentElement.style.setProperty(
            "--navigate-bar-height",
            "0px"
          );
        }
      }
    },
    handleLogoChange(value) {
      this.setting.logoSize = value;
    },
  },
};
