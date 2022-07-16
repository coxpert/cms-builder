<template>
  <div class="bz-section-container bz-sec--address5--root" :class="{ [breakPoint]: true }">
    <div class="w-100">
      <bz-google-map :type="setting.map.type" :zoom="setting.map.zoomLevel" :height="400" :location="setting.map.location" />
    </div>
    <div class="w-100">
      <bz-background :setting="background">
        <bz-container>
          <div class="row py-3" :class="{ 'bz-row-reverse': setting.alignment === 'right' }">
            <div class="col-lg-4">
              <bz-title v-model="data.elements.address" v-if="setting.elements.address" />
              <bz-address :location="setting.businessInformation.location" v-if="setting.elements.address" />
            </div>
            <div class="col-lg-4">
              <bz-title v-model="data.elements.phone" v-if="setting.elements.phone" :mb="0" />
              <bz-phone-number :location="setting.businessInformation.location" v-if="setting.elements.phone" />
            </div>
            <div class="col-lg-4">
              <bz-title v-model="data.elements.email" v-if="setting.elements.email" :mb="0" />
              <bz-email :location="setting.businessInformation.location" v-if="setting.elements.email" />
            </div>
          </div>
        </bz-container>
      </bz-background>
    </div>
  </div>
</template>

<script>
import sectionMixin from '../../mixins/sectionMixin'
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzTitle from '../../components/section/BzTitle'
import BzAddress from '../../components/section/BzAddress'
import BzEmail from '../../components/section/BzEmail'
import BzPhoneNumber from '../../components/section/BzPhoneNumber'
import BzGoogleMap from '../../components/section/BzGoogleMap'
export default {
  components: { BzGoogleMap, BzPhoneNumber, BzEmail, BzAddress, BzTitle, BzContainer, BzBackground },
  mixins: [sectionMixin]
}
</script>
<style lang="scss">
.bz-sec--address5--root {
}
</style>
