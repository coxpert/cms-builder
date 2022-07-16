<template>
  <div class="bz-section-container bz-sec--cover-image-2-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" :size="sectionSize" :bzAnimationClass="setting.animationClass">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-subtitle v-if="setting.elements.subtitle" v-model="data.elements.subtitle" />
          <bz-title v-if="setting.elements.title" v-model="data.elements.title" />
          <bz-subtitle v-if="setting.elements.description" v-model="data.elements.description" />
          <bz-button-group v-if="setting.elements.buttons" v-model="data.elements.buttons" />
        </bz-alignment>

        <bz-divider />

        <bz-image v-if="setting.elements.image" v-model="data.elements.image" :ratio="2 / 5" />
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from '../../mixins/sectionMixin'
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzTitle from '../../components/section/BzTitle'
import BzButtonGroup from '../../components/section/BzButtonGroup'
import BzImage from '../../components/section/BzImage'
import BzAlignment from '../../components/section/BzAlignment'
import BzDivider from '../../components/section/BzDivider'

export default {
  components: { BzDivider, BzAlignment, BzImage, BzButtonGroup, BzTitle, BzSubtitle, BzContainer, BzBackground },
  mixins: [sectionMixin]
}
</script>
<style lang="scss" scoped>
.bz-sec--cover-image-2-root {
}
</style>
