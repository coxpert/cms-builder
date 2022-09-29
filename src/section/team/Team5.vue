<template>
  <div
    class="bz-section-container bz-sec--team-5-root"
    :class="{ [breakPoint]: true }"
    :data-section="section.sectionUUID"
  >
    <bz-background
      :setting="background"
      :size="sectionSize"
      :bz-animation-class="setting.animationClass"
    >
      <bz-container>
        <div class="mb-3">
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
        </div>

        <bz-items v-model="data.items" :shadow="false" :cols="2">
          <template slot-scope="{ item, index }">
            <div class="col-12">
              <div class="row">
                <div class="col-lg-5 p-0">
                  <bz-image
                    v-if="setting.listElements.image"
                    v-model="data.items[index].image"
                    resize-mode="full"
                  />
                </div>

                <div class="col-lg-7 p-3">
                  <bz-alignment :alignment="setting.layouts.alignment">
                    <bz-title
                      v-if="setting.listElements.title"
                      v-model="data.items[index].title"
                      :background-color="'#ffffff'"
                    />
                    <bz-text
                      v-if="setting.listElements.description"
                      v-model="data.items[index].description"
                      :background-color="'#ffffff'"
                    />
                  </bz-alignment>
                </div>
              </div>
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
  name: "Team5",
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
.bz-sec--team-5-root {
}
</style>
