<template>
  <div
    :id="'bz-button-editor-' + uuid"
    v-click-outside="handleOutsideClick"
    :style="{ left: left + 'px', top: top + 'px' }"
    class="bz-button-editor-root"
  >
    <template v-if="link">
      <div class="item-wrapper">
        <div class="item link" @click="openLink">
          <link-icon :fill-color="'#555555'" :size="20" />
        </div>
      </div>
      <bz-divider :background-color="'#fffff'" :vertical="true" :height="20" />
    </template>

    <div class="item-wrapper" @click.prevent="size = 's'">
      <div class="item size small" :class="{ selected: size === 's' }">S</div>
    </div>

    <div class="item-wrapper" @click.prevent="size = 'm'">
      <div class="item size medium" :class="{ selected: size === 'm' }">M</div>
    </div>

    <div class="item-wrapper" @click.prevent="size = 'l'">
      <div class="item size large" :class="{ selected: size === 'l' }">L</div>
    </div>

    <bz-divider :background-color="'#fffff'" :vertical="true" :height="20" />

    <div class="item-wrapper" @click.prevent="outline = false">
      <div class="item" :class="{ selected: !outline }">
        <div class="fill" />
      </div>
    </div>

    <div class="item-wrapper" @click.prevent="outline = true">
      <div class="item" :class="{ selected: outline }">
        <div class="outline" />
      </div>
    </div>

    <bz-divider :background-color="'#fffff'" :vertical="true" :height="20" />

    <div class="item-wrapper" @click.prevent.stop="openColorForm = true">
      <div class="item color">
        <div
          class="before"
          :style="{ backgroundColor: colorItemOpacityBackground }"
        ></div>
        <div
          class="color"
          :style="{
            backgroundColor: data.backgroundColor || theme.primaryColor,
          }"
        />
      </div>
    </div>

    <bz-divider :background-color="'#fffff'" :vertical="true" :height="20" />

    <div class="item-wrapper" @click="openIconSelector">
      <div class="item icon">
        <dvr-icon :size="16" :fill-color="'#555555'" />
      </div>
    </div>

    <bz-divider :background-color="'#fffff'" :vertical="true" :height="20" />

    <template v-if="multiple">
      <div class="item-wrapper" @click="handleAddButton">
        <div class="item icon">
          <add-icon :size="16" :fill-color="'#555555'" />
        </div>
      </div>

      <div class="item-wrapper" @click="handleRemoveButton">
        <div class="item icon">
          <bz-delete-icon :size="16" :fill-color="'#555555'" />
        </div>
      </div>

      <bz-divider :background-color="'#fffff'" :vertical="true" :height="20" />

      <div
        v-tooltip="'Move Button'"
        class="item-wrapper"
        :class="{ disabled: start }"
        @click="moveToLeft"
      >
        <div class="item icon">
          <arrow-back-icon
            :size="16"
            :fill-color="start ? '#8080807f' : '#555555'"
          />
        </div>
      </div>

      <div
        v-tooltip="'Move Button'"
        class="item-wrapper"
        :class="{ disabled: last }"
        @click="moveToRight"
      >
        <div class="item icon">
          <arrow-forward-icon
            :size="16"
            :fill-color="last ? '#8080807f' : '#555555'"
          />
        </div>
      </div>
    </template>

    <div
      v-if="openColorForm"
      v-click-outside="closeColorForm"
      class="color-form-root"
    >
      <template v-for="color of editableBackgroundColors">
        <div
          :key="color"
          class="color-item-wrapper"
          @click.prevent="handleChangeColor(color)"
        >
          <div class="color-item" :style="editColorItemStyle(color)"></div>
        </div>
      </template>
      <div class="color-lens">
        <div class="color-item palette" @click="handleOpenTheme">
          <palette-icon :size="20" :fill-color="'#555555'" />
        </div>
      </div>
      <bz-divider :background-color="'#fffff'" :vertical="true" :height="20" />
      <div
        class="color-item-wrapper"
        @click.prevent="handleChangeColor(customColor)"
      >
        <div class="color-item" :style="editColorItemStyle(customColor)"></div>
      </div>
      <div class="color-lens">
        <div class="color-item palette" @click="openSketch = !openSketch">
          <bz-colorize-icon :size="20" :fill-color="'#555555'" />
        </div>
      </div>
      <div v-if="openSketch" class="color-sketch">
        <sketch :value="customColor" @input="setCustomColor" />
      </div>
    </div>
  </div>
</template>

<script>
import BzDivider from "../section/BzDivider";
import DvrIcon from "../icons/Dvr";
import AddIcon from "../icons/Add";
import ArrowBackIcon from "../icons/ArrowBack";
import ArrowForwardIcon from "../icons/ArrowForward";
import PaletteIcon from "../icons/Palette";
import LinkIcon from "../icons/Link";
import { cloneDeep } from "lodash";
import { mapMutations } from "vuex";
import editorMixin from "../../mixins/editorMixin";
import BzColorizeIcon from "../icons/Colorize";
import { Sketch } from "vue-color";
import BzDeleteIcon from "../icons/Delete";

export default {
  name: "ButtonEditor",
  components: {
    BzDeleteIcon,
    BzColorizeIcon,
    LinkIcon,
    Sketch,
    PaletteIcon,
    ArrowForwardIcon,
    ArrowBackIcon,
    AddIcon,
    DvrIcon,
    BzDivider,
  },
  mixins: [editorMixin],
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    last: {
      type: Boolean,
      default: false,
    },
    start: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      default: 0,
    },
    link: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: "",
    },
    rounded: {
      type: [Boolean, String, Number],
      default: 4,
    },
    buttonColor: {
      type: [String],
      default: "#ffffff",
    },
    button: {
      type: [HTMLElement],
      required: true,
    },
  },
  data() {
    return {
      titleText: "",
      openColorForm: false,
      content: "",
      customColor: "#ffffff",
      openSketch: false,
      data: {
        title: "Button Title",
        size: "s",
        outline: false,
      },
    };
  },
  computed: {
    outline: {
      get() {
        return this.data.outline;
      },
      set(val) {
        this.data.outline = val;
        this.data = cloneDeep(this.data);
      },
    },
    size: {
      get() {
        return this.data.size;
      },
      set(val) {
        this.data.size = val;
        this.data = cloneDeep(this.data);
      },
    },
    colorItemOpacityBackground() {
      const originalColor = window.tinycolor(
        this.data.backgroundColor || this.theme.primaryColor
      );
      return originalColor.darken(30).toString();
    },
    buttonBackgroundColor() {
      return this.outline
        ? "transparent"
        : this.data.backgroundColor ||
            this.buttonColor ||
            this.theme.primaryColor;
    },
    buttonSize() {
      return this.data.size || "s";
    },
    buttonStyle() {
      return {
        backgroundColor: this.buttonBackgroundColor,
        color: this.getColor(this.buttonBackgroundColor),
        borderStyle: "solid",
        borderRadius: this.rounded === true ? "1000px" : this.rounded + "px",
        borderColor: this.data.backgroundColor || this.theme.primaryColor,
        ...(this.width ? { width: this.width } : {}),
      };
    },
  },
  methods: {
    handleOpenTheme() {
      this.$el.remove();
      this.openThemeSlider();
    },
    setCustomColor(color) {
      this.customColor = color.hex8;
      this.handleChangeColor(this.customColor);
    },
    openLink() {
      this.openModal({
        name: "attachLinkModal",
        data: this.data.link,
        onChange: (link) => {
          this.data = { ...this.data, link };
        },
      });
    },
    editColorItemStyle(color) {
      return {
        backgroundColor: color,
        border: "solid 1px #8080803f",
      };
    },
    handleChangeColor(color) {
      this.data.backgroundColor = color;
      this.data = cloneDeep(this.data);
    },
    closeEditor() {
      this.editing = false;
    },
    closeColorForm() {
      this.openColorForm = false;
    },
    openIconSelector() {
      this.$el.remove();
      this.$store.commit("openModal", {
        name: "iconSelector",
        onChange: (icon) => {
          this.data.icon = icon;
          this.data = cloneDeep(this.data);
        },
      });
    },
    handleAddButton() {
      this.$emit("add", this.index);
    },
    handleRemoveButton() {
      this.$el.remove();
      this.$emit("delete", this.index);
    },
    moveToRight() {
      if (!this.last) {
        this.editing = false;
        this.$emit("swap", this.index, this.index + 1);
      }
    },
    moveToLeft() {
      if (!this.first) {
        this.editng = false;
        this.$emit("swap", this.index, this.index - 1);
      }
    },
    ...mapMutations(["openModal"]),
  },
};
</script>

<style lang="scss" scoped>
.bz-button-editor-root {
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
          content: " ";
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

  .color-form-root {
    position: absolute;
    top: -40px;
    right: 0;
    border-radius: 2px;
    border: solid 1px #8080803f;
    align-items: center;
    padding: 2px;
    background-color: white;
    display: flex;

    .color-item-wrapper {
      width: 44px;
      padding: 0 2px;

      .color-item {
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
