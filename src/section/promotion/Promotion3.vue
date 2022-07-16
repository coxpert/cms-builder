<template>
  <div class="bz-section-container bz-sec--promotion-2-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :size="sectionSize" :setting="background">
      <bz-container>
        <div class="bz-row">
          <div class="bz-col-lg-6">
            <bz-alignment :alignment="setting.layouts.alignment" :stretch="false">
              <bz-icon v-model="data.elements.icon" :rounded="false" :border-radius="0" :full="true" :fill="false" :size="60" />

              <bz-title v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" size="32px" />

              <bz-text v-model="data.elements.subtitle" v-if="setting.elements.subtitle" />

              <bz-text v-model="data.elements.description" v-if="setting.elements.description" />
            </bz-alignment>

            <div class="my-4">
              <bz-setting :on-click="openPromotionModal">
                <div class="bz-fl-email-address">
                  <input class="bz-be-input" placeholder="Enter your e-mail address" />
                </div>
              </bz-setting>
            </div>

            <div class="mb-3">
              <bz-button v-model="data.elements.button" :link="false" />
            </div>

            <bz-text class="text-left" :value="data.promotion.permissionMessage" />
          </div>
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from '../../mixins/sectionMixin'
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzCard from '../../components/section/BzCard'
import BzAlignment from '../../components/section/BzAlignment'
import BzIcon from '../../components/section/BzIcon'
import BzTitle from '../../components/section/BzTitle'
import BzText from '../../components/section/BzText'
import BzSetting from '../../components/section/BzSetting'
import BzButton from '../../components/section/BzButton'
import BzImage from '../../components/section/BzImage'

export default {
  components: { BzImage, BzButton, BzSetting, BzText, BzTitle, BzIcon, BzAlignment, BzCard, BzContainer, BzBackground },
  mixins: [sectionMixin],
  name: 'Promotion3',
  computed: {
    cardBackgroundColor() {
      return this.backgroundColor.brighten(5)
    }
  },
  methods: {
    openPromotionModal() {
      this.$store.commit('openPromotion', {
        value: this.data.promotion,
        onChange: this.handlePromotionChange
      })
    },
    handlePromotionChange(promotion) {
      this.data.promoAction = promotion
    }
  }
}
</script>

<style lang="scss" scoped>
.bz-sec--promotion-2-root {
  .bz-fe-button {
    margin: 20px 0;
  }

  .bz-fl-email-address {
    width: 100%;
    background-color: #efefef;
    padding: 10px;
    border-radius: 4px;

    input {
      width: 100%;
      border: none;
      outline: none;
      font-family: inherit;
    }
  }
}
</style>
