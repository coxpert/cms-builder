<template>
  <div class="bz-section-container bz-sec--sectionName-root product4-vue" :class="{ [breakPoint]: true }">
    <bz-background :setting="background" :size="sectionSize" :bzAnimationClass="setting.animationClass">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment + ' mb-5'">
          <bz-title v-model="data.elements.title" v-if="setting.elements.title" />
          <bz-subtitle v-model="data.elements.subtitle" v-if="setting.elements.subtitle" />
          <bz-text v-model="data.elements.description" v-if="setting.elements.description" />
          <bz-button v-model="data.elements.button" :class="'gotocart'" v-if="setting.paypal.cartButton" :link="false" />
        </bz-alignment>

        <div class="bz-sec--product-1-root" :class="{ [breakPoint]: true }" v-if="!setting.layouts.carousel">
          <bz-items v-model="data.items" :cols="setting.column" :shadow="setting.layouts.shadow" :showAddItem="false">
            <template slot-scope="{ item, index }">
              <div class="bz-fl-product-card" :style="cardStyle">
                <div class="bz-ee-product-image" :style="imageStyle">
                  <bz-image
                    v-model="data.items[index].image"
                    :ratio="aspectRatio"
                    v-if="setting.listElements.image"
                    :disable-aspect-view="setting.layouts.aspectRatio === 'original'"
                    :circle="setting.layouts.aspectRatio === 'circle'"
                  />
                </div>
                <div class="bz-ee-product-content">
                  <bz-alignment :alignment="setting.layouts.alignment">
                    <bz-title v-model="data.items[index].title" v-if="setting.listElements.title" />
                    <bz-text v-model="data.items[index].description" v-if="setting.listElements.description" />
                    <div class="bz-text-root product-info">
                      <div>
                        <span class="badge badge-pill badge-dark p-2" v-if="data.items[index].title && setting.listElements.price">Price: {{ data.items[index].price }}$</span>
                        <span class="badge badge-pill badge-dark p-2" v-if="data.items[index].sizes && setting.listElements.sizes">Sizes: {{ data.items[index].sizes }}</span>
                        <span class="badge badge-pill badge-dark p-2" v-if="data.items[index].colors && setting.listElements.colors">Colors: {{ data.items[index].colors }}</span>
                      </div>
                    </div>
                    <bz-button v-model="data.items[index].button" :class="'add_to_cart'" :data-id="item.id" :link="false" v-if="setting.listElements.buttons" />
                  </bz-alignment>
                </div>
              </div>
            </template>
          </bz-items>
        </div>
      </bz-container>
    </bz-background>
    <div
      class="bz-sec--product-1-root bz-drag-drop-items-container"
      :class="{ [breakPoint]: true, full: setting.layouts.fullSize, [sectionSize]: true }"
      :data-section="section.sectionUUID"
      v-if="setting.layouts.carousel"
    >
      <bz-background :setting="background">
        <bz-container>
          <carousel
            :perPage="setting.column"
            :autoplay="setting.elements.autoPlay"
            :speed="500"
            :pagination-enabled="setting.elements.navigation"
            :paginationPadding="10"
            :paginationSize="20"
            :loop="setting.elements.loop"
          >
            <slide v-for="(item, key) of data.items" :data-index="key" :key="key" data-name="slide-name">
              <div class="w-100" :class="{ spacing: true }">
                <div class="w-100 h-100" :class="{ 'bz-shadow': setting.layouts.shadow }">
                  <div class="bz-fl-product-card" :style="cardStyle">
                    <div class="bz-ee-product-image" :style="imageStyle">
                      <bz-image
                        v-model="item.image"
                        :ratio="aspectRatio"
                        v-if="setting.listElements.image"
                        :disable-aspect-view="setting.layouts.aspectRatio === 'original'"
                        :circle="setting.layouts.aspectRatio === 'circle'"
                      />
                    </div>
                    <div class="bz-ee-product-content">
                      <bz-alignment :alignment="setting.layouts.alignment">
                        <bz-title v-model="item.title" v-if="setting.listElements.title" />
                        <bz-text v-model="item.description" v-if="setting.listElements.description" />
                        <div class="bz-text-root product-info">
                          <div>
                            <span class="badge badge-pill badge-dark p-2" v-if="item.price && setting.listElements.price"> Price: {{ item.price }}$ </span>
                            <span class="badge badge-pill badge-dark p-2" v-if="item.sizes && setting.listElements.sizes"> Sizes: {{ item.sizes }} </span>
                            <span class="badge badge-pill badge-dark p-2" v-if="item.colors && setting.listElements.colors"> Colors: {{ item.colors }}</span>
                          </div>
                        </div>
                        <bz-button v-model="item.button" :class="'add_to_cart'" :data-id="item.id" :link="false" v-if="setting.listElements.buttons" />
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
import sectionMixin from '../../mixins/sectionMixin'
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzAlignment from '../../components/section/BzAlignment'
import BzTitle from '../../components/section/BzTitle'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzText from '../../components/section/BzText'
import BzItems from '../../components/section/BzItems'
import BzImage from '../../components/section/BzImage'
import BzButton from '../../components/section/BzButton'
import BzDivider from '../../components/section/BzDivider'
import { Carousel, Slide } from 'vue-carousel'
import BzButtonGroup from '../../components/section/BzButtonGroup'

export default {
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
    Slide
  },
  mixins: [sectionMixin],
  name: 'Product4',
  computed: {
    imageStyle() {
      return {
        clipPath: 'ellipse(100% 90% at 50% 10%)'
      }
    },
    cardBackgroundColor() {
      let originalColor = tinycolor(this.backgroundColor)
      return originalColor.brighten(2).toString()
    },
    cardStyle() {
      if (this.setting.layouts.shadow) {
        return {
          border: 'solid 1px #00000010',
          borderRadius: '2px'
        }
      }
    },
    aspectRatio() {
      switch (this.setting.layouts.aspectRatio) {
        case 'portrait': {
          return 3 / 2
        }
        case 'landscape': {
          return 2 / 3
        }
        default: {
          return 1
        }
      }
    },
    imageStyle() {
      if (this.setting.layouts.shadow) {
        return {
          boxShadow: '0 0 10px 2px #00000034'
        }
      }
    }
  },
  methods: {
    cardStyles(index) {
      return {
        card: {
          backgroundColor: this.cardBackgroundColor,
          borderRadius: '10px',
          overflow: 'hidden'
        }
      }
    }
  }
}
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
