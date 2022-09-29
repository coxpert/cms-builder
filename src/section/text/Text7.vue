<template>
  <div
    class="bz-section-container bz-sect--section3-root"
    :class="{ [breakPoint]: true }"
    :data-section="section.sectionUUID"
  >
    <bz-background
      :setting="background"
      :size="sectionSize"
      :bzAnimationClass="setting.animationClass"
    >
      <bz-container>
        <div
          class="bz-row"
          :class="{ 'flex-row-reverse': setting.alignment === 'right' }"
        >
          <div class="bz-col-lg-8">
            <div :style="subtitleStyle">
              <bz-alignment :alignment="setting.layouts.alignment">
                <bz-title
                  v-if="setting.elements.title"
                  v-model="data.elements.title"
                />
                <bz-text
                  v-if="setting.elements.description"
                  v-model="data.elements.description"
                />
                <bz-button-group
                  v-if="setting.elements.buttons"
                  v-model="data.elements.buttons"
                  class="mt-3"
                />
              </bz-alignment>
            </div>
          </div>
          <div class="bz-col-lg-4">
            <bz-subtitle
              v-if="setting.elements.subtitle"
              v-model="data.elements.subtitle"
            />
          </div>
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from "../../mixins/sectionMixin";
import BzTitle from "../../components/section/BzTitle";
import BzBackground from "../../components/section/BzBackground";
import BzContainer from "../../components/section/BzContainer";
import BzText from "../../components/section/BzText";
import BzSubtitle from "../../components/section/BzSubtitle";
import BzButtonGroup from "../../components/section/BzButtonGroup";
import BzAlignment from "../../components/section/BzAlignment";

export default {
  name: "Text7",
  components: {
    BzAlignment,
    BzButtonGroup,
    BzSubtitle,
    BzText,
    BzContainer,
    BzBackground,
    BzTitle,
  },
  mixins: [sectionMixin],
  computed: {
    subtitleStyle() {
      if (this.sectionWidth > 600) {
        if (this.setting.alignment === "left") {
          return {
            borderRight: "solid 1px #8080807f",
            paddingRight: "50px",
          };
        }
        return {
          borderLeft: "solid 1px #8080807f",
          paddingLeft: "50px",
        };
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.bz-sect--section3-root {
  .element-wrapper {
    padding: 60px;
    min-height: 200px;
  }

  &.bz-sm {
    .element-wrapper {
      padding: 0;
    }
  }
}
</style>
