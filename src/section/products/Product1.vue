<template>
  <div class="bz-section-container bz-sec--product-1-root" :class="{ [breakPoint]: true }">
    <bz-background :setting="background" :size="sectionSize" :bzAnimationClass="setting.animationClass">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" />
          <bz-subtitle v-model="data.elements.subtitle" v-if="setting.elements.subtitle" />
          <bz-text v-model="data.elements.description" v-if="setting.elements.description" />
          <bz-button v-model="data.elements.button" :class="'gotocart'" v-if="setting.paypal.cartButton" :link="false" />
        </bz-alignment>

        <bz-divider />

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
                  <bz-button v-model="data.items[index].button" :class="'add_to_cart'" :data-id="item.id" :link="false" />
                </bz-alignment>
              </div>
            </div>
          </template>
        </bz-items>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from '../../mixins/sectionMixin'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzText from '../../components/section/BzText'
import BzTitle from '../../components/section/BzTitle'
import BzAlignment from '../../components/section/BzAlignment'
import BzContainer from '../../components/section/BzContainer'
import BzBackground from '../../components/section/BzBackground'
import BzItems from '../../components/section/BzItems'
import BzButton from '../../components/section/BzButton'
import BzImage from '../../components/section/BzImage'
import BzDivider from '../../components/section/BzDivider'

export default {
  components: {
    BzDivider,
    BzImage,
    BzButton,
    BzItems,
    BzBackground,
    BzContainer,
    BzAlignment,
    BzTitle,
    BzText,
    BzSubtitle
  },
  mixins: [sectionMixin],
  name: 'Product1',
  computed: {
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
    cardStyle() {
      if (this.setting.layouts.shadow) {
        return {
          border: 'solid 1px #00000010',
          borderRadius: '2px'
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
  }
}
</script>

<style lang="scss" scoped>
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
}
</style>
