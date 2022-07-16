<template>
  <div class="bz-section-container bz-sec--menu-7-root" :class="{ [breakPoint]: true }">
    <bz-background :size="sectionSize">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" />

          <bz-subtitle v-model="data.elements.subtitle" v-if="setting.elements.subtitle" />

          <bz-text v-model="data.elements.description" v-if="setting.elements.description" />
        </bz-alignment>

        <div class="bz-divider-lines"></div>

        <bz-items v-model="data.items" :cols="setting.column" :shadow="false" :spacing="false">
          <template slot-scope="{ item, index }">
            <div class="bz-col-12 py-0">
              <bz-alignment :alignment="setting.layouts.alignment">
                <bz-title v-model="item.title" v-if="setting.listElements.title" :text-color="theme.primaryColor" />

                <bz-text v-model="item.subtitle" v-if="setting.listElements.description" />

                <bz-text v-model="item.price" v-if="setting.listElements.price" :text-color="theme.primaryColor" :size="'1.2em'" />
              </bz-alignment>
            </div>
          </template>
        </bz-items>

        <div class="bz-divider-lines"></div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from '../../mixins/sectionMixin'
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzAlignment from '../../components/section/BzAlignment'
import BzText from '../../components/section/BzText'
import BzTitle from '../../components/section/BzTitle'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzItems from '../../components/section/BzItems'
import BzDivider from '../../components/section/BzDivider'

export default {
  components: { BzDivider, BzItems, BzSubtitle, BzTitle, BzText, BzAlignment, BzContainer, BzBackground },
  mixins: [sectionMixin],
  name: 'Menu5'
}
</script>

<style lang="scss" scoped>
.bz-sec--menu-7-root {
  .bz-divider-lines {
    width: 100%;
    border-bottom: solid 1px var(--bz-primary-color);
    position: relative;

    &::after {
      position: absolute;
      width: 100%;
      content: '';
      bottom: -4px;
      height: 1px;
      background-color: var(--bz-primary-color);
    }
  }
}
</style>
