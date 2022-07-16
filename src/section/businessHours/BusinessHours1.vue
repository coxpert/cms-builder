<template>
  <div class="bz-section-container bz-sec-business-hours-1-root" :class="{ [breakPoint]: true }">
    <bz-background :setting="background">
      <div class="col-12">
        <div class="row" :class="{ 'flex-row-reverse': setting.alignment === 'right' }">
          <div class="col-lg-6">
            <bz-google-map v-if="setting.hasOwnProperty('map')" :type="setting.map.type" :zoom="setting.map.zoomLevel" :height="'100%'" :location="setting.map.location" />
          </div>
          <div class="col-lg-6">
            <div class="w-100 h-100 d-flex justify-content-around flex-column p-lg-4">
              <bz-text-element v-model="data.elements" :setting="setting.elements" />

              <bz-business-hours v-if="setting.elements.businessHours" :location="setting.businessInformation.location" />

              <bz-divider v-if="setting.elements.dividerLine" :line="true" />

              <div class="row">
                <div class="col-lg-6">
                  <bz-title v-if="setting.elements.address" v-model="data.elements.address" />

                  <bz-address v-if="setting.elements.address" :location="setting.businessInformation.location" />
                </div>

                <div class="col-lg-6">
                  <bz-title v-if="setting.elements.phone" v-model="data.elements.phone" :mb="0" />

                  <bz-phone-number v-if="setting.elements.phone" :location="setting.businessInformation.location" />

                  <bz-divider />

                  <bz-title v-if="setting.elements.email" v-model="data.elements.email" :mb="0" />

                  <bz-email v-if="setting.elements.email" :location="setting.businessInformation.location" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from '../../mixins/sectionMixin'
import BzBackground from '../../components/section/BzBackground'
import BzBusinessHours from '../../components/section/BzBusinessHours'
import BzAddress from '../../components/section/BzAddress'
import BzTitle from '../../components/section/BzTitle'
import BzDivider from '../../components/section/BzDivider'
import BzPhoneNumber from '../../components/section/BzPhoneNumber'
import BzEmail from '../../components/section/BzEmail'
import BzGoogleMap from '../../components/section/BzGoogleMap'
import BzTextElement from '../../components/section/BzTextElement'

export default {
  name: 'BusinessHours1',
  components: {
    BzTextElement,
    BzGoogleMap,
    BzEmail,
    BzPhoneNumber,
    BzDivider,
    BzAddress,
    BzBusinessHours,
    BzBackground,
    BzTitle
  },
  mixins: [sectionMixin]
}
</script>
