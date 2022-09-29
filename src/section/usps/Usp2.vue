<template>
  <div
    class="bz-section-container bz-sec--usp-2-root"
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
        </bz-alignment>

        <bz-divider />

        <bz-items
          v-model="data.items"
          :cols="setting.column"
          :shadow="setting.layouts.shadow"
          :spacing="setting.listElements.spacing"
          :styles="{ card: { padding: '30px', backgroundColor: '#ffffff' } }"
        >
          <template slot-scope="{ index }">
            <bz-alignment :alignment="setting.layouts.alignment">
              <div v-if="setting.listElements.icon" class="usp-item-container">
                <bz-icon
                  v-model="data.items[index].icon"
                  :text-color="'#ffffffff'"
                />
              </div>

              <bz-divider />

              <bz-title
                v-if="setting.listElements.title"
                v-model="data.items[index].title"
              />

              <bz-text
                v-if="setting.listElements.subtitle"
                v-model="data.items[index].subtitle"
              />

              <bz-text
                v-if="setting.listElements.description"
                v-model="data.items[index].description"
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
  mixins: [sectionMixin],
};
</script>
<style lang="scss" scoped>
.bz-sec--usp-2-root {
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
