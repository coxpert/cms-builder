<template>
  <div class="w-100 bz-aspect-view position-relative">
    <slot />
  </div>
</template>

<script>
export default {
  name: "BzAspectView",
  props: {
    ratio: {
      type: Number,
      default: 1,
    },
  },
  watch: {
    ratio: {
      immediate: true,
      handler() {
        this.$emit("bzEventAdjustAspectView");
      },
    },
  },
  mounted() {
    const self = this;
    new ResizeObserver(function () {
      self.$emit("bzEventAdjustAspectView");
    }).observe(this.$el);

    this.$on("bzEventAdjustAspectView", function () {
      const self = this;
      const width = self.$el.clientWidth;
      const height = width * this.ratio;
      self.$el.style.height = height + "px";
    });
  },
};
</script>
<style lang="scss">
.bz-aspect-view {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
