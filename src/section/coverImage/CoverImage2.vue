<template>
  <div
    class="bz-section-container bz-sec--cover-image-2-root"
    :class="{ [breakPoint]: true, full: setting.layouts.fullPage }"
    :data-section="section.sectionUUID"
  >
    <bz-background
      :setting="background"
      :size="sectionSize"
      :bz-animation-class="setting.animationClass"
    >
      <bz-container>
        <div
          class="row"
          :class="{ 'flex-row-reverse': setting.alignment === 'right' }"
        >
          <div class="col-lg-6">
            <bz-alignment :alignment="setting.layouts.alignment">
              <bz-subtitle
                v-if="setting.elements.subtitle"
                v-model="data.elements.subtitle"
              />
              <bz-title
                v-if="setting.elements.title"
                v-model="data.elements.title"
              />
              <bz-subtitle
                v-if="setting.elements.description"
                v-model="data.elements.description"
              />
              <bz-button-group
                v-if="setting.elements.buttons"
                v-model="data.elements.buttons"
              />
            </bz-alignment>
          </div>
          <div class="col-lg-6">
            <bz-image v-model="data.elements.image" :ratio="2 / 5" />
          </div>
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from "../../mixins/sectionMixin";
import BzBackground from "../../components/section/BzBackground";
import BzContainer from "../../components/section/BzContainer";
import BzSubtitle from "../../components/section/BzSubtitle";
import BzTitle from "../../components/section/BzTitle";
import BzButtonGroup from "../../components/section/BzButtonGroup";
import BzImage from "../../components/section/BzImage";
import BzAlignment from "../../components/section/BzAlignment";
import BzDivider from "../../components/section/BzDivider";

export default {
  components: {
    BzDivider,
    BzAlignment,
    BzImage,
    BzButtonGroup,
    BzTitle,
    BzSubtitle,
    BzContainer,
    BzBackground,
  },
  mixins: [sectionMixin],
};
</script>
<style lang="scss" scoped>
.bz-sec--cover-image-2-root {
  &.full {
    height: 100vh;
  }
}
</style>
