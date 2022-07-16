<template>
  <div class="bz-section-container address2" :class="{ [breakPoint]: true }">
    <bz-background :setting="background">
      <div class="col-12">
        <div class="row" :class="{ 'bz-row-reverse': setting.alignment === 'right' }">
          <div class="col-lg-8">
            <bz-google-map :type="setting.map.type" :zoom="setting.map.zoomLevel" :height="400" :location="setting.map.location" />
          </div>
          <div class="col-lg-4 d-flex flex-column justify-content-center">
            <bz-title v-model="data.elements.address" v-if="setting.elements.address" />
            <bz-address :location="setting.businessInformation.location" v-if="setting.elements.address" />

            <bz-divider />

            <bz-title v-model="data.elements.phone" v-if="setting.elements.phone" :mb="0" />
            <bz-phone-number :location="setting.businessInformation.location" v-if="setting.elements.phone" />

            <bz-divider />

            <bz-title v-model="data.elements.email" v-if="setting.elements.email" :mb="0" />
            <bz-email :location="setting.businessInformation.location" v-if="setting.elements.email" />
          </div>
        </div>
      </div>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from '../../mixins/sectionMixin'
import BzDivider from '../../components/section/BzDivider'
import BzBackground from '../../components/section/BzBackground'
import BzEmail from '../../components/section/BzEmail'
import BzTitle from '../../components/section/BzTitle'
import BzPhoneNumber from '../../components/section/BzPhoneNumber'
import BzAddress from '../../components/section/BzAddress'
import BzGoogleMap from '../../components/section/BzGoogleMap'
export default {
  components: { BzGoogleMap, BzAddress, BzPhoneNumber, BzTitle, BzEmail, BzBackground, BzDivider },
  mixins: [sectionMixin]
}
</script>
<style lang="scss">
.address2 {
}
</style>
