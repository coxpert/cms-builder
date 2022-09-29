<template>
  <div
    class="bz-section-container bz-sec--product-2-root"
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

        <bz-items
          v-model="data.items"
          :cols="1"
          :shadow="false"
          :show-add-item="false"
        >
          <template slot-scope="{ item, index }">
            <div class="bz-fl-product-card" :style="cardAlignmentStyle(index)">
              <div class="bz-ee-product-image" :style="imageStyle(index)">
                <bz-image
                  v-if="setting.listElements.image"
                  v-model="data.items[index].image"
                  :ratio="aspectRatio"
                  :disable-aspect-view="
                    setting.layouts.aspectRatio === 'original'
                  "
                  :circle="setting.layouts.aspectRatio === 'circle'"
                />
              </div>
              <div class="bz-ee-product-content">
                <bz-alignment :alignment="alignment(index)">
                  <bz-divider
                    v-if="setting.listElements.dividerLine"
                    :line="true"
                    :line-color="theme.primaryColor"
                    width="50"
                    :thickness="2"
                  />
                  <bz-title
                    v-if="setting.listElements.title"
                    v-model="data.items[index].title"
                  />
                  <bz-text
                    v-if="setting.listElements.description"
                    v-model="data.items[index].description"
                  />
                  <div class="bz-text-root product-info">
                    <div>
                      <span
                        v-if="
                          data.items[index].title && setting.listElements.price
                        "
                        class="badge badge-pill badge-dark p-2"
                        >Price: {{ data.items[index].price }}$</span
                      >
                      <span
                        v-if="
                          data.items[index].sizes && setting.listElements.sizes
                        "
                        class="badge badge-pill badge-dark p-2"
                        >Sizes: {{ data.items[index].sizes }}</span
                      >
                      <span
                        v-if="
                          data.items[index].colors &&
                          setting.listElements.colors
                        "
                        class="badge badge-pill badge-dark p-2"
                        >Colors: {{ data.items[index].colors }}</span
                      >
                    </div>
                  </div>
                  <bz-button
                    v-model="data.items[index].button"
                    :class="'add_to_cart'"
                    :data-id="item.id"
                    :link="false"
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
import sectionMixin from "../../mixins/sectionMixin";
import BzSubtitle from "../../components/section/BzSubtitle";
import BzText from "../../components/section/BzText";
import BzTitle from "../../components/section/BzTitle";
import BzAlignment from "../../components/section/BzAlignment";
import BzContainer from "../../components/section/BzContainer";
import BzBackground from "../../components/section/BzBackground";
import BzItems from "../../components/section/BzItems";
import BzButton from "../../components/section/BzButton";
import BzImage from "../../components/section/BzImage";
import BzDivider from "../../components/section/BzDivider";

export default {
  name: "Product2",
  components: {
    BzDivider,
    BzImage,
    BzButton,
    BzItems,
    BzBackground,
    BzContainer,
    BzAlignment,
    BzTitle,
    BzText,
    BzSubtitle,
  },
  mixins: [sectionMixin],
  computed: {
    aspectRatio() {
      switch (this.setting.layouts.aspectRatio) {
        case "portrait": {
          return 3 / 2;
        }
        case "landscape": {
          return 2 / 3;
        }
        default: {
          return 1;
        }
      }
    },
  },
  methods: {
    imageStyle(index) {
      let boxShadow = "0 0 0 0 #00000000";
      let borderRadius = 0;

      if (this.setting.layouts.aspectRatio === "circle") {
        borderRadius = "10000px";
      }

      if (this.setting.layouts.shadow) {
        boxShadow = "0 0 10px 2px #00000034";
      }
      if (this.setting.alignment === "alternate") {
        if (index % 2) {
          return {
            boxShadow: boxShadow,
            marginLeft: "30px",
            borderRadius,
          };
        }
      } else if (this.setting.alignment === "right") {
        return {
          boxShadow: boxShadow,
          marginLeft: "30px",
          borderRadius,
        };
      }
      return {
        boxShadow: boxShadow,
        marginRight: "30px",
        borderRadius,
      };
    },
    alignment(index) {
      if (this.setting.alignment === "alternate") {
        if (index % 2) {
          if (this.setting.layouts.alignment === "right") {
            return "left";
          } else if (this.setting.layouts.alignment === "left") {
            return "right";
          }
        }
      } else if (this.setting.alignment === "right") {
        if (this.setting.layouts.alignment === "left") {
          return "right";
        }
      }

      return this.setting.layouts.alignment;
    },
    cardAlignmentStyle(index) {
      if (this.setting.alignment === "alternate") {
        if (index % 2) {
          return {
            flexDirection: "row-reverse",
          };
        }
      } else if (this.setting.alignment === "right") {
        return {
          flexDirection: "row-reverse",
        };
      }
      return {
        flexDirection: "row",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.bz-sec--product-2-root {
  .bz-fl-product-card {
    display: flex;

    .bz-ee-product-image {
      width: 30%;
    }
    .bz-fl-product-card {
      display: flex;
    }
    .product-info {
      line-height: 1.2em;
      margin-bottom: 0.5em;
      color: rgb(0, 0, 0);
      font-size: 1em;
      font-weight: normal;
      padding-top: 6px;
      padding-bottom: 16px;
    }
  }
}
</style>
