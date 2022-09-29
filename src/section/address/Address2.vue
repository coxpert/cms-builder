<template>
  <div class="bz-section-container address2" :class="{ [breakPoint]: true }">
    <bz-background :setting="background">
      <div class="col-12">
        <div
          class="row"
          :class="{ 'bz-row-reverse': setting.alignment === 'right' }"
        >
          <div class="col-lg-8">
            <bz-google-map
              :type="setting.map.type"
              :zoom="setting.map.zoomLevel"
              :height="400"
              :location="setting.businessInformation.location"
            />
          </div>
          <div class="col-lg-4 d-flex flex-column justify-content-center">
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
        </div>
      </div>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from "../../mixins/sectionMixin";
import BzDivider from "../../components/section/BzDivider";
import BzBackground from "../../components/section/BzBackground";
import BzEmail from "../../components/section/BzEmail";
import BzTitle from "../../components/section/BzTitle";
import BzPhoneNumber from "../../components/section/BzPhoneNumber";
import BzAddress from "../../components/section/BzAddress";
import BzGoogleMap from "../../components/section/BzGoogleMap";
export default {
  components: {
    BzGoogleMap,
    BzAddress,
    BzPhoneNumber,
    BzTitle,
    BzEmail,
    BzBackground,
    BzDivider,
  },
  mixins: [sectionMixin],
};
</script>
<style lang="scss">
.address2 {
}
</style>
