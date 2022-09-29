<template>
  <div
    class="bz-section-container bz-sec--business-hours-4-root"
    :class="{ [breakPoint]: true }"
  >
    <bz-background
      :background-color="mainBackgroundColor"
      :setting="background"
      :size="sectionSize"
    >
      <bz-container>
        <bz-card :shadow="false">
          <div class="col-12">
            <div
              class="row"
              :class="{ 'flex-row-reverse': setting.alignment === 'right' }"
            >
              <div v-if="setting.elements.image" class="col-lg-6">
                <bz-image
                  v-if="setting.elements.image"
                  v-model="data.elements.image"
                  :disable-aspect-view="true"
                  resize-mode="full"
                  :max-height="500"
                />
              </div>
              <div :class="setting.elements.image ? 'col-lg-6' : 'col-12'">
                <div
                  class="w-100 h-100 d-flex justify-content-around flex-column pt-5"
                >
                  <bz-text-element
                    v-model="data.elements"
                    :setting="setting.elements"
                  />
                  <bz-divider />
                  <bz-business-hours
                    :location="setting.businessInformation.location"
                    :design="2"
                  />
                </div>
              </div>
            </div>
          </div>
        </bz-card>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from "../../mixins/sectionMixin";
import BzBackground from "../../components/section/BzBackground";
import BzBusinessHours from "../../components/section/BzBusinessHours";
import BzContainer from "../../components/section/BzContainer";
import BzDivider from "../../components/section/BzDivider";
import BzImage from "../../components/section/BzImage";
import BzCard from "../../components/section/BzCard";
import BzTextElement from "../../components/section/BzTextElement";

export default {
  name: "BusinessHours4",
  components: {
    BzTextElement,
    BzCard,
    BzImage,
    BzDivider,
    BzContainer,
    BzBusinessHours,
    BzBackground,
  },
  mixins: [sectionMixin],
  computed: {
    mainBackgroundColor() {
      const originalColor = window.tinycolor(this.backgroundColor);
      return originalColor.darken(4).toString();
    },
  },
};
</script>
