<template>
  <div class="bz-section-container bz-sec--cover-image-3-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" :size="sectionSize" :bzAnimationClass="setting.animationClass">
      <div class="bz-col-12 bz-py-0">
        <div class="bz-row">
          <div class="bz-col-6 bz-p-0">
            <bz-image v-model="data.elements.image" :disable-aspect-view="true" :resize-mode="'cover'" :fit-height="true" />
          </div>
          <div class="bz-col-6 bz-p-0">
            <bz-background class="bz-h-100" :background-color="theme.primaryColor">
              <bz-divider />
              <bz-divider :line="true" :background-color="theme.primaryColor" />

              <div class="bz-p-lg-2 bz-p-1">
                <bz-text v-model="data.elements.description" :background-color="theme.primaryColor" />
              </div>

              <bz-divider :line="true" :background-color="theme.primaryColor" />
              <bz-divider />
            </bz-background>
          </div>
        </div>

        <bz-container class="bz-py-10">
          <bz-title v-if="setting.elements.title" v-model="data.elements.title" :shadow="true" />
          <bz-text v-if="setting.elements.subtitle" v-model="data.elements.subtitle" :shadow="true" />

          <bz-divider />

          <div class="bz-flex-center">
            <bz-divider :line="true" background-color="#000000" :style="{ marginRight: setting.elements.buttons ? '20px' : 0 }" />
            <bz-button-group v-if="setting.elements.buttons" v-model="data.elements.buttons" />
          </div>
        </bz-container>
      </div>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from '../../mixins/sectionMixin'
import BzBackground from '../../components/section/BzBackground'
import BzImage from '../../components/section/BzImage'
import BzDivider from '../../components/section/BzDivider'
import BzText from '../../components/section/BzText'
import BzTitle from '../../components/section/BzTitle'
import BzContainer from '../../components/section/BzContainer'
import BzButtonGroup from '../../components/section/BzButtonGroup'

export default {
  components: { BzButtonGroup, BzContainer, BzTitle, BzText, BzDivider, BzImage, BzBackground },
  mixins: [sectionMixin]
}
</script>
<style lang="scss" scoped>
.bz-sec--cover-image-3-root {
}
</style>
