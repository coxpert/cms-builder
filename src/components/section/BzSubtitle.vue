<template>
  <div
    style="font-size: 1.25em"
    :class="{ [theme.paragraphFont]: true, edit }"
    :style="{
      color: color,
      textShadow: shadow && 'rgba(0, 0, 0, 0.7) 0px 1px 3px',
    }"
    class="bz-subtitle-root"
    data-editor-element="true"
    @mousedown="showTextEditor"
  >
    <div
      :contenteditable="edit"
      :data-uuid="uuid"
      data-editor-element="true"
      :data-refresh="refresh"
      @input="handleContentChange"
      v-html="content"
    />
  </div>
</template>

<script>
import elementMixin from "../../mixins/elementMixin";
import BzText from "./BzText";

export default {
  name: "BzSubtitle",
  extends: BzText,
  mixins: [elementMixin],
  props: {
    shadow: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
.bz-subtitle-root {
  &.edit {
    margin: -4px -8px;
    padding: 4px 8px;

    &:focus,
    &:active,
    &:focus-visible,
    &:focus-within,
    &:hover {
      outline: solid 2px #0076dfff;
    }
  }
}
</style>
