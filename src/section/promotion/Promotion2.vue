<template>
  <div class="bz-section-container bz-sec--promotion-2-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :size="sectionSize" :setting="background">
      <bz-container>
        <bz-card :shadow="setting.layouts.shadow" :backgroundColor="cardBackgroundColor" class="p-0">
          <div class="bz-row" :class="{ 'bz-row-reverse': setting.alignment === 'right' }">
            <div class="bz-col-md-5 py-0">
              <bz-image v-model="data.elements.image" resize-mode="full" />
            </div>
            <div class="bz-col-md-7 p-4">
              <bz-alignment :alignment="setting.layouts.alignment" :stretch="false">
                <bz-icon v-model="data.elements.icon" import sectionMixin from '../mixins/sectionMixin' :rounded="false" :border-radius="0" :full="true" :fill="false" :size="60"
                class="mb-5" />

                <bz-title v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" size="32px" />

                <bz-text v-model="data.elements.subtitle" v-if="setting.elements.subtitle" />

                <bz-text v-model="data.elements.description" v-if="setting.elements.description" />
              </bz-alignment>

              <div class="bz-row">
                <div class="bz-col-lg-8">
                  <bz-setting :on-click="openPromotionModal">
                    <div class="bz-fl-email-address">
                      <input class="bz-be-input" placeholder="Enter your e-mail address" />
                    </div>
                  </bz-setting>
                </div>
                <div class="bz-col-lg-4">
                  <bz-button v-model="data.elements.button" :link="false" />
                </div>
              </div>

              <bz-text class="text-left" :value="data.promotion.permissionMessage" />
            </div>
          </div>
        </bz-card>
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
  name: 'Promotion2',
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
