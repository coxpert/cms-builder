<template>
  <div class="bz-section-container bz-sec--media-list-1-root" :class="{ [breakPoint]: true }">
    <bz-background :setting="background" :size="sectionSize" :bzAnimationClass="setting.animationClass">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title v-model="data.elements.title" v-if="setting.elements.title" />

          <bz-subtitle v-model="data.elements.subtitle" v-if="setting.elements.subtitle" />

          <bz-text v-model="data.elements.description" v-if="setting.elements.description" />
        </bz-alignment>

        <bz-items v-model="data.items" :cols="setting.column" :shadow="setting.layouts.shadow">
          <template slot-scope="{ item, index }">
            <bz-image :ratio="aspectRatio" v-model="data.items[index].image" v-if="setting.listElements.image" />

            <div class="card-text-wrapper">
              <bz-title v-model="data.items[index].title" v-if="setting.listElements.title" />

              <bz-text v-model="data.items[index].subtitle" v-if="setting.listElements.subtitle" />

              <bz-text v-model="data.items[index].description" v-if="setting.listElements.description" />
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
import BzImage from '../../components/section/BzImage'

export default {
  components: { BzImage, BzItems, BzText, BzSubtitle, BzTitle, BzAlignment, BzContainer, BzBackground },
  mixins: [sectionMixin],
  name: 'MediaList1',
  data() {
    return {
      aspectRatio: 1
    }
  },
  watch: {
    setting: {
      deep: true,
      immediate: true,
      handler(value) {
        switch (value.layouts.aspectRatio) {
          case 'landscape': {
            this.aspectRatio = 2 / 3
            break
          }
          case 'portrait': {
            this.aspectRatio = 4 / 3
            break
          }
          case 'square': {
            this.aspectRatio = 1
            break
          }
          default: {
            this.aspectRatio = 1
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bz-sec--media-list-1-root {
  .card-text-wrapper {
    padding: 10px;
  }
}
</style>
