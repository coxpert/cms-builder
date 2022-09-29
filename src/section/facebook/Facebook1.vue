<template>
  <div
    class="bz-section-container bz-sec--facebook-1-root"
    :class="{ [breakPoint]: true }"
    :data-section="section.sectionUUID"
  ></div>
</template>

<script>
import sectionMixin from "../../mixins/sectionMixin";

export default {
  mixins: [sectionMixin],
  components: {},
};
</script>
<style lang="scss" scoped>
.bz-sec--facebook-1-root {
}
</style>
