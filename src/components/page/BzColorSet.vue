<template>
  <div class="theme-colors">
    <div
      class="color-item"
      :style="{ backgroundColor: backgroundColor }"
      @click.prevent="$emit('input', '')"
    ></div>
    <div
      class="color-item"
      :style="{ backgroundColor: theme[themeMode].primaryColor }"
      @click.prevent="$emit('input', theme[themeMode].primaryColor)"
    ></div>
    <div
      class="color-item"
      :style="{ backgroundColor: theme[themeMode].secondaryColor }"
      @click.prevent="$emit('input', theme[themeMode].secondaryColor)"
    ></div>
    <div
      ref="customColorRef"
      class="color-item"
      :style="{ backgroundColor: value }"
      @click.prevent="handleClick"
    >
      <div
        v-if="openEditor"
        ref="editorRef"
        v-click-outside="closeEditor"
        class="position-fixed"
        style="z-index: 9999999"
      >
        <Sketch :value="value" @input="updateColor" />
      </div>
    </div>
  </div>
</template>

<script>
import componentMixin from "../../mixins/componentMixin";
import { Sketch } from "vue-color";
import themeMixin from "../../mixins/themeMixin";

export default {
  name: "BzColorSet",
  components: { Sketch },
  mixins: [componentMixin, themeMixin],
  props: {
    value: {
      type: String,
      default: "#ffffff",
    },
  },
  data() {
    return {
      openEditor: false,
    };
  },
  methods: {
    closeEditor() {
      this.openEditor = false;
    },
    updateColor(color) {
      this.$emit("input", color.hex8);
    },
    handleClick(e) {
      this.openEditor = true;
      this.$nextTick(() => {
        const rect = this.$refs.customColorRef.getBoundingClientRect();
        this.$refs.editorRef.style.right =
          window.innerWidth - rect.right + "px";
        this.$refs.editorRef.style.top = rect.bottom + 5 + "px";
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.theme-colors {
  width: 100%;
  display: flex;
  .color-item {
    width: max(50px, 23%);
    height: 34px;
    border-radius: 4px;
    border: solid 1px #8080803f;
    outline: solid 2px transparent;
    position: relative;
    cursor: pointer;
    margin-left: 2px;

    &:hover {
      outline: solid 2px rgb(157, 222, 255);
      border: solid 1px white;
    }
  }
}
</style>
