<template>
  <div class="bz-section-container bz-sec--gallery3-root" :class="{ [breakPoint]: true }" :data-section-id="section.sectionUUID">
    <bz-background :setting="background" :size="sectionSize" :bzAnimationClass="setting.animationClass">
      <bz-container>
        <bz-title v-model="data.elements.title" v-if="setting.elements.title" />

        <bz-subtitle v-model="data.elements.subtitle" v-if="setting.elements.subtitle" />

        <bz-text v-model="data.elements.description" v-if="setting.elements.description" />
        <div class="w-100">
          <bz-items v-model="data.items" :grid="true">
            <template slot-scope="{ item, index }">
              <bz-image v-model="data.items[index]" />
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
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzTitle from '../../components/section/BzTitle'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzText from '../../components/section/BzText'
import BzItems from '../../components/section/BzItems'
import BzImage from '../../components/section/BzImage'

export default {
  mixins: [sectionMixin],
  components: {
    BzImage,
    BzItems,
    BzText,
    BzSubtitle,
    BzTitle,
    BzContainer,
    BzBackground,
    Container
  },
  props: ['position']
}
</script>

<style lang="scss">
.bz-sec--gallery3-root {
  .content {
    padding: 30px 0;
  }
}
</style>
