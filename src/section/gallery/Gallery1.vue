<template>
  <div class="bz-section-container gallery1" :data-section-id="section.sectionUUID" :class="{ [breakPoint]: true }">
    <bz-background :setting="background" :size="sectionSize" :bzAnimationClass="setting.animationClass">
      <bz-container>
        <bz-title v-model="data.elements.title" v-if="setting.elements.title" />

        <bz-subtitle v-model="data.elements.subtitle" v-if="setting.elements.subtitle" />

        <bz-text v-model="data.elements.description" v-if="setting.elements.description" />
      </bz-container>
      <bz-container :fullSize="fullSize">
        <div class="w-100">
          <bz-items v-model="data.items" :cols="3" :shadow="setting.layouts.shadow" :spacing="setting.layouts.spacing">
            <template slot-scope="{ item, index }">
              <bz-image v-model="data.items[index]" />
              <bz-title class="bg-white text-center p-2" v-model="data.items[index].title" v-if="setting.listElements.title" :background-color="'#ffffff'" :mb="0" />
            </template>
          </bz-items>
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import Container from '../../components/section/BzContainer'
import Items from '../../components/section/BzItems'
import sectionMixin from '../../mixins/sectionMixin'
import BackIcon from '../../components/icons/Back'
import Background from '../../components/section/BzBackground'
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
    Background,
    BackIcon,
    Items,
    Container
  },
  methods: {
    handleImageItemChange(index, value) {
      this.data.items[index] = value
      this.data = _copy(this.data)
    }
  }
}
</script>

<style lang="scss">
.gallery1 {
  .content {
    padding: 30px 0;
  }
}
</style>
