<template>
  <div class="bz-section-container bz-sec--cover-image-5-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" :size="sectionSize" :bzAnimationClass="setting.animationClass">
      <bz-container>
        <div class="bz-col-12">
          <div class="bz-row" :class="{ 'bz-row-reverse': setting.alignment === 'right' }">
            <div class="bz-col-lg-6 bz-column-center">
              <bz-subtitle v-if="setting.elements.subtitle" v-model="data.elements.subtitle" />
              <bz-title v-if="setting.elements.title" v-model="data.elements.title" />

              <bz-divider />

              <bz-subtitle v-if="setting.elements.description" v-model="data.elements.description" />
              <bz-button-group v-if="setting.elements.buttons" v-model="data.elements.buttons" />
            </div>
            <div class="bz-col-lg-6">
              <bz-image v-if="setting.elements.image" v-model="data.elements.image" :ratio="2 / 3" />
            </div>
          </div>
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from '../../mixins/sectionMixin'
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzImage from '../../components/section/BzImage'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzTitle from '../../components/section/BzTitle'
import BzButtonGroup from '../../components/section/BzButtonGroup'
import BzDivider from '../../components/section/BzDivider'

export default {
  components: { BzDivider, BzButtonGroup, BzTitle, BzSubtitle, BzImage, BzContainer, BzBackground },
  mixins: [sectionMixin]
}
</script>
<style lang="scss" scoped>
.bz-sec--cover-image-5-root {
}
</style>
