import componentMixin from "./componentMixin";
import themeMixin from "./themeMixin";

export default {
  mixins: [componentMixin, themeMixin],
  props: {
    value: {
      type: [Object, String, Boolean, Number, Array, Date, undefined],
      default: undefined,
    },
    textColor: {
      type: String,
      default: "",
    },
    editMode: {
      type: Boolean,
      default: undefined,
    },
  },
  data() {
    return {
      color: "black",
      dividerColor: "#808080",
      uuid: null,
    };
  },
  computed: {
    edit() {
      let edit = this.editMode;
      if (typeof edit === "undefined") {
        edit = this.$parent.edit;
      }
      return edit;
    },
    scale() {
      return this.$parent.scale;
    },
    themeId() {
      return this.$parent.themeId;
    },
    pageData() {
      return this.$parent.pageData;
    },
    position() {
      return this.$parent.position;
    },
    backgroundColor() {
      if (this.$parent && this.$parent.backgroundColor) {
        return this.$parent.backgroundColor;
      }
      if (this.$props.backgroundColor) {
        return this.$props.backgroundColor;
      }
      return this.theme[this.themeMode].backgroundColor;
    },
    data: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  watch: {
    backgroundColor: {
      immediate: true,
      handler(value) {
        try {
          if (this.textColor) {
            this.color = this.textColor;
          } else {
            this.color = this.$utils.getTextColor(value);
          }
          const originalColor = window.tinycolor(this.color);
          this.dividerColor = originalColor.brighten(50).toString();
        } catch (error) {
          console.error("Background Color: ", value);
          console.error("Element Mixing backgroundColor watch Error: ", error);
        }
      },
    },
  },
  created() {
    this.uuid = this.$uuid.v4();
  },
};
