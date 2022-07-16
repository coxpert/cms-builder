<template>
  <div class="bz-section-container bz-sec--price-list-4-root" :class="{ [breakPoint]: true }">
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

              <bz-icon import sectionMixin from '../mixins/sectionMixin' v-model="data.items[index].icon" :background-color="theme.primaryColor" :text-color="'#00000000'"
              :rounded="false" :border-radius="0" :full="true" />

              <bz-text :text-color="theme.primaryColor" v-model="data.items[index].price" v-if="setting.listElements.price" />

              <bz-text v-model="data.items[index].subtitle" v-if="setting.listElements.subtitle" />

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
import BzIcon from '../../components/section/BzIcon'

export default {
  components: { BzIcon, BzButton, BzItems, BzText, BzSubtitle, BzTitle, BzAlignment, BzContainer, BzBackground },
  mixins: [sectionMixin],
  name: 'PriceList4',
  methods: {
    cardStyle(index) {
      return {
        card: {
          padding: '30px 30px'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bz-sec--price-list-4-root {
}
</style>
