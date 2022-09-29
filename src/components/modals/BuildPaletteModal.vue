<template>
  <modal
    :classes="['build-palette-modal']"
    name="build-palette-modal"
    @closed="onClose()"
  >
    <preset-theme-name-modal
      v-if="openThemeNameModal"
      @close="openThemeNameModal = false"
      @confirm="onSave"
    />
    <div
      style="background-color: rgb(246, 246, 246)"
      class="d-flex p-3 justify-content-between"
    >
      <h5>Build template.</h5>
      <div class="cursor-pointer" @click.prevent="onClose()">
        <CloseIcon />
      </div>
    </div>
    <div class="w-100 h-100">
      <div class="col-12 h-100">
        <p>
          Build your color template by selecting one from the following colors?
        </p>
        <div class="theme-colors-wrap">
          <div class="theme-color-labels">
            <div><small>Background</small></div>
            <div><small>Buttons</small></div>
            <div><small>Social Icon</small></div>
            <div><small>Headings</small></div>
            <div><small>Boxes</small></div>
            <div><small>Secondary</small></div>
          </div>
          <div class="theme-colors">
            <div
              class="theme-color-item"
              @click="activeColor = 'backgroundColor'"
            >
              <div
                :style="{ backgroundColor: backgroundColor }"
                :class="{ active: activeColor === 'backgroundColor' }"
              />
            </div>
            <div class="theme-color-item" @click="activeColor = 'buttonColor'">
              <div
                :style="{ backgroundColor: theme[themeMode].buttonColor }"
                :class="{ active: activeColor === 'buttonColor' }"
              />
            </div>
            <div
              class="theme-color-item"
              @click="activeColor = 'socialIconColor'"
            >
              <div
                :style="{ backgroundColor: theme[themeMode].socialIconColor }"
                :class="{ active: activeColor === 'socialIconColor' }"
              />
            </div>
            <div class="theme-color-item" @click="activeColor = 'headingColor'">
              <div
                :style="{ backgroundColor: theme[themeMode].headingColor }"
                :class="{ active: activeColor === 'headingColor' }"
              />
            </div>
            <div class="theme-color-item" @click="activeColor = 'boxColor'">
              <div
                :style="{ backgroundColor: theme[themeMode].boxColor }"
                :class="{ active: activeColor === 'boxColor' }"
              />
            </div>
            <div
              class="theme-color-item"
              @click="activeColor = 'secondaryColor'"
            >
              <div
                :style="{ backgroundColor: theme[themeMode].secondaryColor }"
                :class="{ active: activeColor === 'secondaryColor' }"
              />
            </div>
          </div>
        </div>
        <template v-if="theme.paletteImage">
          <div class="d-flex justify-content-end">
            <div
              class="p-2 theme-control-item"
              @click="refreshAdvancedThemColors"
            >
              <i class="fa fa-refresh"></i>
              Refresh
            </div>
          </div>
        </template>
        <div class="mt-2">
          <div class="d-flex pt-3">
            <md-radio v-model="pickerType" value="swatch" class="mb-2"
              >Color Swatch</md-radio
            >
            <md-radio v-model="pickerType" value="image" class="mb-2"
              >Color Image</md-radio
            >
          </div>
        </div>
        <div
          v-if="pickerType === 'swatch' && theme.advancedColorAvailableList"
          class="colors-wrap"
        >
          <div
            v-for="(color, index) of theme.advancedColorAvailableList"
            :key="index"
            class="color-item"
            :style="{ backgroundColor: color }"
            :class="{ active: isActiveColor(color) }"
            @click="handleColorItemClick(color)"
          ></div>
        </div>
        <div v-else class="d-flex flex-column">
          <image-selector
            v-model="theme.paletteImage"
            :preview="false"
            :crop="false"
            :from-modal="true"
            :encode-base64="false"
          />
          <div
            class="d-flex justify-content-center align-items-center position-relative mt-2"
          >
            <canvas
              ref="canRef"
              class="canvas"
              :style="{ opacity: loading || processing ? 0.3 : 1 }"
              style="cursor: crosshair"
              @mousedown="mouseDownHandler"
              @mouseup="mouseDown = false"
              @mousemove="pickCanvasColor"
            ></canvas>
            <bz-spinner
              v-if="loading"
              class="position-absolute"
              style="margin-right: 5px"
            />
          </div>
        </div>
      </div>
    </div>
    <hr style="margin-top: auto" />
    <div class="w-100 d-flex justify-content-end pb-2">
      <button
        class="btn btn-secondary mr-2 d-flex align-items-center"
        @click="onClose"
      >
        <b>Close</b>
      </button>
      <button
        class="btn bz-btn-default mr-2 d-flex align-items-center"
        @click="openThemeNameModal = true"
      >
        <b>Save</b>
      </button>
    </div>
  </modal>
</template>

<script>
import CloseIcon from "../icons/Close";
import componentMixin from "../../mixins/componentMixin";
import BzSpinner from "../page/BzSpinner";
import themeMixin from "../../mixins/themeMixin";
import ImageSelector from "../elements/ImageSelector";
import PresetThemeNameModal from "./PresetThemeNameModal";

export default {
  name: "BuildPaletteModal",
  components: { PresetThemeNameModal, ImageSelector, BzSpinner, CloseIcon },
  mixins: [componentMixin, themeMixin],
  data() {
    return {
      activeColor: "backgroundColor",
      pickerType: "swatch",
      mouseDown: false,
      canvas: null,
      context: null,
      // rendering image to canvas
      loading: false,
      // swatching color palette is in progress
      processing: false,
      openThemeNameModal: false,
    };
  },
  computed: {
    paletteImage() {
      return this.theme.paletteImage;
    },
    theme() {
      return this.$store.state.theme;
    },
  },
  watch: {
    pickerType(value) {
      if (value === "image") {
        this.$nextTick(() => {
          this.renderImage();
        });
      }
    },
    paletteImage(value) {
      if (this.pickerType === "image") {
        this.renderImage();
      }
      this.getColorPaletteFromImage(value);
    },
  },
  mounted() {
    this.$modal.show("build-palette-modal");
  },
  methods: {
    onSave(themeName) {
      this.addAdvancedThemeTemplate(themeName);
      this.onClose();
    },
    onClose() {
      this.$emit("close");
    },
    renderImage() {
      try {
        this.loading = true;
        const img = new Image();
        img.crossOrigin = "Anonymous";
        const canvas = this.$refs.canRef;
        const context = canvas.getContext("2d");

        this.canvas = canvas;
        this.context = context;
        const self = this;
        img.onload = function () {
          canvas.width = this.width;
          canvas.height = this.height;

          const oldWidth = canvas.width;
          context.drawImage(this, 0, 0);
          canvas.width = 370;
          canvas.height = (canvas.height * canvas.width) / oldWidth;

          context.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            0,
            0,
            canvas.width,
            canvas.height
          );
          self.loading = false;
        };
        img.onerror = function (error) {
          console.error("Palette Image rendering Error: ", error);
          console.error("Palette Image Url", this.theme.paletteImage);
        };
        img.src = this.theme.paletteImage + "?1";
      } catch (error) {
        console.error("Build Palette Modal: couldn't render image", error);
      }
    },
    handleColorItemClick(color) {
      this.theme[this.themeMode][this.activeColor] = color;
    },
    isActiveColor(color) {
      if (this.activeColor === "modeColor") {
        return this.modeColor === color;
      }
      return this.theme[this.activeColor] === color;
    },
    mouseDownHandler(e) {
      this.mouseDown = true;
      this.performAction(e);
    },
    pickCanvasColor(e) {
      if (!this.mouseDown) return false;
      this.performAction(e);
    },
    performAction(e) {
      const x = e.pageX - e.target.getBoundingClientRect().left;
      const y = e.pageY - e.target.getBoundingClientRect().top;
      const imageData = this.context.getImageData(x, y, 1, 1).data;
      const r = imageData[0];
      const g = imageData[1];
      const b = imageData[2];
      const color =
        "#" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
      this.handleColorItemClick(color);
    },
  },
};
</script>
<style lang="scss">
.build-palette-modal {
  display: flex;
  flex-direction: column;

  &.vm--modal {
    width: calc(100% - 6px) !important;
  }

  .colors-wrap {
    margin-top: 20px;
    display: grid;
    grid-gap: 4px;
    grid-template-columns: repeat(auto-fill, minmax(35px, 1fr));

    .color-item {
      width: 100%;
      height: 35px;
      border-radius: 2px;
      border: solid 1px #80808078;
      cursor: pointer;

      &.active {
        outline: solid 2px var(--bz-edit-active);
      }
    }
  }
}
</style>
