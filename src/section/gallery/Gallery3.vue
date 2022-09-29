<template>
  <div
    class="bz-section-container bz-sec--gallery3-root"
    :class="{ [breakPoint]: true }"
    :data-section-id="section.sectionUUID"
  >
    <bz-background
      :setting="background"
      :size="sectionSize"
      :bz-animation-class="setting.animationClass"
    >
      <bz-container>
        <bz-title v-if="setting.elements.title" v-model="data.elements.title" />

        <bz-subtitle
          v-if="setting.elements.subtitle"
          v-model="data.elements.subtitle"
        />

        <bz-text
          v-if="setting.elements.description"
          v-model="data.elements.description"
        />
        <div class="w-100">
          <bz-items
            v-model="data.items"
            :grid="true"
            :shadow="setting.layouts.shadow"
            :spacing="setting.layouts.spacing"
          >
            <template v-slot="{ index }">
              <bz-image
                v-model="data.items[index].image"
                :circle="setting.layouts.shape === 'circle'"
              />
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
import BzTitle from "../../components/section/BzTitle";
import BzSubtitle from "../../components/section/BzSubtitle";
import BzText from "../../components/section/BzText";
import BzItems from "../../components/section/BzItems";
import BzImage from "../../components/section/BzImage";

export default {
  components: {
    BzImage,
    BzItems,
    BzText,
    BzSubtitle,
    BzTitle,
    BzContainer,
    BzBackground,
  },
  mixins: [sectionMixin],
  props: ["position"],
};
</script>

<style lang="scss">
.bz-sec--gallery3-root {
  .content {
    padding: 30px 0;
  }
}
</style>
