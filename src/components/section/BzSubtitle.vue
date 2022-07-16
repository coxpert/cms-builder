<template>
  <div
    style="font-size: 1.25em; line-height: 1em"
    :class="{ [theme.paragraphFont]: true, edit }"
    :style="{ color: color, marginBottom: mb + 'em', textShadow: shadow && 'rgba(0, 0, 0, 0.7) 0px 1px 3px' }"
    class="bz-title-root"
    data-editor-element="true"
    @mousedown="showTextEditor"
  >
    <div :contenteditable="edit" data-editor-element="true" @input="handleContentChange" v-html="content" />
  </div>
</template>

<script>
import elementMixin from '../../mixins/elementMixin'
import BzText from './BzText'

export default {
  name: 'BzSubtitle',
  extends: BzText,
  mixins: [elementMixin],
  props: {
    shadow: {
      type: Boolean,
      default: false
    },
    mb: {
      type: Number,
      default: 0.5
    }
  }
}
</script>
<style lang="scss" scoped>
.bz-title-root {
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
