<template>
  <section
    class="bz-section-container bz-sec--address1-root"
    :class="{ [breakPoint]: true }"
  >
    <bz-background
      :setting="background"
      :size="sectionSize"
      :bz-animation-class="setting.animationClass"
    >
      <bz-container>
        <div
          class="w-100 h-100 d-flex justify-content-around flex-column p-lg-4"
        >
          <div class="col-12">
            <bz-alignment :alignment="setting.alignment">
              <bz-title
                v-if="setting.elements.title"
                v-model="data.elements.title"
                :shadow="setting.elements.shadow"
              />
              <bz-subtitle
                v-if="setting.elements.subtitle"
                v-model="data.elements.subtitle"
                :shadow="setting.elements.shadow"
              />
              <bz-divider
                v-if="setting.elements.dividerLine"
                :line="true"
                :width="setting.elements.dividerWidth"
              />
            </bz-alignment>
          </div>
          <div class="col-12">
            <div class="row">
              <div class="col-lg-6">
                <bz-business-hours
                  :location="setting.businessInformation.location"
                  :design="4"
                />
              </div>
              <div class="col-lg-6">
                <div
                  class="text-wrapper"
                  :class="{ [setting.layouts.alignment]: true }"
                >
                  <bz-text
                    v-if="setting.elements.description"
                    v-model="data.elements.description"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </bz-container>
    </bz-background>
  </section>
</template>

<script>
import sectionMixin from "../../mixins/sectionMixin";
import BzBackground from "../../components/section/BzBackground";
import BzBusinessHours from "../../components/section/BzBusinessHours";
import BzText from "../../components/section/BzText";
import BzContainer from "../../components/section/BzContainer";
import BzTextElement from "../../components/section/BzTextElement";
import BzAlignment from "../../components/section/BzAlignment";
import BzTitle from "../../components/section/BzTitle";
import BzSubtitle from "../../components/section/BzSubtitle";
import BzDivider from "../../components/section/BzDivider";

export default {
  name: "BusinessHours6",
  components: {
    BzDivider,
    BzSubtitle,
    BzTitle,
    BzAlignment,
    BzContainer,
    BzText,
    BzBusinessHours,
    BzBackground,
  },
  mixins: [sectionMixin],
};
</script>
<style lang="scss">
.bz-sec--address1-root {
  .title-sub-title-wrapper,
  .text-wrapper {
    &.left {
      text-align: left;
    }
    &.right {
      text-align: right;
    }
    &.center {
      text-align: center;
    }
  }

  .text-wrapper {
    margin: 30px 0;
  }
}
</style>
