<template>
  <div class="bz-section-container bz-sect--text-3-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <div class="element-container">
      <bz-section-size :section-size="sectionSize">
        <bz-container>
          <bz-alignment :alignment="setting.layouts.alignment">
            <bz-title v-model="data.elements.title" v-if="setting.elements.title" :background-color="theme.primaryColor" />

            <bz-subtitle v-model="data.elements.subtitle" v-if="setting.elements.subtitle" :background-color="theme.primaryColor" />

            <bz-text v-model="data.elements.description" v-if="setting.elements.description" :background-color="theme.primaryColor" />
          </bz-alignment>
        </bz-container>
      </bz-section-size>
    </div>
    <bz-background :setting="background" class="mt-0 d-flex">
      <div class="card-container">
        <bz-container>
          <bz-card :shadow="setting.layouts.shadow">
            <bz-items v-model="data.items" :cols="setting.column" category-name="text" :shadow="false">
              <template slot-scope="{ item }">
                <div class="w-100 p-2">
                  <bz-title v-if="setting.listElements.title" v-model="item.title" />
                  <bz-text v-if="setting.listElements.description" v-model="item.description" />
                  <div v-if="setting.listElements.buttons" class="d-flex justify-content-end">
                    <bz-button-group v-model="item.buttons" />
                  </div>
                </div>
              </template>
            </bz-items>
          </bz-card>
        </bz-container>
      </div>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from '../../mixins/sectionMixin'
import BzTitle from '../../components/section/BzTitle'
import BzCard from '../../components/section/BzCard'
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzText from '../../components/section/BzText'
import BzItems from '../../components/section/BzItems'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzButtonGroup from '../../components/section/BzButtonGroup'
import BzSectionSize from '../../components/section/BzSectionSize'
import BzAlignment from '../../components/section/BzAlignment'

export default {
  name: 'Text3',
  components: {
    BzAlignment,
    BzSectionSize,
    BzButtonGroup,
    BzSubtitle,
    BzItems,
    BzText,
    BzContainer,
    BzBackground,
    BzCard,
    BzTitle
  },
  mixins: [sectionMixin]
}
</script>
<style lang="scss" scoped>
.bz-sect--text-3-root {
  .element-wrapper {
    padding: 60px;
    min-height: 200px;
  }

  &.bz-sm {
    .element-wrapper {
      padding: 0;
    }
  }

  .element-container {
    background-color: var(--bz-primary-color);
    padding-bottom: 100px;
  }

  .card-container {
    margin-top: -100px;
  }
}
</style>
