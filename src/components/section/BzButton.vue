<template>
  <div class="bz-el--button-root" :class="{ multiple }" :style="{ width: width || 'max-content' }" @click="click">
    <bz-link :link="data.link">
      <div class="button" :style="buttonStyle" :class="{ [buttonSize]: true }" @click="showEditor">
        <div class="w-100 h-100 position-relative d-flex align-items-center justify-content-center">
          <div class="title">
            <i v-if="data.icon" :class="data.icon" style="padding-bottom: 2px" class="mr-1"></i>
            <span :contenteditable="edit" :class="{ edit }" @input="handleTitleEditor">{{ titleText }}</span>
          </div>
        </div>
      </div>
    </bz-link>
  </div>
</template>

<script>
import Vue from 'vue'
import elementMixin from '../../mixins/elementMixin'
import ButtonEditor from '../editor/ButtonEditor'
import { cloneDeep } from 'lodash'
import BzLink from './BzLink'

export default {
  name: 'BzButton',
  components: { BzLink },
  mixins: [elementMixin],
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    last: {
      type: Boolean,
      default: false
    },
    start: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    },
    link: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: ''
    },
    rounded: {
      type: [Boolean, String, Number],
      default: 4
    },
    buttonColor: {
      type: [String],
      default: '#ffffff'
    }
  },
  data() {
    return {
      titleText: '',
      openColorForm: false,
      content: '',
      defaultData: {
        title: 'Button Title',
        size: 's',
        outline: false
      }
    }
  },
  computed: {
    outline: {
      get() {
        return this.data.outline
      },
      set(val) {
        this.data.outline = val
        this.data = cloneDeep(this.data)
      }
    },
    size: {
      get() {
        return this.data.size
      },
      set(val) {
        this.data.size = val
        this.data = cloneDeep(this.data)
      }
    },
    buttonBackgroundColor() {
      return this.outline ? 'transparent' : this.data.backgroundColor || this.buttonColor || this.theme.primaryColor
    },
    buttonSize() {
      return this.data.size || 's'
    },
    buttonStyle() {
      return {
        backgroundColor: this.buttonBackgroundColor,
        color: this.getColor(this.buttonBackgroundColor),
        borderStyle: 'solid',
        borderRadius: this.rounded === true ? '1000px' : this.rounded + 'px',
        borderColor: this.data.backgroundColor || this.theme.primaryColor,
        ...(this.width ? { width: this.width } : {})
      }
    }
  },
  watch: {
    data: {
      deep: true,
      handler(val) {
        if (this.content !== val.title) {
          this.titleText = val.title
          this.content = val.title
        }
      }
    }
  },
  mounted() {
    this.titleText = this.data.title
  },
  methods: {
    click() {
      this.$emit('click')
    },
    showEditor() {
      if (this.edit) {
        const editorId = 'bz-button-editor-' + this.uuid
        let buttonEditor = document.getElementById(editorId)
        if (buttonEditor === null) {
          buttonEditor = document.createElement('div')
          buttonEditor.setAttribute('id', editorId)
          const rect = this.$el.getBoundingClientRect()
          document.body.appendChild(buttonEditor)
          const top = rect.top - 40
          const left = rect.left
          const self = this
          const ButtonEditorClass = Vue.extend(ButtonEditor)
          const editor = new ButtonEditorClass({
            propsData: {
              ...self.$props,
              backgroundColor: self.backgroundColor,
              button: self.$el,
              top,
              left,
              value: self.data
            },
            store: self.$store
          })
          editor.$mount('#' + editorId)
          editor.$on('input', (value) => {
            self.data = value
          })
          editor.$on('add', (index) => {
            self.$emit('add', index)
          })
          editor.$on('delete', (index) => {
            self.$emit('delete', index)
          })
          editor.$on('swap', (index1, index2) => {
            self.$emit('swap', index1, index2)
          })
        }
      }
    },
    handleTitleEditor(e) {
      this.content = e.target.innerText
      this.data.title = e.target.innerText
      this.data = cloneDeep(this.data)
    }
  }
}
</script>
<style lang="scss" scoped>
.bz-el--button-root {
  width: max-content;
  display: flex;
  position: relative;
  cursor: pointer;

  &.multiple {
    margin-right: 10px;
    margin-top: 10px;
  }

  .button {
    &.s {
      padding: 6px 15px;
      font-size: 14px;
    }

    &.m {
      padding: 6px 25px;
      font-size: 16px;
    }

    &.l {
      padding: 6px 35px;
      font-size: 18px;
    }

    .title:first-child {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        padding: 2px;
        border: solid 2px transparent;
        border-radius: 2px;

        &.edit {
          cursor: text;
          &:focus,
          &:active,
          &:hover {
            border: solid 2px var(--bz-section-edit-active-color);
            transition: border 0.5s;
          }
        }
      }
    }
  }
}
</style>
