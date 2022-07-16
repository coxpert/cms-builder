<template>
  <div class="bz-section-container bz-sec--price-list-2-root" :class="{ [breakPoint]: true }">
    <bz-background :setting="background" :size="sectionSize" :bzAnimationClass="setting.animationClass">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" />

          <bz-subtitle v-model="data.elements.subtitle" v-if="setting.elements.subtitle" />

          <bz-text v-model="data.elements.description" v-if="setting.elements.description" />
        </bz-alignment>

        <bz-items v-model="data.items" :cols="setting.column" :shadow="false" :styles="cardStyles">
          <template slot-scope="{ item, index }">
            <bz-alignment :alignment="setting.layouts.alignment">
              <div class="bz-fl-pricing-card-top" :style="planStyle">
                <bz-title v-model="data.items[index].title" v-if="setting.listElements.title" />

                <bz-text v-model="data.items[index].price" v-if="setting.listElements.price" />
              </div>
            </bz-alignment>

            <div class="bz-fl-pricing-card-bottom">
              <bz-alignment :alignment="setting.layouts.alignment">
                <bz-text v-model="data.items[index].subtitle" v-if="setting.listElements.subtitle" />

                <bz-text v-model="data.items[index].description" v-if="setting.listElements.description" />

                <bz-button v-model="data.items[index].button" :link="false" />
              </bz-alignment>
            </div>
          </template>
        </bz-items>
      </bz-container>
    </bz-background>
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
import BzButton from '../../components/section/BzButton'

export default {
  components: { BzButton, BzItems, BzText, BzSubtitle, BzTitle, BzAlignment, BzContainer, BzBackground },
  mixins: [sectionMixin],
  name: 'PriceList2',
  computed: {
    planStyle() {
      let originalColor = tinycolor(this.theme.primaryColor)
      let backgroundColor = originalColor.brighten(50).toString()

      return {
        backgroundColor
      }
    }
  },
  methods: {
    cardStyles(index) {
      return {
        card: {
          padding: '40px 20px'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bz-sec--price-list-2-root {
  .bz-fl-pricing-card-top {
    width: 120px;
    height: 120px;
    border-radius: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;
  }
}
</style>
