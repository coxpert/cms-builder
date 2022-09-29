<template>
  <div
    class="bz-section-container bz-sect--text-1-root"
    :class="{ [breakPoint]: true }"
    :data-section="section.sectionUUID"
  >
    <bz-background :setting="background" :size="sectionSize">
      <div class="section-content">
        <bz-container>
          <div class="col-12 py-0">
            <div
              class="row"
              :class="{ 'flex-row-reverse': setting.alignment === 'right' }"
            >
              <div class="col-lg-6">
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
              </div>
              <div class="col-lg-6 d-flex align-items-center">
                <bz-card :shadow="setting.layouts.shadow">
                  <bz-items
                    v-model="data.items"
                    :cols="1"
                    category-name="text"
                    :shadow="false"
                  >
                    <template v-slot="{ item }">
                      <bz-alignment :alignment="setting.layouts.alignment">
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
                      </bz-alignment>
                    </template>
                  </bz-items>
                </bz-card>
              </div>
            </div>
          </div>
        </bz-container>
      </div>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from "../../mixins/sectionMixin";
import BzTitle from "../../components/section/BzTitle";
import BzCard from "../../components/section/BzCard";
import BzBackground from "../../components/section/BzBackground";
import BzContainer from "../../components/section/BzContainer";
import BzText from "../../components/section/BzText";
import BzItems from "../../components/section/BzItems";
import BzSubtitle from "../../components/section/BzSubtitle";
import BzButtonGroup from "../../components/section/BzButtonGroup";
import BzAlignment from "../../components/section/BzAlignment";

export default {
  name: "Text1",
  components: {
    BzAlignment,
    BzButtonGroup,
    BzSubtitle,
    BzItems,
    BzText,
    BzContainer,
    BzBackground,
    BzCard,
    BzTitle,
  },
  mixins: [sectionMixin],
};
</script>
<style lang="scss" scoped>
.bz-sect--text-1-root {
  @import "style";
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
