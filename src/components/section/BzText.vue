<template>
  <div class="bz-text-root" :class="{ [theme.paragraphFont]: true, edit }" :style="style" @mousedown="showTextEditor">
    <div :contenteditable="edit" data-editor-element="true" @input="handleContentChange" v-html="content"></div>
  </div>
</template>

<script>
import TextEditor from '../editor/TextEditor'
import elementMixin from '../../mixins/elementMixin'
import Vue from 'vue'

export default {
  name: 'BzText',
  mixins: [elementMixin],
  props: {
    shadow: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: '1em'
    },
    bold: {
      type: Boolean,
      default: false
    },
    mb: {
      type: [Number, String],
      default: '0.5em'
    }
  },
  data() {
    return {
      content: ''
    }
  },
  computed: {
    style() {
      return {
        lineHeight: '1.2em',
        marginBottom: typeof this.mb === 'string' ? this.mb : this.mb + 'px',
        color: this.color,
        textShadow: this.shadow && 'rgba(0, 0, 0, 0.7) 0px 1px 3px',
        fontSize: this.size,
        fontWeight: this.bold ? 'bold' : 'normal'
      }
    }
  },
  created() {
    this.content = this.data
  },
  methods: {
    showTextEditor() {
      if (this.edit) {
        // this.$el.addEventListener('click', function () {
        //   const selection = window.getSelection()
        //   const fontWeight = window.getComputedStyle(selection.anchorNode.parentElement, null).getPropertyValue('font-weight')
        //   console.log(fontWeight)
        // })
        const editorId = 'bz-text-editor-' + this.uuid
        let textEditor = document.getElementById(editorId)
        if (textEditor === null) {
          textEditor = document.createElement('div')
          textEditor.setAttribute('id', editorId)
          const rect = this.$el.getBoundingClientRect()
          document.body.appendChild(textEditor)
          const top = rect.top - 35
          const left = rect.left + 15
          const self = this
          const TextEditorCom = Vue.extend(TextEditor)
          const editor = new TextEditorCom({
            propsData: {
              ...self.$props,
              backgroundColor: self.backgroundColor,
              button: self.$el,
              top,
              left
            },
            store: self.$store
          })
          editor.$mount('#' + editorId)
          editor.$on('input', (value) => {
            self.data = value
          })
        }
      }
    },
    handleContentChange(e) {
      this.$emit('input', e.target.innerHTML)
    }
  }
}
</script>
<style lang="scss">
.bz-text-root {
  &.edit {
    margin: -4px -8px;
    padding: 4px 8px;

    &:focus,
    &:hover {
      outline: solid 2px #0076dfff !important;
    }
  }
}
</style>
