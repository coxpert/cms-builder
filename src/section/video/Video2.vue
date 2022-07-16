<template>
  <div class="bz-section-container bz-sec--video-2-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :size="!setting.layouts.fullPage && sectionSize" :setting="background">
      <bz-container>
        <div class="video-container"><bz-video v-model="data.video" /></div>

        <bz-alignment style="margin: 30px 0" :alignment="setting.layouts.alignment">
          <bz-title v-model="data.elements.title" v-if="setting.elements.title" />
          <bz-text v-model="data.elements.subtitle" v-if="setting.elements.subtitle" />
          <bz-text v-model="data.elements.description" v-if="setting.elements.description" />
          <bz-button-group v-model="data.elements.buttons" />
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
.bz-sec--video-2-root {
  .fullPage {
    padding-top: 0 !important;
  }

  .video-container {
    height: 250px;
  }

  &.bz-md {
    .video-container {
      height: 350px;
    }
  }

  &.bz-md {
    .video-container {
      height: 450px;
    }
  }
}
</style>
