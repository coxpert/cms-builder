<template>
  <div
    class="bz-section-container bz-sec--carousel-1-root"
    :class="{
      [breakPoint]: true,
      [sectionSize]: true,
      full: setting.layouts.fullSize,
    }"
    :data-section="section.sectionUUID"
  >
    <bz-background :setting="background">
      <carousel
        :per-page="1"
        :autoplay="setting.elements.autoPlay"
        :speed="500"
        :pagination-enabled="setting.elements.navigation"
        :pagination-padding="10"
        :pagination-size="20"
        class="w-100"
      >
        <slide
          v-for="(item, key) of data.items"
          :key="key"
          :data-index="key"
          data-name="slide-name"
          @slideclick="handleSlideClick"
        >
          <div class="carousel-item">
            <div v-if="edit" class="add-remove-items">
              <div
                class="add-slider-button"
                :class="{ disabled: data.items.length >= 7 }"
                @click="addItem(key)"
              >
                Add slide
              </div>
              <div
                class="remove-slider-button"
                :class="{ disabled: data.items.length <= 2 }"
                @click="removeItem(key)"
              >
                Remove slide
              </div>
            </div>
            <div class="image-wrapper">
              <bz-image
                v-model="item.image"
                :edit-mode="edit"
                :disable-aspect-view="true"
                resize-mode="full"
                @editstart="isImageEdit = true"
                @editend="isImageEdit = false"
              />
            </div>
            <div v-if="!isImageEdit" class="text-elements-wrapper">
              <bz-container>
                <bz-alignment :alignment="setting.layouts.alignment">
                  <bz-title
                    v-if="setting.listElements.title"
                    v-model="data.items[key].title"
                    :edit-mode="edit"
                  />
                  <bz-subtitle
                    v-if="setting.listElements.subtitle"
                    v-model="data.items[key].subtitle"
                    :edit-mode="edit"
                  />
                  <bz-text
                    v-if="setting.listElements.description"
                    v-model="data.items[key].description"
                    :edit-mode="edit"
                  />
                  <bz-button-group
                    v-model="data.items[key].buttons"
                    :edit-mode="edit"
                  />
                </bz-alignment>
              </bz-container>
            </div>
          </div>
        </slide>
      </carousel>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from "../../mixins/sectionMixin";
import { Carousel, Slide } from "vue-carousel";
import BzImage from "../../components/section/BzImage";
import BzText from "../../components/section/BzText";
import BzTitle from "../../components/section/BzTitle";
import BzSubtitle from "../../components/section/BzSubtitle";
import BzContainer from "../../components/section/BzContainer";
import BzAlignment from "../../components/section/BzAlignment";
import BzButtonGroup from "../../components/section/BzButtonGroup";
import BzBackground from "../../components/section/BzBackground";

export default {
  components: {
    BzBackground,
    BzButtonGroup,
    BzAlignment,
    BzContainer,
    BzSubtitle,
    BzTitle,
    BzText,
    BzImage,
    Carousel,
    Slide,
  },
  mixins: [sectionMixin],
  data() {
    return {
      isImageEdit: false,
    };
  },
  methods: {
    handleSlideClick() {},
    addItem(index) {
      if (this.data.items.length < 7) {
        this.data.items.insert(
          index,
          this.data.items[window.getRandomInt(this.data.items.length - 1)]
        );
        this.data = window._copy(this.data);
      }
    },
    removeItem(index) {
      if (this.data.items.length > 2) {
        this.data.items.splice(index, 1);
        this.data = window._copy(this.data);
      }
    },
  },
};
</script>
<style lang="scss">
.bz-sec--carousel-1-root {
  position: relative;

  height: 60vh;

  &.m {
    height: 70vh;
  }
  &.l {
    height: 80vh;
  }

  &.xl {
    height: 90vh;
  }

  .VueCarousel-slide {
    width: 100%;
  }

  .add-remove-items {
    position: absolute;
    left: 10px;
    top: 10px;
    height: 28px;
    background-color: white;
    z-index: 4;
    display: flex;
    color: white;
    border-radius: 50%;
    font-weight: 400;
    font-size: 12px;

    .add-slider-button,
    .remove-slider-button {
      background-color: var(--bz-section-edit-active-color);
      display: flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      text-align: center;
      padding: 0 10px;
      cursor: pointer;

      &.disabled {
        background-color: #808080;
        cursor: not-allowed;
      }

      &:hover:not(.disabled) {
        background-color: var(--bz-section-edit-active-hover-color);
      }
    }
    .add-slider-button {
      margin-right: 1px;
      border-top-left-radius: 50px;
      border-bottom-left-radius: 50px;
    }

    .remove-slider-button {
      border-top-right-radius: 50px;
      border-bottom-right-radius: 50px;
    }
  }

  .bz-el--image-root .image-wrapper .tool-bar {
    top: 20px !important;
  }

  &.full {
    height: 100vh;
  }

  .VueCarousel {
    height: 100%;
    .VueCarousel-wrapper {
      height: 100%;
      .VueCarousel-inner {
        height: 100% !important;
      }
    }
  }

  [class*="VueCarousel-pagination"] {
    position: absolute !important;
    bottom: 0 !important;
  }

  .carousel-item {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .image-wrapper {
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .text-elements-wrapper {
      position: absolute;
      width: 100%;
      height: max-content;
      z-index: 2;
    }
  }
}
</style>
