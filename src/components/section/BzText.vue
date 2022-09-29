<template>
  <div
    class="bz-text-root"
    :class="{ [theme.paragraphFont]: true, edit }"
    :style="style"
    @mousedown="showTextEditor"
  >
    <div
      :data-uuid="uuid"
      :contenteditable="edit"
      data-editor-element="true"
      :data-empty="!data"
      :data-refresh="refresh"
      @input="handleContentChange"
      v-html="content"
    ></div>
  </div>
</template>

<script>
import TextEditor from "../editor/TextEditor";
import elementMixin from "../../mixins/elementMixin";
import Vue from "vue";

export default {
  name: "BzText",
  mixins: [elementMixin],
  props: {
    shadow: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "1em",
    },
    bold: {
      type: Boolean,
      default: false,
    },
    mb: {
      type: [Number, String],
      default: "0.5em",
    },
    link: {
      type: [Boolean, Object],
      default: false,
    },
    withLink: {
      type: [Boolean],
      default: false,
    },
  },
  data() {
    return {
      content: "",
    };
  },
  computed: {
    style() {
      return {
        color: this.color,
        textShadow: this.shadow && "rgba(0, 0, 0, 0.7) 0px 1px 3px",
        fontSize: this.size,
        fontWeight: this.bold ? "bold" : "normal",
      };
    },
    refresh() {
      return this.$store.state.refreshEditor;
    },
  },
  watch: {
    refresh() {
      this.content = this.data;
    },
    indexOfActivePage() {
      this.content = this.data;
    },
  },
  created() {
    this.content = this.data;
  },
  methods: {
    showTextEditor() {
      if (this.edit) {
        const editorId = "bz-text-editor-" + this.uuid;
        let textEditor = document.getElementById(editorId);
        if (textEditor === null) {
          textEditor = document.createElement("div");
          textEditor.setAttribute("id", editorId);
          const rect = this.$el.getBoundingClientRect();
          document.body.appendChild(textEditor);
          const top = rect.top - 35;
          const left = rect.left + 15;
          const self = this;
          const TextEditorCom = Vue.extend(TextEditor);
          const editor = new TextEditorCom({
            propsData: {
              ...self.$props,
              backgroundColor: self.backgroundColor,
              uuid: this.uuid,
              top,
              left,
              link: this.link,
              withLink: this.withLink,
            },
            store: self.$store,
          });
          editor.$mount("#" + editorId);
          editor.$on("input", (value) => {
            self.data = value;
          });
          editor.$on("changeLink", (newLink) => {
            self.$emit("changeLink", newLink);
          });
        }
      }
    },
    handleContentChange(e) {
      this.$nextTick(() => {
        this.$emit("input", e.target.innerHTML);
      });
    },
  },
};
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

    & > div {
      min-width: 10px;
      cursor: text;

      &[data-empty="true"] {
        width: 104px;
        position: relative;

        &:after {
          content: "Type your text";
          position: absolute;
          color: grey;
          font-style: italic;
        }
      }
    }
  }
}
</style>
