<template>
  <div class="bz-section-container bz-sec--price-list-3-root" :class="{ [breakPoint]: true }">
    <bz-background :setting="background" :size="sectionSize" :bzAnimationClass="setting.animationClass">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" />

          <bz-subtitle v-model="data.elements.subtitle" v-if="setting.elements.subtitle" />

          <bz-text v-model="data.elements.description" v-if="setting.elements.description" />
        </bz-alignment>

        <bz-items v-model="data.items" :cols="setting.column" :shadow="setting.layouts.shadow" :styles="cardStyle">
          <template slot-scope="{ item, index }">
            <bz-alignment :alignment="setting.layouts.alignment">
              <bz-title v-model="data.items[index].title" v-if="setting.listElements.title" />

              <bz-text :text-color="theme.primaryColor" v-model="data.items[index].price" v-if="setting.listElements.price" />

              <bz-text v-model="data.items[index].subtitle" v-if="setting.listElements.subtitle" />

              <bz-divider :line="true" v-if="setting.listElements.dividerLine" :line-color="theme.primaryColor" width="30%" :thickness="2" />

              <bz-text v-model="data.items[index].description" v-if="setting.listElements.description" />

              <bz-button v-model="data.items[index].button" :link="false" />
            </bz-alignment>
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
import BzDivider from '../../components/section/BzDivider'

export default {
  components: { BzDivider, BzButton, BzItems, BzText, BzSubtitle, BzTitle, BzAlignment, BzContainer, BzBackground },
  mixins: [sectionMixin],
  name: 'PriceList3',
  methods: {
    cardStyle(index) {
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
.bz-sec--price-list-3-root {
}
</style>
