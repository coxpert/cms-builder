<template>
  <div
    id="bz-text-editor"
    v-click-outside="handleOutsideClick"
    class="text edit-mode bz-text-editor-root"
    :style="{ left: left + 'px', top: top + 'px' }"
    @mousedown.prevent.stop=""
  >
    <div class="item-wrapper" @mousedown.prevent.stop="execAction('bold')">
      <div class="item" :class="{ selected: isBold }"><b>B</b></div>
    </div>
    <div class="item-wrapper" @mousedown.prevent.stop="execAction('italic')">
      <div class="item" :class="{ selected: isItalic }"><i>I</i></div>
    </div>
    <div class="item-wrapper" @mousedown.prevent.stop="execAction('underline')">
      <div class="item" :class="{ selected: isUnderline }"><u>U</u></div>
    </div>

    <bz-divider :background-color="'#fffff'" :vertical="true" :height="20" />

    <div class="item-wrapper" @mousedown.prevent.stop="decreaseFontSize()">
      <div class="item">
        <bz-remove-icon :size="20" fill-color="#555555" />
      </div>
    </div>
    <div class="font-size" @mousedown.prevent.stop="">
      <span>{{ fontSize }}</span>
      px
    </div>

    <div class="item-wrapper" @mousedown.prevent.stop="increaseFontSize()">
      <div class="item">
        <bz-plus-icon :size="20" fill-color="#555555" />
      </div>
    </div>

    <bz-divider :background-color="'#fffff'" :vertical="true" :height="20" />

    <div class="item-wrapper">
      <div class="item" @click="openColorPanel = !openColorPanel">
        <bz-format-color-text-icon :size="20" fill-color="#555555" :color="textColor" />
      </div>
    </div>

    <div v-if="openColorPanel" class="color-panel">
      <template v-for="color in editableColors">
        <div :key="color" class="color-item" @click="handleItemClick(color)">
          <div class="content" :style="{ backgroundColor: color }" :class="{ active: textColor === color }"></div>
        </div>
      </template>
      <div class="color-lens" @click="openTheme">
        <bz-color-lens :size="20" fill-color="#555555" />
      </div>
      <bz-divider :background-color="'#fffff'" :vertical="true" :height="20" />
      <div class="color-item" @click="handleItemClick(customColor)">
        <div class="content" :style="{ backgroundColor: customColor }" :class="{ active: textColor === customColor }"></div>
      </div>
      <div class="colorize" @click="openSketch = !openSketch">
        <bz-colorize-icon :size="20" fill-color="#555555" />
      </div>
      <div v-if="openSketch" class="color-sketch">
        <sketch :value="customColor" @input="setCustomColor" />
      </div>
    </div>
  </div>
</template>

<script>
import editorMixin from '../../mixins/editorMixin'
import BzPlusIcon from '../icons/Plus'
import BzRemoveIcon from '../icons/Remove'
import BzDivider from '../section/BzDivider'
import BzFormatColorTextIcon from '../icons/FormatColorText'
import BzColorLens from '../icons/ColorLens'
import BzColorizeIcon from '../icons/Colorize'
import { Sketch } from 'vue-color'

export default {
  name: 'BzTextEditor',
  components: { BzColorizeIcon, BzColorLens, BzFormatColorTextIcon, BzDivider, BzRemoveIcon, BzPlusIcon, Sketch },
  mixins: [editorMixin],
  data() {
    return {
      elements: [],
      selectionState: null,
      editableElement: null,
      isBold: false,
      isItalic: false,
      isUnderline: false,
      fontSize: 14,
      textColor: '#000000',
      customColor: '#ffffff',
      openSketch: false,
      openColorPanel: false,
      blockContainerElementNames: [
        // elements our editor generates
        'p',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'blockquote',
        'pre',
        'ul',
        'li',
        'ol',
        // all other known block elements
        'address',
        'article',
        'aside',
        'audio',
        'canvas',
        'dd',
        'dl',
        'dt',
        'fieldset',
        'figcaption',
        'figure',
        'footer',
        'form',
        'header',
        'hgroup',
        'main',
        'nav',
        'noscript',
        'output',
        'section',
        'video',
        'table',
        'thead',
        'tbody',
        'tfoot',
        'tr',
        'th',
        'td'
      ]
    }
  },
  created() {
    const self = this
    document.addEventListener('mouseup', function () {
      const selection = document.getSelection()
      if (selection.anchorNode) {
        const computedStyle = window.getComputedStyle(selection.anchorNode.parentElement, null)
        const fontWeight = computedStyle.getPropertyValue('font-weight')
        self.isBold = parseInt(fontWeight) > 400

        const fontStyle = computedStyle.getPropertyValue('font-style')
        self.isItalic = fontStyle === 'italic'

        const decoration = computedStyle.getPropertyValue('text-decoration-line')
        self.isUnderline = decoration === 'underline'

        const fontSize = computedStyle.getPropertyValue('font-size')
        self.fontSize = parseInt(fontSize)

        self.textColor = computedStyle.getPropertyValue('color')
        self.textColor = window.rgbToHex(self.textColor)

        if (!self.editableColors.includes(self.textColor)) {
          self.customColor = self.textColor
        }
      }
    })
  },
  methods: {
    setCustomColor(color) {
      this.customColor = color.hex8
      this.setColor(this.customColor)
    },
    openTheme() {
      this.$el.remove()
      this.openThemeSlider()
    },
    handleItemClick(color) {
      this.openSketch = false
      this.setColor(color)
    },
    setColor(color) {
      this.textColor = color
      const selection = this.exportSelection()
      if (selection.start === selection.end) {
        this.selectAllContents()
      }
      document.execCommand('foreColor', false, color)
      const fontElements = document.getSelection().focusNode.parentNode
      fontElements.removeAttribute('color')
      fontElements.style.color = color
    },
    increaseFontSize() {
      this.fontSize++
      this.execFontSize()
    },
    decreaseFontSize() {
      this.fontSize--
      this.execFontSize()
    },
    execFontSize() {
      const selection = this.exportSelection()
      if (selection.start === selection.end) {
        this.selectAllContents()
      }
      document.execCommand('fontSize', false, '4')
      const fontElements = document.getSelection().focusNode.parentNode
      fontElements.removeAttribute('size')
      fontElements.style.fontSize = this.fontSize + 'px'
    },
    removeAllCss(el, property) {
      el.childNodes.forEach((child) => {
        console.log(child)
        this.removeAllCss(child)
      })
    },
    execAction(action) {
      const selection = this.exportSelection()
      if (selection.start === selection.end) {
        this.selectAllContents()
      }
      document.execCommand(action)
    },
    selectAllContents() {
      const currNode = this.getSelectionElement()
      this.selectElement(currNode)
    },
    selectElement: function (element) {
      this.selectNode(element)
      const selElement = this.getSelectionElement()
      selElement.focus()
    },
    selectNode: function (node) {
      const range = document.createRange()
      range.selectNodeContents(node)
      this.selectRange(range)
    },
    selectRange: function (range) {
      const selection = document.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
    },
    getSelectionElement() {
      const self = this
      return this.findMatchingSelectionParent(function (el) {
        return self.isEditorElement(el)
      })
    },
    exportSelection() {
      const root = this.getSelectionElement()

      const selection = document.getSelection()

      const range = selection.getRangeAt(0)
      const preSelectionRange = range.cloneRange()

      preSelectionRange.selectNodeContents(root)
      preSelectionRange.setEnd(range.startContainer, range.startOffset)

      const start = preSelectionRange.toString().length

      return {
        start: start,
        end: start + range.toString().length
      }
    },
    isEditorElement: function (element) {
      return element && element.getAttribute && element.getAttribute('data-editor-element')
    },
    findMatchingSelectionParent(testElementFunction) {
      const selection = window.getSelection()
      if (selection.rangeCount === 0) {
        return false
      }
      const range = selection.getRangeAt(0)
      const current = range.commonAncestorContainer
      return this.traverseUp(current, testElementFunction)
    },
    traverseUp(current, testElementFunction) {
      if (!current) {
        return false
      }
      do {
        if (current.nodeType === 1) {
          if (testElementFunction(current)) {
            return current
          }
          // do not traverse upwards past the nearest containing editor
          if (this.isEditorElement(current)) {
            return false
          }
        }
        current = current.parentNode
      } while (current)
      return false
    },
    getSelectionRange: function () {
      const selection = document.getSelection()
      if (selection.rangeCount === 0) {
        return null
      }
      return selection.getRangeAt(0)
    },
    rangeSelectsSingleNode: function (range) {
      const startNode = range.startContainer
      return startNode === range.endContainer && startNode.hasChildNodes() && range.endOffset === range.startOffset + 1
    },
    getSelectionStart() {
      const node = document.getSelection().anchorNode
      return node && node.nodeType === 3 ? node.parentNode : node
    },
    isBlockContainer(element) {
      return element && element.nodeType !== 3 && this.blockContainerElementNames.indexOf(element.nodeName.toLowerCase()) !== -1
    }
  }
}
</script>
<style lang="scss">
.bz-text-editor-root {
  margin: -3px -10px;
  position: fixed;
  height: 30px;
  padding: 3px 5px;
  border-right: 4px;
  background-color: white;
  box-shadow: 0 0 20px 5px #00000012;
  display: flex;
  align-items: center;
  z-index: 10001;

  .item-wrapper {
    width: 24px;
    height: 24px;
    border-radius: 2px;
    padding: 4px;
    cursor: pointer;

    &:hover:not(.disabled) {
      background-color: #8080803f;
    }

    &.disabled {
      cursor: not-allowed;
    }

    .item {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      &.selected {
        background-color: #0a6aa13f;
      }

      &.size {
        text-transform: uppercase;
        font-size: 14px;
        color: #555555;
      }

      .outline,
      .fill {
        width: 10px;
        height: 10px;
        margin: 3px;
        padding: 0;
      }

      .fill {
        border-radius: 2px;
        background-color: var(--bz-section-edit-active-color);
      }

      .outline {
        border-radius: 2px;
        background-color: white;
        border: solid 1px #808080;
      }

      &.color {
        position: relative;
        .before {
          content: ' ';
          position: absolute;
          left: 0;
          top: 0;
          background-color: inherit;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          filter: opacity(30%);
          z-index: 1;
        }
      }

      .color {
        width: 12px;
        height: 12px;
        margin: 2px;
        padding: 0;
        border-radius: 6px;
        z-index: 2;
      }
    }
  }

  .font-size {
    width: 40px;
    text-align: center;
    span {
      margin: 0 -6px;
      padding: 0 4px;
      &:focus {
        outline: solid 1px #0076dfff;
      }
    }
  }

  .color-panel {
    position: absolute;
    top: -40px;
    right: 0;
    border-radius: 2px;
    border: solid 1px #8080803f;
    align-items: center;
    padding: 2px;
    background-color: white;
    display: flex;

    .color-item {
      width: 44px;
      padding: 0 2px;

      .content {
        overflow: hidden;
        border-radius: 2px;
        cursor: pointer;
        height: 26px;
        border: solid 1px #00000034;
        width: 100%;

        &:hover {
          outline: solid 2px #3abbfbff;
          border: solid 1px white;
        }

        &.active,
        &:active {
          outline: solid 2px #0076dfff;
          border: solid 1px white;
        }
      }
    }
    .color-lens,
    .colorize {
      width: 26px;
      padding: 0 2px;
      cursor: pointer;
      height: 26px;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background-color: #00000023;
      }
    }
    .color-sketch {
      position: absolute;
      top: 36px;
      right: 0;
    }
  }
}
</style>
