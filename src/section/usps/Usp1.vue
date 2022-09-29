<template>
  <div
    class="bz-section-container bz-sec--usp-1-root"
    :class="{ [breakPoint]: true }"
    :data-section="section.sectionUUID"
  >
    <bz-background
      :setting="background"
      :size="sectionSize"
      :bzAnimationClass="setting.animationClass"
    >
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title
            v-model="data.elements.title"
            v-if="setting.elements.title"
            :text-color="theme.primaryColor"
          />
          <bz-text
            v-model="data.elements.subtitle"
            v-if="setting.elements.subtitle"
          />
          <bz-text
            v-model="data.elements.description"
            v-if="setting.elements.description"
          />
        </bz-alignment>

        <bz-divider />

        <bz-items
          v-model="data.items"
          :cols="setting.column"
          :shadow="false"
          :spacing="false"
        >
          <template slot-scope="{ item, index }">
            <bz-alignment :alignment="setting.layouts.alignment">
              <div class="usp-item-container" v-if="setting.listElements.icon">
                <bz-icon
                  v-model="data.items[index].icon"
                  :text-color="'#ffffffff'"
                />
              </div>

              <bz-divider />

              <bz-title
                v-model="data.items[index].title"
                v-if="setting.listElements.title"
              />

              <bz-text
                v-model="data.items[index].subtitle"
                v-if="setting.listElements.subtitle"
              />

              <bz-text
                v-model="data.items[index].description"
                v-if="setting.listElements.description"
              />
            </bz-alignment>
          </template>
        </bz-items>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from "../../mixins/sectionMixin";
import BzBackground from "../../components/section/BzBackground";
import BzAlignment from "../../components/section/BzAlignment";
import BzContainer from "../../components/section/BzContainer";
import BzTitle from "../../components/section/BzTitle";
import BzText from "../../components/section/BzText";
import BzItems from "../../components/section/BzItems";
import BzDivider from "../../components/section/BzDivider";
import BzIcon from "../../components/section/BzIcon";

export default {
  mixins: [sectionMixin],
  components: {
    BzIcon,
    BzDivider,
    BzItems,
    BzText,
    BzTitle,
    BzContainer,
    BzAlignment,
    BzBackground,
  },
};
</script>
<style lang="scss" scoped>
.bz-sec--usp-1-root {
  .usp-item-container {
    width: 80px;
    height: 80px;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--bz-primary-color);
  }
}
</style>
