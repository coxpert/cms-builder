<template>
  <div class="bz-section-container bz-sec--media-text-2-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" :size="sectionSize" :bzAnimationClass="setting.animationClass">
      <bz-container>
        <div class="col-12">
          <div class="bz-row">
            <div class="bz-col-md-6">
              <div class="bz-ss-image">
                <bz-image :ratio="2 / 3" v-model="data.elements.image" v-if="setting.elements.image" />
              </div>
            </div>
            <div class="bz-col-md-6">
              <div class="bz-ss-field-1">
                <div class="bz-ss-divider" v-if="setting.elements.dividerLine">
                  <bz-divider :line="true" :thickness="4" width="20%" />
                </div>

                <div class="bz-ss-title">
                  <bz-title v-model="data.elements.title" v-if="setting.elements.title" />
                </div>

                <div class="bz-ss-subtitle">
                  <bz-subtitle v-model="data.elements.subtitle" v-if="setting.elements.subtitle" />
                </div>

                <div class="bz-ss-description">
                  <bz-text v-model="data.elements.description" v-if="setting.elements.description" />
                </div>

                <div class="bz-ss-buttons">
                  <bz-button-group class="mt-3" v-model="data.elements.buttons" v-if="setting.elements.buttons" />
                </div>
              </div>
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
import BzDivider from '../../components/section/BzDivider'
import BzTitle from '../../components/section/BzTitle'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzText from '../../components/section/BzText'
import BzButtonGroup from '../../components/section/BzButtonGroup'

export default {
  components: { BzButtonGroup, BzText, BzSubtitle, BzTitle, BzDivider, BzImage, BzContainer, BzBackground },
  mixins: [sectionMixin]
}
</script>
<style lang="scss" scoped>
.bz-sec--media-text-2-root {
  .bz-ss-divider {
    margin-bottom: 40px;
  }
  .bz-ss-field-1 {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
