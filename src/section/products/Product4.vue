<template>
  <div
    class="bz-section-container bz-sec--sectionName-root product4-vue"
    :class="{ [breakPoint]: true }"
  >
    <bz-background
      :setting="background"
      :size="sectionSize"
      :bz-animation-class="setting.animationClass"
    >
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment + ' mb-5'">
          <bz-title
            v-if="setting.elements.title"
            v-model="data.elements.title"
          />
          <bz-subtitle
            v-if="setting.elements.subtitle"
            v-model="data.elements.subtitle"
          />
          <bz-text
            v-if="setting.elements.description"
            v-model="data.elements.description"
          />
        </bz-alignment>

        <div
          v-if="!setting.layouts.carousel"
          class="bz-sec--product-1-root"
          :class="{ [breakPoint]: true }"
        >
          <bz-items
            v-model="data.items"
            :cols="setting.column"
            :shadow="setting.layouts.shadow"
            :show-add-item="false"
          >
            <template slot-scope="{ item, index }">
              <div class="bz-fl-product-card" :style="cardStyle">
                <div class="bz-ee-product-image" :style="imageStyle">
                  <bz-image
                    v-if="setting.listElements.image"
                    v-model="data.items[index].image"
                    :ratio="aspectRatio"
                    :disable-aspect-view="
                      setting.layouts.aspectRatio === 'original'
                    "
                    :circle="setting.layouts.aspectRatio === 'circle'"
                  />
                </div>
                <div class="bz-ee-product-content">
                  <bz-alignment :alignment="setting.layouts.alignment">
                    <bz-title
                      v-if="setting.listElements.title"
                      v-model="data.items[index].title"
                    />
                    <bz-text
                      v-if="setting.listElements.description"
                      v-model="data.items[index].description"
                    />
                    <div class="bz-text-root product-info">
                      <div>
                        <span
                          v-if="
                            data.items[index].title &&
                            setting.listElements.price
                          "
                          class="badge badge-pill badge-dark p-2"
                          >Price: {{ data.items[index].price }}$</span
                        >
                        <span
                          v-if="
                            data.items[index].sizes &&
                            setting.listElements.sizes
                          "
                          class="badge badge-pill badge-dark p-2"
                          >Sizes: {{ data.items[index].sizes }}</span
                        >
                        <span
                          v-if="
                            data.items[index].colors &&
                            setting.listElements.colors
                          "
                          class="badge badge-pill badge-dark p-2"
                          >Colors: {{ data.items[index].colors }}</span
                        >
                      </div>
                    </div>
                    <bz-button
                      v-if="setting.listElements.buttons"
                      v-model="data.items[index].button"
                      :class="'add_to_cart'"
                      :data-id="item.id"
                      :link="false"
                    />
                  </bz-alignment>
                </div>
              </div>
            </template>
          </bz-items>
        </div>
      </bz-container>
    </bz-background>
    <div
      v-if="setting.layouts.carousel"
      class="bz-sec--product-1-root bz-drag-drop-items-container"
      :class="{
        [breakPoint]: true,
        full: setting.layouts.fullSize,
        [sectionSize]: true,
      }"
      :data-section="section.sectionUUID"
    >
      <bz-background :setting="background">
        <bz-container>
          <carousel
            :per-page="setting.column"
            :autoplay="setting.elements.autoPlay"
            :speed="500"
            :pagination-enabled="setting.elements.navigation"
            :pagination-padding="10"
            :pagination-size="20"
            :loop="setting.elements.loop"
          >
            <slide
              v-for="(item, key) of data.items"
              :key="key"
              :data-index="key"
              data-name="slide-name"
            >
              <div class="w-100" :class="{ spacing: true }">
                <div
                  class="w-100 h-100"
                  :class="{ 'bz-shadow': setting.layouts.shadow }"
                >
                  <div class="bz-fl-product-card" :style="cardStyle">
                    <div class="bz-ee-product-image" :style="imageStyle">
                      <bz-image
                        v-if="setting.listElements.image"
                        v-model="item.image"
                        :ratio="aspectRatio"
                        :disable-aspect-view="
                          setting.layouts.aspectRatio === 'original'
                        "
                        :circle="setting.layouts.aspectRatio === 'circle'"
                      />
                    </div>
                    <div class="bz-ee-product-content">
                      <bz-alignment :alignment="setting.layouts.alignment">
                        <bz-title
                          v-if="setting.listElements.title"
                          v-model="item.title"
                        />
                        <bz-text
                          v-if="setting.listElements.description"
                          v-model="item.description"
                        />
                        <div class="bz-text-root product-info">
                          <div>
                            <span
                              v-if="item.price && setting.listElements.price"
                              class="badge badge-pill badge-dark p-2"
                            >
                              Price: {{ item.price }}$
                            </span>
                            <span
                              v-if="item.sizes && setting.listElements.sizes"
                              class="badge badge-pill badge-dark p-2"
                            >
                              Sizes: {{ item.sizes }}
                            </span>
                            <span
                              v-if="item.colors && setting.listElements.colors"
                              class="badge badge-pill badge-dark p-2"
                            >
                              Colors: {{ item.colors }}</span
                            >
                          </div>
                        </div>
                        <bz-button
                          v-if="setting.listElements.buttons"
                          v-model="item.button"
                          :class="'add_to_cart'"
                          :data-id="item.id"
                          :link="false"
                        />
                      </bz-alignment>
                    </div>
                  </div>
                </div>
              </div>
            </slide>
          </carousel>
        </bz-container>
      </bz-background>
    </div>
  </div>
</template>

<script>
import sectionMixin from "../../mixins/sectionMixin";
import BzBackground from "../../components/section/BzBackground";
import BzContainer from "../../components/section/BzContainer";
import BzAlignment from "../../components/section/BzAlignment";
import BzTitle from "../../components/section/BzTitle";
import BzSubtitle from "../../components/section/BzSubtitle";
import BzText from "../../components/section/BzText";
import BzItems from "../../components/section/BzItems";
import BzImage from "../../components/section/BzImage";
import BzButton from "../../components/section/BzButton";
import BzDivider from "../../components/section/BzDivider";
import { Carousel, Slide } from "vue-carousel";
import BzButtonGroup from "../../components/section/BzButtonGroup";

export default {
  name: "Product4",
  components: {
    BzButton,
    BzImage,
    BzItems,
    BzText,
    BzSubtitle,
    BzTitle,
    BzDivider,
    BzAlignment,
    BzContainer,
    BzBackground,
    BzButtonGroup,
    Carousel,
    Slide,
  },
  mixins: [sectionMixin],
  computed: {
    imageStyle() {
      return {
        clipPath: "ellipse(100% 90% at 50% 10%)",
      };
    },
    cardBackgroundColor() {
      const originalColor = tinycolor(this.backgroundColor);
      return originalColor.brighten(2).toString();
    },
    cardStyle() {
      if (this.setting.layouts.shadow) {
        return {
          border: "solid 1px #00000010",
          borderRadius: "2px",
        };
      }
    },
    aspectRatio() {
      switch (this.setting.layouts.aspectRatio) {
        case "portrait": {
          return 3 / 2;
        }
        case "landscape": {
          return 2 / 3;
        }
        default: {
          return 1;
        }
      }
    },
    imageStyle() {
      if (this.setting.layouts.shadow) {
        return {
          boxShadow: "0 0 10px 2px #00000034",
        };
      }
    },
  },
  methods: {
    cardStyles(index) {
      return {
        card: {
          backgroundColor: this.cardBackgroundColor,
          borderRadius: "10px",
          overflow: "hidden",
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.product4-vue {
  .product-info {
    line-height: 1.2em;
    margin-bottom: 0.5em;
    color: rgb(0, 0, 0);
    font-size: 1em;
    font-weight: normal;
    padding-top: 6px;
    padding-bottom: 16px;
  }
}
.bz-sec--product-1-root {
  .bz-fl-product-card {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 20px;

    .bz-ee-product-image {
      width: 50%;
      height: auto;
      margin-top: -50px;
    }
    .bz-ee-product-content {
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>
