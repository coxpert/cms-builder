<template>
  <div
    class="bz-section-container bz-sec--cover-image-1-root"
    :class="{ [breakPoint]: true, full: setting.layouts.fullPage }"
    :data-section="section.sectionUUID"
  >
    <bz-background
      :setting="background"
      :size="sectionSize"
      :bz-animation-class="setting.animationClass"
    >
      <bz-container>
        <div class="bz-col-12">
          <div
            class="row"
            :class="{ 'flex-row-reverse': setting.alignment === 'right' }"
          >
            <div class="bz-col-lg-6 bz-d-flex bz-column bz-justify-center">
              <bz-text
                v-if="setting.elements.subtitle"
                v-model="data.elements.subtitle"
                :shadow="true"
              />
              <bz-text
                v-if="setting.elements.description"
                v-model="data.elements.description"
                :shadow="true"
              />
              <bz-button-group
                v-if="setting.elements.buttons"
                v-model="data.elements.buttons"
              />
            </div>
            <div class="bz-col-lg-6 bz-d-flex bz-align-center">
              <bz-title
                v-if="setting.elements.title"
                v-model="data.elements.title"
                :shadow="true"
                style="font-size: 72px"
                :mb="0"
              />
            </div>
          </div>
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from "../../mixins/sectionMixin";
import BzBackground from "../../components/section/BzBackground";
import BzText from "../../components/section/BzText";
import BzButtonGroup from "../../components/section/BzButtonGroup";
import BzTitle from "../../components/section/BzTitle";
import BzContainer from "../../components/section/BzContainer";

export default {
  components: { BzContainer, BzTitle, BzButtonGroup, BzText, BzBackground },
  mixins: [sectionMixin],
};
</script>
<style lang="scss" scoped>
.bz-sec--cover-image-1-root {
  &.full {
    height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
