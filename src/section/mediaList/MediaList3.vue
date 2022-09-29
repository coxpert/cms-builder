<template>
  <div
    class="bz-section-container bz-sec--media-list-3-root"
    :class="{ [breakPoint]: true }"
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

        <bz-items v-model="data.items" :cols="column" :shadow="false">
          <template v-slot="{ item, index }">
            <div class="card-body" :style="alignmentStyle(index)">
              <size-editor
                v-model="data.items[index].image.size"
                initial-width="20%"
                :style="imageStyle"
              >
                <bz-image
                  v-if="setting.listElements.image"
                  v-model="data.items[index].image"
                  :ratio="aspectRatio"
                />
              </size-editor>
              <div class="card-text-wrapper">
                <bz-alignment :alignment="textAlignment(index)">
                  <bz-title
                    v-if="setting.listElements.title"
                    v-model="data.items[index].title"
                  />

                  <bz-text
                    v-if="setting.listElements.subtitle"
                    v-model="data.items[index].subtitle"
                  />

                  <bz-divider
                    v-if="setting.listElements.dividerLine"
                    :line="true"
                  />

                  <bz-text
                    v-if="setting.listElements.description"
                    v-model="data.items[index].description"
                  />
                </bz-alignment>
              </div>
            </div>
          </template>
        </bz-items>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzBackground from "../../components/section/BzBackground";
import BzContainer from "../../components/section/BzContainer";
import BzAlignment from "../../components/section/BzAlignment";
import BzTitle from "../../components/section/BzTitle";
import BzSubtitle from "../../components/section/BzSubtitle";
import BzText from "../../components/section/BzText";
import BzItems from "../../components/section/BzItems";
import BzImage from "../../components/section/BzImage";
import BzDivider from "../../components/section/BzDivider";
import MediaList1 from "./MediaList1";
import SizeEditor from "../../components/editor/SizeEditor";

export default {
  name: "MediaList3",
  components: {
    SizeEditor,
    BzDivider,
    BzImage,
    BzItems,
    BzText,
    BzSubtitle,
    BzTitle,
    BzAlignment,
    BzContainer,
    BzBackground,
  },
  extends: MediaList1,
  computed: {
    column() {
      if (this.setting.column > 2) {
        return 2;
      }
      return this.setting.column;
    },
    imageStyle() {
      if (this.setting.layouts.shadow) {
        return {
          boxShadow: "0 .5rem 1rem -.25rem #0000007f",
        };
      } else {
        return {};
      }
    },
  },
  methods: {
    textAlignment(index) {
      if (this.setting.column === 1) {
        if (index % 2 && this.setting.alignment === "alternate") {
          if (this.setting.layouts.alignment === "left") {
            return "right";
          } else if (this.setting.layouts.alignment === "right") {
            return "left";
          }
        }
      }
      return this.setting.layouts.alignment;
    },
    alignmentStyle(index) {
      if (this.setting.column === 1) {
        if (this.setting.alignment === "right") {
          return {
            flexDirection: "row-reverse",
          };
        } else if (this.setting.alignment === "alternate") {
          if (index % 2) {
            return {
              flexDirection: "row-reverse",
            };
          }
        }
      }
      return {};
    },
  },
};
</script>

<style lang="scss" scoped>
.bz-sec--media-list-3-root {
  .card-body {
    display: flex;
    width: 100%;
    flex-direction: row;
    padding: 0;

    .card-image-wrapper {
      width: max-content;
    }
    .card-text-wrapper {
      padding: 0 10px;
      display: flex;
    }
  }
}
</style>
