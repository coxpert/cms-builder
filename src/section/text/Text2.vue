<template>
  <div
    class="bz-section-container bz-sect--text-2-root"
    :class="{ [breakPoint]: true }"
    :data-section="section.sectionUUID"
  >
    <bz-background
      :setting="background"
      :size="sectionSize"
      :bzAnimationClass="setting.animationClass"
    >
      <bz-container class="p-4">
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
      <bz-container>
        <bz-items
          v-model="data.items"
          :cols="setting.column"
          category-name="text"
          :shadow="false"
        >
          <template slot-scope="{ item }">
            <div class="w-100 p-2">
              <bz-title
                v-if="setting.listElements.title"
                v-model="item.title"
              />
              <bz-text
                v-if="setting.listElements.description"
                v-model="item.description"
              />
              <div
                v-if="setting.listElements.buttons"
                class="d-flex justify-content-end"
              >
                <bz-button-group v-model="item.buttons" />
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
import BzTitle from "../../components/section/BzTitle";
import BzBackground from "../../components/section/BzBackground";
import BzContainer from "../../components/section/BzContainer";
import BzItems from "../../components/section/BzItems";
import BzText from "../../components/section/BzText";
import BzSubtitle from "../../components/section/BzSubtitle";
import BzButtonGroup from "../../components/section/BzButtonGroup";

export default {
  name: "Text2",
  mixins: [sectionMixin],
  components: {
    BzButtonGroup,
    BzSubtitle,
    BzText,
    BzItems,
    BzContainer,
    BzBackground,
    BzTitle,
  },
};
</script>
<style lang="scss" scoped>
.bz-sect--text-2-root {
  .content {
    padding: 30px 0;
  }
}
</style>
