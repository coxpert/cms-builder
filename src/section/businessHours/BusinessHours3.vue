<template>
  <div
    class="bz-section-container bz-sec--business-hours-3-root"
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
          <bz-text-element
            v-model="data.elements"
            :setting="setting.elements"
            :alignment="setting.layouts.alignment"
          />
          <div class="col-12">
            <div class="row">
              <div class="col-lg-4">
                <div class="address-phone-number">
                  <bz-title
                    v-if="setting.elements.address"
                    v-model="data.elements.address"
                  />
                  <bz-address
                    v-if="setting.elements.address"
                    :location="setting.businessInformation.location"
                  />

                  <bz-divider />

                  <bz-title
                    v-if="setting.elements.phoneNumber"
                    v-model="data.elements.phone"
                    :mb="0"
                  />
                  <bz-phone-number
                    v-if="setting.elements.phoneNumber"
                    :location="setting.businessInformation.location"
                  />
                </div>
              </div>
              <div class="col-lg-8">
                <bz-business-hours
                  :location="setting.businessInformation.location"
                  class="business-hours"
                />
              </div>
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
import BzBusinessHours from "../../components/section/BzBusinessHours";
import BzAddress from "../../components/section/BzAddress";
import BzTitle from "../../components/section/BzTitle";
import BzDivider from "../../components/section/BzDivider";
import BzPhoneNumber from "../../components/section/BzPhoneNumber";
import BzContainer from "../../components/section/BzContainer";
import BzTextElement from "../../components/section/BzTextElement";

export default {
  name: "BusinessHours3",
  components: {
    BzTextElement,
    BzContainer,
    BzPhoneNumber,
    BzDivider,
    BzAddress,
    BzBusinessHours,
    BzBackground,
    BzTitle,
  },
  mixins: [sectionMixin],
};
</script>
<style lang="scss">
.bz-sec--business-hours-3-root {
  .text-elements {
    display: flex;
    flex-direction: column;

    &.left {
      align-items: flex-start;
      text-align: left;
    }

    &.right {
      align-items: flex-end;
      text-align: right;
    }

    &.center {
      align-items: center;
      text-align: center;
    }
  }

  .business-hours {
    display: flex;
    margin: 0;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
}
</style>
