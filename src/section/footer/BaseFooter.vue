<script>
import sectionMixin from "../../mixins/sectionMixin";
import themeMixin from "../../mixins/themeMixin";

export default {
  mixins: [sectionMixin, themeMixin],
  computed: {
    lineColor() {
      const color = this.$utils.getTextColor(this.backgroundColor);
      return color.brighten(80);
    },
  },
  watch: {
    textColor: {
      immediate: true,
      handler(value) {
        this.$nextTick(() => {
          this.$el.style.setProperty("--bz-footer-text-color", value);
        });
      },
    },
  },
  methods: {
    handleLogoSizeChange(value) {
      this.setting.logoSize = value;
    },
  },
};
</script>
