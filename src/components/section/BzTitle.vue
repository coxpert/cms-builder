<template>
  <div
    style="font-size: 1.5em; line-height: 1em; display: flex; align-items: center; font-weight: bold"
    :class="{ [theme.titleFont]: true, edit }"
    :style="{ color: color, marginBottom: mb + 'em', textShadow: shadow && 'rgba(0, 0, 0, 0.7) 0px 1px 3px', fontSize: size }"
    class="bz-title-root"
    @mousedown="showTextEditor"
  >
    <div :contenteditable="edit" data-editor-element="true" @input="handleContentChange" v-html="content"></div>
  </div>
</template>

<script>
import elementMixin from '../../mixins/elementMixin'
import BzText from './BzText'

export default {
  name: 'BzTitle',
  extends: BzText,
  mixins: [elementMixin],
  props: {
    mb: {
      type: Number,
      default: 0.5
    },
    shadow: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: '24px'
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
    &:hover {
      outline: solid 2px #0076dfff;
    }
  }
}
</style>
