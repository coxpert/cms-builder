<template>
  <a v-if="edit" href="javascript:void(0)">
    <slot />
  </a>
  <a v-else :href="href">
    <slot />
  </a>
</template>
<script>
import elementMixin from "../../mixins/elementMixin";

export default {
  name: "BzEditorLink",
  mixins: [elementMixin],
  props: {
    href: {
      type: String,
      default: "/",
    },
  },
};
</script>
