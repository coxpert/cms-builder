<template>
  <div class="bz-section-container bz-sect--section3-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background">
      <div class="p-4">
        <bz-items v-model="data.items" :cols="2" :shadow="false" :spacing="setting.listElements.spacing">
          <template slot-scope="{ item }">
            <div class="p-3">
              <bz-alignment :alignment="setting.layouts.alignment">
                <bz-title v-if="setting.listElements.title" v-model="item.title" />
                <bz-text v-if="setting.listElements.description" v-model="item.description" />
                <div v-if="setting.listElements.buttons" class="d-flex justify-content-end">
                  <bz-button-group v-model="item.buttons" />
                </div>
              </bz-alignment>
            </div>
          </template>
        </bz-items>
      </div>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from '../../mixins/sectionMixin'
import BzTitle from '../../components/section/BzTitle'
import BzBackground from '../../components/section/BzBackground'
import BzText from '../../components/section/BzText'
import BzItems from '../../components/section/BzItems'
import BzButtonGroup from '../../components/section/BzButtonGroup'
import BzAlignment from '../../components/section/BzAlignment'

export default {
  name: 'Text5',
  components: {
    BzAlignment,
    BzButtonGroup,
    BzItems,
    BzText,
    BzBackground,
    BzTitle
  },
  mixins: [sectionMixin]
}
</script>
<style lang="scss" scoped>
.bz-sect--section3-root {
  .element-wrapper {
    padding: 60px;
    min-height: 200px;
  }

  &.bz-sm {
    .element-wrapper {
      padding: 0;
    }
  }
}
</style>
