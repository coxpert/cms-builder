<template>
  <div class="bz-section-container bz-sec--statistic-1-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :size="sectionSize" :setting="background">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" />
          <bz-text v-model="data.elements.subtitle" v-if="setting.elements.subtitle" />
          <bz-text v-model="data.elements.description" v-if="setting.elements.description" />
        </bz-alignment>

        <bz-items v-model="data.items" :shadow="false" :cols="setting.column">
          <template slot-scope="{ item, index }">
            <div class="bz-item-container">
              <div class="bz-item-value" :style="itemValueStyle">
                <bz-text :bold="true" v-if="setting.listElements.value" v-model="data.items[index].value" size="3em" mb="0" />
              </div>

              <bz-divider :line="true" :width="50" />

              <bz-text v-if="setting.listElements.subtitle" v-model="data.items[index].subtitle" />
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
import BzText from '../../components/section/BzText'
import BzItems from '../../components/section/BzItems'
import BzDivider from '../../components/section/BzDivider'

export default {
  mixins: [sectionMixin],
  components: { BzDivider, BzItems, BzText, BzTitle, BzAlignment, BzContainer, BzBackground },
  computed: {
    itemValueStyle() {
      const backgroundColor = this.theme.primaryColor.brighten(70)

      if (this.setting.layouts.shape === 'circle') {
        return {
          borderRadius: '1000px',
          backgroundColor
        }
      } else if (this.setting.layouts.shape === 'square') {
        return {
          backgroundColor
        }
      } else {
        return {
          clipPath: 'polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)',
          backgroundColor
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bz-sec--statistic-1-root {
  .bz-item-value {
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bz-item-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
