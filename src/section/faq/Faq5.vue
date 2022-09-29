<template>
  <div
    class="bz-section-container bz-sec--faq5-root"
    :class="{ [breakPoint]: true }"
    :data-section="section.sectionUUID"
  >
    <bz-background
      :setting="background"
      :size="sectionSize"
      :bz-animation-class="setting.animationClass"
    >
      <bz-container>
        <bz-title
          v-if="setting.elements.title"
          v-model="data.elements.title"
          :text-color="theme.primaryColor"
        />
        <bz-text
          v-if="setting.elements.subtitle"
          v-model="data.elements.subtitle"
        />
        <bz-text
          v-if="setting.elements.description"
          v-model="data.elements.description"
        />
        <bz-items v-model="data.items" :cols="1" :shadow="false">
          <template v-slot="{ index }">
            <bz-slide-up-down>
              <template slot="header">
                <div class="bz-fq-question-wrapper">
                  <bz-title
                    v-model="data.items[index].question"
                    :background-color="theme.primaryColor"
                  />
                </div>
              </template>
              <template slot="content">
                <div class="bz-fq-answer-wrapper">
                  <bz-text v-model="data.items[index].answer" />
                </div>
              </template>
            </bz-slide-up-down>
          </template>
        </bz-items>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from "../../mixins/sectionMixin";
import BzBackground from "../../components/section/BzBackground";
import BzContainer from "../../components/section/BzContainer";
import BzTitle from "../../components/section/BzTitle";
import BzText from "../../components/section/BzText";
import BzItems from "../../components/section/BzItems";
import BzSlideUpDown from "../../components/elements/BzSlideUpDown";

export default {
  name: "Faq5",
  components: {
    BzSlideUpDown,
    BzItems,
    BzText,
    BzTitle,
    BzContainer,
    BzBackground,
  },
  mixins: [sectionMixin],
};
</script>

<style lang="scss" scoped>
.bz-sec--faq5-root {
  .bz-fq-question-wrapper {
    background-color: var(--bz-primary-color);
    padding: 15px 5px 5px;
    border-radius: 2px;
  }

  .bz-fq-answer-wrapper {
    padding: 10px 0;
  }
}
</style>
