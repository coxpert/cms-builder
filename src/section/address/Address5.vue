<template>
  <div
    class="bz-section-container bz-sec--address5--root"
    :class="{ [breakPoint]: true }"
  >
    <div class="w-100">
      <bz-google-map
        :type="setting.map.type"
        :zoom="setting.map.zoomLevel"
        :height="400"
        :location="setting.businessInformation.location"
      />
    </div>
    <div class="w-100">
      <bz-background :setting="background">
        <bz-container>
          <div
            class="row py-3"
            :class="{ 'bz-row-reverse': setting.alignment === 'right' }"
          >
            <div class="col-lg-4">
              <bz-title
                v-if="setting.elements.address"
                v-model="data.elements.address"
              />
              <bz-address
                v-if="setting.elements.address"
                :location="setting.businessInformation.location"
              />
            </div>
            <div class="col-lg-4">
              <bz-title
                v-if="setting.elements.phone"
                v-model="data.elements.phoneNumber"
                :mb="0"
              />
              <bz-phone-number
                v-if="setting.elements.phone"
                :location="setting.businessInformation.location"
              />
            </div>
            <div class="col-lg-4">
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
          </div>
        </bz-container>
      </bz-background>
    </div>
  </div>
</template>

<script>
import sectionMixin from "../../mixins/sectionMixin";
import BzBackground from "../../components/section/BzBackground";
import BzContainer from "../../components/section/BzContainer";
import BzTitle from "../../components/section/BzTitle";
import BzAddress from "../../components/section/BzAddress";
import BzEmail from "../../components/section/BzEmail";
import BzPhoneNumber from "../../components/section/BzPhoneNumber";
import BzGoogleMap from "../../components/section/BzGoogleMap";
export default {
  components: {
    BzGoogleMap,
    BzPhoneNumber,
    BzEmail,
    BzAddress,
    BzTitle,
    BzContainer,
    BzBackground,
  },
  mixins: [sectionMixin],
};
</script>
<style lang="scss">
.bz-sec--address5--root {
}
</style>
