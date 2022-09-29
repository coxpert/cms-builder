<template>
  <div class="bz-el-logo-root">
    <a
      :href="url"
      class="d-flex align-items-center justify-content-center h-100"
    >
      <template v-if="template.logo">
        <size-editor
          v-model="_logoSize"
          :direction="resizeDirection"
          initial-width="140px"
          class="h-100"
        >
          <img class="web-logo mr-2" :src="template.logo" alt="Logo" />
        </size-editor>
      </template>
      <bz-title
        v-if="title"
        v-model="template.data.name"
        style="white-space: nowrap"
        :mb="0"
      />
    </a>
  </div>
</template>

<script>
import BzTitle from "./BzTitle";
import elementMixin from "../../mixins/elementMixin";
import SizeEditor from "../editor/SizeEditor";
export default {
  name: "BzLogo",
  components: { SizeEditor, BzTitle },
  mixins: [elementMixin],
  props: {
    title: {
      type: Boolean,
      default: true,
    },
    logoSize: {
      type: [Object, Array],
      default: () => {
        return {
          width: undefined,
          height: undefined,
        };
      },
    },
    resizeDirection: {
      type: String,
      default: "right-bottom",
    },
  },
  computed: {
    _logoSize: {
      get() {
        return this.logoSize;
      },
      set(value) {
        this.$emit("changeSize", value);
      },
    },
    url() {
      if (this.edit) {
        return "javascript:void(0)";
      }
      return "/";
    },
    template() {
      return this.$store.state.template;
    },
  },
};
</script>

<style lang="scss" scoped>
.bz-el-logo-root {
  width: max-content;
  max-width: 100%;

  a:hover {
    text-decoration: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
