<template>
  <div
    class="bz-section-container bz-sec--address4-root"
    :class="{ [breakPoint]: true }"
  >
    <div class="col-12">
      <div
        class="row"
        :class="{ 'bz-row-reverse': setting.alignment === 'right' }"
      >
        <div class="col-lg-6 p-0">
          <bz-google-map
            :type="setting.map.type"
            :zoom="setting.map.zoomLevel"
            :location="setting.businessInformation.location"
            height="100%"
            style="min-height: 300px !important"
          />
        </div>
        <div class="col-lg-6">
          <div class="row">
            <div class="col-lg-6 p-0">
              <bz-background :setting="background">
                <div class="left-box">
                  <bz-title
                    v-if="setting.elements.phoneNumber"
                    v-model="data.elements.phone"
                    :mb="0"
                  />
                  <bz-phone-number
                    v-if="setting.elements.phoneNumber"
                    :location="setting.businessInformation.location"
                  />

                  <bz-divider />

                  <bz-title
                    v-if="setting.elements.email"
                    v-model="data.elements.email"
                    :mb="0"
                  />
                  <bz-email
                    v-if="setting.elements.email"
                    :location="setting.businessInformation.location"
                  />
                </div>
              </bz-background>
            </div>
            <div class="col-lg-6 p-0">
              <bz-background :background-color="rightBoxBackgroundColor">
                <div class="right-box">
                  <bz-title
                    v-if="setting.elements.address"
                    v-model="data.elements.address"
                  />
                  <bz-address
                    v-if="setting.elements.address"
                    :location="setting.businessInformation.location"
                  />
                </div>
              </bz-background>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sectionMixin from "../../mixins/sectionMixin";
import BzBackground from "../../components/section/BzBackground";
import BzTitle from "../../components/section/BzTitle";
import BzPhoneNumber from "../../components/section/BzPhoneNumber";
import BzDivider from "../../components/section/BzDivider";
import BzEmail from "../../components/section/BzEmail";
import BzAddress from "../../components/section/BzAddress";
import BzGoogleMap from "../../components/section/BzGoogleMap";
export default {
  components: {
    BzGoogleMap,
    BzAddress,
    BzEmail,
    BzDivider,
    BzPhoneNumber,
    BzTitle,
    BzBackground,
  },
  mixins: [sectionMixin],
  computed: {
    rightBoxBackgroundColor() {
      const originalColor = tinycolor(this.backgroundColor);
      return originalColor.darken(5).toString();
    },
  },
};
</script>
<style lang="scss">
.bz-sec--address4-root {
  .left-box,
  .right-box {
    min-height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
</style>
