<template>
  <div class="bz-section-container bz-sec--video-4-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :size="sectionSize" :setting="background">
      <div class="background-attachment" :class="setting.alignment"></div>
      <bz-container style="z-index: 1; position: relative">
        <div class="bz-row" :class="{ 'bz-row-reverse': setting.alignment === 'right' }">
          <div class="bz-col-lg-7">
            <div class="video-container">
              <bz-video v-model="data.video" />
            </div>
          </div>
          <div class="bz-col-lg-5">
            <bz-alignment :alignment="setting.layouts.alignment">
              <bz-title v-if="setting.elements.title" v-model="data.elements.title" />

              <bz-text v-if="setting.elements.subtitle" v-model="data.elements.subtitle" />

              <bz-text v-if="setting.elements.description" v-model="data.elements.description" />

              <bz-button-group v-model="data.elements.buttons" />
            </bz-alignment>
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
import BzAlignment from '../../components/section/BzAlignment'
import BzTitle from '../../components/section/BzTitle'
import BzText from '../../components/section/BzText'
import BzButtonGroup from '../../components/section/BzButtonGroup'
import BzVideo from '../../components/section/BzVideo'

export default {
  components: { BzVideo, BzButtonGroup, BzText, BzTitle, BzAlignment, BzContainer, BzBackground },
  mixins: [sectionMixin]
}
</script>
<style lang="scss" scoped>
.bz-sec--video-4-root {
  .video-container {
    width: 100%;
    height: 250px;
  }

  &.bz-md {
    .video-container {
      height: 300px;
    }
  }

  &.bz-lg {
    .video-container {
      height: 350px;
    }
  }

  .background-attachment {
    position: absolute;
    top: 0;
    width: 100%;
    height: 30%;
    background-color: var(--bz-primary-color);

    &.right {
      right: auto;
      top: auto;
      bottom: 0;
    }
  }

  &.bz-md {
    .background-attachment {
      top: 0;
      width: 30%;
      height: 100%;

      &.right {
        right: 0;
        top: 0;
        bottom: auto;
      }
    }
  }
}
</style>
