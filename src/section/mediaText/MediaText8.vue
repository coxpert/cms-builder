<template>
  <div
    class="bz-section-container bz-sec--media-text-8-root"
    :class="{ [breakPoint]: true }"
    :data-section="section.sectionUUID"
  >
    <bz-background
      :setting="background"
      :size="sectionSize"
      :bzAnimationClass="setting.animationClass"
    >
      <bz-container>
        <div class="bz-ss-field-1">
          <bz-alignment :alignment="setting.layouts.alignment">
            <div class="bz-ss-title">
              <bz-title
                v-model="data.elements.title"
                v-if="setting.elements.title"
              />
            </div>

            <div class="bz-ss-subtitle">
              <bz-subtitle
                v-model="data.elements.subtitle"
                v-if="setting.elements.subtitle"
              />
            </div>

            <div class="bz-ss-description">
              <bz-text
                v-model="data.elements.description"
                v-if="setting.elements.description"
              />
            </div>

            <div class="bz-ss-buttons">
              <bz-button-group
                class="mt-3"
                v-model="data.elements.buttons"
                v-if="setting.elements.buttons"
              />
            </div>
          </bz-alignment>
        </div>
        <div class="bz-ss-image" v-if="setting.elements.image">
          <bz-image :ratio="2 / 5" v-model="data.elements.image" />
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from "../../mixins/sectionMixin";
import BzBackground from "../../components/section/BzBackground";
import BzContainer from "../../components/section/BzContainer";
import BzImage from "../../components/section/BzImage";
import BzTitle from "../../components/section/BzTitle";
import BzSubtitle from "../../components/section/BzSubtitle";
import BzText from "../../components/section/BzText";
import BzButtonGroup from "../../components/section/BzButtonGroup";
import BzAlignment from "../../components/section/BzAlignment";

export default {
  components: {
    BzAlignment,
    BzButtonGroup,
    BzText,
    BzSubtitle,
    BzTitle,
    BzImage,
    BzContainer,
    BzBackground,
  },
  mixins: [sectionMixin],
};
</script>
<style lang="scss" scoped>
.bz-sec--media-text-8-root {
  .bz-ss-image {
    margin-top: 40px;
  }
}
</style>
