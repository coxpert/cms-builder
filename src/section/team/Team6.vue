<template>
  <div
    class="bz-section-container bz-sec--team-6-root"
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
      </bz-container>
      <div class="col-12 px-5">
        <bz-items v-model="data.items" :shadow="false" :cols="2">
          <template slot-scope="{ item, index }">
            <div class="col-12 bz-bg-gray">
              <div class="row">
                <div class="col-lg-8 p-3">
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
                <div class="col-lg-4 p-0">
                  <bz-image
                    v-if="setting.listElements.image"
                    v-model="data.items[index].image"
                    resize-mode="full"
                  />
                </div>
              </div>
            </div>
          </template>
        </bz-items>
      </div>
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
  name: "Team6",
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
};
</script>
<style lang="scss" scoped>
.bz-sec--team-6-root {
}
</style>
