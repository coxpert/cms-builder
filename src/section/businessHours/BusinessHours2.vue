<template>
  <div
    class="bz-section-container bz-sec-business-hours-1-root"
    :class="{ [breakPoint]: true }"
  >
    <bz-background
      :setting="background"
      :size="sectionSize"
      :bz-animation-class="setting.animationClass"
    >
      <bz-container>
        <div class="bz-row">
          <div class="bz-col-6">
            <bz-text-element
              v-model="data.elements"
              :setting="setting.elements"
              :alignment="setting.layouts.alignment"
            />
          </div>
          <div class="bz-col-6">
            <bz-business-hours
              :location="setting.businessInformation.location"
            />
          </div>
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzBackground from "../../components/section/BzBackground";
import BzBusinessHours from "../../components/section/BzBusinessHours";
import BzContainer from "../../components/section/BzContainer";
import BzTextElement from "../../components/section/BzTextElement";
import sectionMixin from "../../mixins/sectionMixin";

export default {
  name: "BusinessHours2",
  components: {
    BzTextElement,
    BzContainer,
    BzBusinessHours,
    BzBackground,
  },
  mixins: [sectionMixin],
};
</script>
<style lang="scss">
.bz-sec-business-hours-1-root {
}
</style>
