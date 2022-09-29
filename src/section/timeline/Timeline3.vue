<template>
  <div
    class="bz-section-container bz-sec--timeline-3-root"
    :class="{ [breakPoint]: true }"
    :data-section="section.sectionUUID"
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
          <bz-text
            v-if="setting.elements.subtitle"
            v-model="data.elements.subtitle"
          />
          <bz-text
            v-if="setting.elements.description"
            v-model="data.elements.description"
          />

          <div class="timeline-items-field">
            <bz-items
              v-model="data.items"
              :cols="1"
              :shadow="false"
              :spacing="false"
            >
              <template v-slot="{ index }">
                <div class="time-line-item" :style="listItemStyle(index)">
                  <div
                    v-if="setting.listElements.date"
                    class="timeline-dot"
                    :style="dotStyle"
                  >
                    <bz-title
                      v-model="data.items[index].date"
                      :background-color="theme.primaryColor"
                      :mb="0"
                    />
                  </div>
                  <div
                    class="timeline-content"
                    :style="listContentStyle(index)"
                  >
                    <bz-alignment :alignment="contentAlignment(index)">
                      <bz-title
                        v-if="setting.listElements.title"
                        v-model="data.items[index].title"
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
          </div>
        </bz-alignment>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from "../../mixins/sectionMixin";
import BzBackground from "../../components/section/BzBackground";
import BzTitle from "../../components/section/BzTitle";
import BzContainer from "../../components/section/BzContainer";
import BzText from "../../components/section/BzText";
import BzItems from "../../components/section/BzItems";
import BzAlignment from "../../components/section/BzAlignment";

export default {
  components: {
    BzAlignment,
    BzItems,
    BzText,
    BzContainer,
    BzTitle,
    BzBackground,
  },
  mixins: [sectionMixin],
  computed: {
    dotStyle() {
      if (this.setting.layouts.shape === "circle") {
        return {
          borderRadius: "1000px",
          backgroundColor: this.socialIconColor,
        };
      }
      if (this.setting.layouts.shape === "hexagon") {
        return {
          clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)",
          backgroundColor: this.socialIconColor,
        };
      }
      return {};
    },
  },
  methods: {
    listItemStyle(index) {
      if (this.setting.alignment === "alternate") {
        if (index % 2) {
          return {
            flexDirection: "row-reverse",
          };
        }
      }

      if (this.setting.alignment === "right") {
        return {
          flexDirection: "row-reverse",
        };
      }
    },
    listContentStyle(index) {
      if (this.setting.alignment === "alternate") {
        if (index % 2) {
          return {
            paddingRight: "30px",
          };
        }
      }

      if (this.setting.alignment === "right") {
        return {
          paddingRight: "30px",
        };
      }

      return {
        paddingLeft: "30px",
      };
    },
    contentAlignment(index) {
      if (this.setting.alignment === "alternate") {
        if (index % 2) {
          return "right";
        }
      }

      if (this.setting.alignment === "right") {
        return "right";
      }

      return "left";
    },
  },
};
</script>
<style lang="scss" scoped>
.bz-sec--timeline-3-root {
  .timeline-items-field {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
  }

  &.bz-md {
    .timeline-items-field {
      align-items: center;
    }
  }

  .timeline-items-field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    max-width: 600px;
    width: 100%;

    .time-line-item {
      position: relative;
      width: 100%;
      display: flex;

      .timeline-dot {
        width: 80px;
        height: 80px;
        margin-left: 7px;
        margin-top: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .timeline-content {
        width: max-content;
      }
    }
  }
}
</style>
