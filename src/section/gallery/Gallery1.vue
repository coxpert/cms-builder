<template>
  <div
    class="bz-section-container gallery1"
    :data-section-id="section.sectionUUID"
    :class="{ [breakPoint]: true }"
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
      </bz-container>
      <bz-container :full-size="fullSize">
        <div class="w-100">
          <bz-items
            v-model="data.items"
            :cols="setting.column"
            :shadow="setting.layouts.shadow"
            :spacing="setting.layouts.spacing"
          >
            <template v-slot="{ index }">
              <bz-image
                v-model="data.items[index].image"
                :circle="setting.layouts.shape === 'circle'"
              />
              <div class="item-title">
                <bz-title
                  v-if="setting.listElements.title"
                  v-model="data.items[index].title"
                  class="text-center p-2"
                  :mb="0"
                />
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
  methods: {
    handleImageItemChange(index, value) {
      this.data.items[index] = value;
      this.data = window._copy(this.data);
    },
  },
};
</script>

<style lang="scss">
.gallery1 {
  .content {
    padding: 30px 0;
  }
  .item-title {
    background-color: var(--bz-theme-background-gray);
    padding: 5px;
  }
}
</style>
