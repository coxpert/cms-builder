import { cloneDeep } from "lodash";
import componentMixin from "./componentMixin";
import themeMixin from "./themeMixin";

export default {
  mixins: [componentMixin, themeMixin],
  props: {
    properties: {
      type: Object,
      default: () => {
        return {};
      },
    },
    edit: {
      type: Boolean,
      default: false,
    },
    preview: {
      type: Boolean,
      default: false,
    },
    position: {
      type: [Number, String],
      default: undefined,
    },
    pageData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      type: "section",
      isSection: true,
      isNewSection: true,
      breakPoint: "bz-xl",
      section: {},
      sectionWidth: 0,
      themeId: null,
    };
  },
  computed: {
    data: {
      get() {
        return this.section.data.data;
      },
      set(val) {
        this.section.data.data = val;
      },
    },
    isActive() {
      if (this.activeSection === null) {
        return this.section === null;
      }
      return this.activeSection.sectionUUID === this.section.sectionUUID;
    },
    setting: {
      get() {
        return this.section.data.setting;
      },
      set(val) {
        this.section.data.setting = val;
      },
    },
    background() {
      return this.section.data.background;
    },
    fullSize() {
      return this.setting.layouts.fullSize || this.setting.layouts.fullWidth;
    },
    sectionSize() {
      return this.setting.layouts.sectionSize;
    },
    backgroundColor() {
      if (
        (this.background.type || "color") === "color" ||
        (this.background.type === "image" && !this.background.image) ||
        (this.background.type === "video" && !this.background.video)
      ) {
        const backgroundColor = this.section.data.background.color;
        if (backgroundColor) {
          return backgroundColor;
        }
      }
      return this.theme[this.themeMode].backgroundColor;
    },
    textColor() {
      return this.$utils.getTextColor(this.backgroundColor, "primaryColor");
    },
    scale() {
      return this.$parent.scale;
    },
  },
  watch: {
    theme: {
      deep: true,
      handler(val) {
        this.setFontSize();
      },
    },
    properties: {
      immediate: true,
      deep: true,
      handler(val) {
        if (this.preview) {
          this.section = cloneDeep(val);
          if (typeof this.section.data.data === "object") {
            if (
              Object.prototype.hasOwnProperty.call(
                this.section.data.data,
                "items"
              )
            ) {
              this.section.data.data.items = this.section.data.data.items.slice(
                0,
                3
              );
            }
          }
        } else {
          this.section = val;
          this.themeId = val.data?.themeId;
        }
      },
    },
  },
  mounted() {
    if (this.$store.state.edit) {
      this.setFontSize();
    }
    const self = this;
    new ResizeObserver(function (entries) {
      const rect = entries[0].contentRect;
      const width = rect.width;
      self.setBreakPoints(width);
    }).observe(self.$el);
  },
  methods: {
    setFontSize() {
      const root = this.$el;
      let rootFontSize = 16;
      switch (this.theme && this.theme.fontSize) {
        case "s":
          rootFontSize = 14;
          break;
        case "m":
          rootFontSize = 16;
          break;
        case "l":
          rootFontSize = 18;
          break;
      }
      root.style.fontSize = rootFontSize + "px";
    },
    setBreakPoints(width) {
      this.sectionWidth = width;
      if (width < 576) {
        this.breakPoint = "bz-xs";
      }
      if (width >= 576) {
        this.breakPoint = "bz-sm";
      }
      if (width >= 768) {
        this.breakPoint += " bz-md";
      }
      if (width >= 992) {
        this.breakPoint += " bz-lg";
      }
      if (width >= 1200) {
        this.breakPoint += " bz-xl";
      }
    },
  },
};
