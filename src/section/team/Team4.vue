<template>
  <div
    class="bz-section-container bz-sec--team-4-root"
    :class="{ [breakPoint]: true }"
    :data-section="section.sectionUUID"
  >
    <bz-background
      :setting="background"
      :size="sectionSize"
      :bz-animation-class="setting.animationClass"
    >
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title
            v-if="setting.elements.title"
            v-model="data.elements.title"
            :text-color="theme.primaryColor"
          />

          <bz-subtitle
            v-if="setting.elements.subtitle"
            v-model="data.elements.subtitle"
          />

          <bz-text
            v-if="setting.elements.description"
            v-model="data.elements.description"
          />
        </bz-alignment>

        <bz-items v-model="data.items" :shadow="false" :cols="setting.column">
          <template v-slot="{ item, index }">
            <bz-alignment :alignment="setting.layouts.alignment">
              <bz-image
                v-if="setting.listElements.image"
                v-model="data.items[index].image"
                resize-mode="full"
                :styles="{
                  root: {
                    width: '40%',
                  },
                }"
                :rounded="rounded"
                :disable-aspect-view="disableAspectView"
                :ratio="ratio"
              />
            </bz-alignment>
            <div class="mt-3">
              <bz-alignment :alignment="setting.layouts.alignment">
                <bz-title
                  v-if="setting.listElements.title"
                  v-model="data.items[index].title"
                  :background-color="'#ffffff'"
                />
                <bz-text
                  v-if="setting.listElements.subtitle"
                  v-model="data.items[index].subtitle"
                  :background-color="'#ffffff'"
                />
              </bz-alignment>
            </div>
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
import BzAlignment from "../../components/section/BzAlignment";
import BzTitle from "../../components/section/BzTitle";
import BzSubtitle from "../../components/section/BzSubtitle";
import BzItems from "../../components/section/BzItems";
import BzText from "../../components/section/BzText";
import BzImage from "../../components/section/BzImage";

export default {
  name: "Team4",
  components: {
    BzImage,
    BzText,
    BzItems,
    BzSubtitle,
    BzTitle,
    BzAlignment,
    BzContainer,
    BzBackground,
  },
  mixins: [sectionMixin],
  computed: {
    rounded() {
      return this.setting.layouts.aspectRatio === "circle";
    },
    disableAspectView() {
      return this.setting.layouts.aspectRatios === "original";
    },
    ratio() {
      if (
        this.setting.layouts.aspectRatio === "circle" ||
        this.setting.layouts.aspectRatio === "square"
      ) {
        return 1;
      }
      if (this.setting.layouts.aspectRatio === "landscape") {
        return 3 / 4;
      }
      if (this.setting.layouts.aspectRatio === "portrait") {
        return 4 / 3;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.bz-sec--team-4-root {
}
</style>
