<template>
  <div
    class="bz-section-container bz-sec--team-3-root"
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

        <div class="bz-item-container">
          <bz-items
            v-model="data.items"
            :shadow="setting.layouts.shadow"
            :cols="setting.column"
            :styles="{ card: { marginTop: '20px' } }"
          >
            <template v-slot="{ item, index }">
              <div class="col-12 bz-bg-gray">
                <bz-alignment alignment="center">
                  <bz-image
                    v-if="setting.listElements.image"
                    v-model="data.items[index].image"
                    resize-mode="full"
                    :styles="{
                      root: {
                        marginTop: '-50px',
                        width: '50%',
                        boxShadow: '0 0 20px 4px #00000034',
                      },
                      base: { boxShadow: '0 0 10px 2px #00000012' },
                    }"
                    :rounded="rounded"
                    :disable-aspect-view="disableAspectView"
                    :ratio="ratio"
                  />

                  <bz-divider :height="10" />

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
                  <bz-text
                    v-if="setting.listElements.description"
                    v-model="data.items[index].description"
                    :background-color="'#ffffff'"
                  />
                </bz-alignment>
              </div>
            </template>
          </bz-items>
        </div>
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
import BzDivider from "../../components/section/BzDivider";

export default {
  name: "Team3",
  components: {
    BzDivider,
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
      return 1;
    },
  },
};
</script>
<style lang="scss" scoped>
.bz-sec--team-3-root {
  .bz-item-container {
    margin-top: 30px;
  }
}
</style>
