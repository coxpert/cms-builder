<template>
  <div class="bz-section-container bz-sec--cover-image-7-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" :size="sectionSize" :bzAnimationClass="setting.animationClass">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-subtitle v-if="setting.elements.subtitle" v-model="data.elements.subtitle" :shadow="true" />
          <bz-title v-if="setting.elements.title" v-model="data.elements.title" :shadow="true" style="font-size: 42px" />

          <bz-divider />

          <bz-subtitle v-if="setting.elements.description" v-model="data.elements.description" :shadow="true" />
          <bz-button-group v-if="data.elements.buttons" v-model="data.elements.buttons" />
        </bz-alignment>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from '../../mixins/sectionMixin'
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzAlignment from '../../components/section/BzAlignment'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzTitle from '../../components/section/BzTitle'
import BzDivider from '../../components/section/BzDivider'
import BzButtonGroup from '../../components/section/BzButtonGroup'

export default {
  components: { BzButtonGroup, BzDivider, BzTitle, BzSubtitle, BzAlignment, BzContainer, BzBackground },
  mixins: [sectionMixin]
}
</script>
<style lang="scss" scoped>
.bz-sec--cover-image-7-root {
}
</style>
