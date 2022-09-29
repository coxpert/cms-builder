<template>
  <div
    class="bz-section-container bz-sec--sectionName-root"
    :class="{ [breakPoint]: true }"
  >
    <bz-background :setting="background">
      <div
        class="bz-row"
        :class="{ 'bz-row-reverse': setting.alignment === 'right' }"
      >
        <div class="bz-col-lg-6 py-0">
          <bz-background size="m">
            <bz-container>
              <bz-alignment :alignment="setting.layouts.alignment">
                <bz-title
                  v-model="data.elements.title"
                  v-if="setting.elements.title"
                />

                <bz-subtitle
                  v-model="data.elements.subtitle"
                  v-if="setting.elements.subtitle"
                />

                <bz-text
                  v-model="data.elements.description"
                  v-if="setting.elements.description"
                />
              </bz-alignment>

              <bz-items
                v-model="data.items"
                :cols="1"
                :shadow="false"
                :spacing="false"
              >
                <template slot-scope="{ item }">
                  <div class="bz-col-12 py-0">
                    <div
                      class="bz-row"
                      :class="{
                        'bz-row-reverse': setting.layouts.alignment === 'right',
                      }"
                    >
                      <div class="bz-col-8 py-0">
                        <bz-alignment :alignment="setting.layouts.alignment">
                          <bz-text
                            :bold="true"
                            v-model="item.title"
                            v-if="setting.listElements.title"
                            :size="'1.1em'"
                          />
                        </bz-alignment>
                      </div>
                      <div class="bz-col-4 py-0">
                        <bz-alignment :alignment="setting.layouts.alignment">
                          <bz-text
                            v-if="setting.listElements.price"
                            v-model="item.price"
                            :bold="true"
                            :size="'1.1em'"
                          />
                        </bz-alignment>
                      </div>
                    </div>
                  </div>
                  <div class="bz-col-12 py-0">
                    <bz-alignment :alignment="setting.layouts.alignment">
                      <bz-text
                        v-if="setting.listElements.description"
                        v-model="item.subtitle"
                      />
                    </bz-alignment>
                  </div>
                </template>
              </bz-items>
            </bz-container>
          </bz-background>
        </div>
        <div class="bz-col-lg-6 py-0"></div>
      </div>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from "../../mixins/sectionMixin";
import BzBackground from "../../components/section/BzBackground";
import BzTitle from "../../components/section/BzTitle";
import BzText from "../../components/section/BzText";
import BzAlignment from "../../components/section/BzAlignment";
import BzContainer from "../../components/section/BzContainer";
import BzSubtitle from "../../components/section/BzSubtitle";
import BzItems from "../../components/section/BzItems";

export default {
  components: {
    BzItems,
    BzSubtitle,
    BzContainer,
    BzAlignment,
    BzText,
    BzTitle,
    BzBackground,
  },
  mixins: [sectionMixin],
  name: "Menu1",
};
</script>

<style scoped></style>
