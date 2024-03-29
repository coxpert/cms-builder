<template>
  <div class="bz-section-container bz-sec--reviews-2-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" :size="sectionSize" :bzAnimationClass="setting.animationClass">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title v-model="data.elements.title" v-if="setting.elements.title" :background-color="theme.primaryColor" />

          <bz-text v-model="data.elements.subtitle" v-if="setting.elements.subtitle" />

          <bz-text v-model="data.elements.description" v-if="setting.elements.description" />
        </bz-alignment>

        <bz-items v-model="data.items" :cols="setting.column" :shadow="false">
          <template slot-scope="{ item, index }">
            <div class="p-5">
              <bz-card :padding="40" class="position-relative">
                <div class="bz-ee-image-container">
                  <bz-image :ratio="1" v-model="data.items[index].image" width="80px" rounded v-if="setting.listElements.image" />
                </div>

                <div class="d-flex flex-column">
                  <div class="d-flex align-items-center justify-content-between">
                    <bz-title v-model="data.items[index].title" v-if="setting.listElements.title" :background-color="cardBackgroundColor" :mb="0" />
                    <div style="width: 90px; display: flex; justify-content: flex-end">
                      <bz-setting :index="index" :on-click="openStarForm">
                        <star-rating
                          v-model:rating="data.items[index].review"
                          :max-rating="data.items[index].review"
                          :read-only="true"
                          :show-rating="false"
                          :star-size="18"
                          active-color="#fd9d20"
                        />

                        <div v-if="editing === index" v-click-outside="hideReviewsEditForm" class="bz-form-review-stars">
                          <div class="mr-2" style="font-size: 12px">Stars</div>
                          <vue-material-slider
                            :min="0"
                            :max="5"
                            v-model="data.items[index].review"
                            thumbLabel
                            :step="1"
                            :displayWith="
                              function (value) {
                                return value
                              }
                            "
                          />
                        </div>
                      </bz-setting>
                    </div>
                  </div>

                  <bz-text v-model="data.items[index].date" v-if="setting.listElements.date" :background-color="cardBackgroundColor" :mb="0" />
                </div>

                <bz-text class="my-3" v-model="data.items[index].description" v-if="setting.listElements.title" :background-color="cardBackgroundColor" />

                <div class="bz-ee-button-container">
                  <bz-button import sectionMixin from '../mixins/sectionMixin' v-model="data.items[index].button" :link="false" v-if="setting.listElements.buttons" :rounded="true"
                  />
                </div>
              </bz-card>
            </div>
          </template>
        </bz-items>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from '../../mixins/sectionMixin'
import BzContainer from '../../components/section/BzContainer'
import BzBackground from '../../components/section/BzBackground'
import BzAlignment from '../../components/section/BzAlignment'
import BzTitle from '../../components/section/BzTitle'
import BzText from '../../components/section/BzText'
import BzItems from '../../components/section/BzItems'
import BzDivider from '../../components/section/BzDivider'
import BzButton from '../../components/section/BzButton'
import StarRating from 'vue-star-rating'
import BzImage from '../../components/section/BzImage'
import BzSetting from '../../components/section/BzSetting'
import BzCard from '../../components/section/BzCard'

export default {
  components: {
    BzCard,
    BzSetting,
    BzImage,
    BzButton,
    BzDivider,
    BzItems,
    BzText,
    BzTitle,
    BzAlignment,
    BzBackground,
    BzContainer,
    StarRating
  },
  mixins: [sectionMixin],
  name: 'Review4',
  data() {
    return {
      editing: false
    }
  },
  computed: {
    cardBackgroundColor() {
      return '#ffffff'
    }
  },
  methods: {
    openStarForm(index) {
      this.editing = index
    },
    hideReviewsEditForm() {
      this.editing = false
    }
  }
}
</script>

<style lang="scss">
.bz-sec--reviews-2-root {
  .bz-form-review-stars {
    position: absolute;
    display: flex;
    align-items: center;
    width: 200px;
    padding: 10px;
    box-shadow: 0 0 10px 2px #00000012;
    border: solid 1px #00000012;
    bottom: -50px;
    background-color: white;
    z-index: 100000;
  }

  .bz-ee-image-container {
    position: absolute;
    top: -40px;
    justify-content: center;
    align-items: center;
    display: flex;
    left: -40px;
  }
}
</style>
