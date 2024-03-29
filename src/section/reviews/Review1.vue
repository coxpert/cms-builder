<template>
  <div class="bz-section-container bz-sec--reviews-1-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" :size="sectionSize" :bzAnimationClass="setting.animationClass">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title v-model="data.elements.title" v-if="setting.elements.title" :background-color="theme.primaryColor" />

          <bz-text v-model="data.elements.subtitle" v-if="setting.elements.subtitle" />

          <bz-text v-model="data.elements.description" v-if="setting.elements.description" />
        </bz-alignment>

        <bz-items v-model="data.items" :cols="setting.column" :shadow="false">
          <template slot-scope="{ index }">
            <div class="d-flex">
              <bz-image :ratio="1" v-model="data.items[index].image" width="100px" rounded v-if="setting.listElements.image" />
              <div class="d-flex flex-column justify-content-end pl-4">
                <bz-title v-model="data.items[index].title" v-if="setting.listElements.title" :mb="0" />

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

                <bz-text v-model="data.items[index].date" v-if="setting.listElements.date" :mb="0" />
              </div>
            </div>

            <bz-divider :line="true" />

            <bz-text v-model="data.items[index].description" v-if="setting.listElements.title" />

            <bz-button v-model="data.items[index].button" :link="false" v-if="setting.listElements.buttons" />
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

export default {
  name: 'Review1',
  components: {
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
  data() {
    return {
      editing: false
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
.bz-sec--reviews-1-root {
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
}
</style>
