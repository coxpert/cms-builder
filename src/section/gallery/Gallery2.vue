<template>
  <div class="bz-section-container bz-sec--gallery2-root" :class="{ [breakPoint]: true }" :data-section-id="section.sectionUUID">
    <bz-background :setting="background" :size="sectionSize" :bzAnimationClass="setting.animationClass">
      <bz-container>
        <bz-title v-model="data.elements.title" v-if="setting.elements.title" />

        <bz-subtitle v-model="data.elements.subtitle" v-if="setting.elements.subtitle" />

        <bz-text v-model="data.elements.description" v-if="setting.elements.description" />
      </bz-container>
      <bz-container :fillSize="fullSize">
        <div class="w-100">
          <bz-items v-model="data.items" :cols="setting.column" :has-shadow="true">
            <template slot-scope="{ item, index }">
              <div class="w-100">
                <bz-image v-model="data.items[index]" />
              </div>
            </template>
          </bz-items>
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import Container from '../../components/section/BzContainer'
import sectionMixin from '../../mixins/sectionMixin'
import Subtitle from '../../components/section/BzSubtitle'
import Background from '../../components/section/BzBackground'
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzText from '../../components/section/BzText'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzTitle from '../../components/section/BzTitle'
import BzItems from '../../components/section/BzItems'
import BzImage from '../../components/section/BzImage'

export default {
  mixins: [sectionMixin],
  components: {
    BzImage,
    BzItems,
    BzTitle,
    BzSubtitle,
    BzText,
    BzContainer,
    BzBackground,
    Background,
    Subtitle,
    Container
  }
}
</script>

<style lang="scss">
.bz-sec--gallery2-root {
  .content {
    padding: 30px 0;
  }
}
</style>
