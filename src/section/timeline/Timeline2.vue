<template>
  <div
    class="bz-section-container bz-sec--timeline-2-root"
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
        </bz-alignment>

        <div class="timeline-items-field">
          <div class="vertical-line"></div>
          <bz-items
            v-model="data.items"
            :cols="1"
            :shadow="false"
            :spacing="false"
          >
            <template v-slot="{ item, index }">
              <div class="time-line-item">
                <div v-if="setting.listElements.image" class="timeline-dot">
                  <bz-image v-model="data.items[index].image" :circle="true" />
                </div>
                <div class="w-100">
                  <div class="timeline-content" :style="listStyle(index)">
                    <bz-alignment :alignment="listAlignment(index)">
                      <bz-title
                        v-if="setting.listElements.title"
                        v-model="data.items[index].title"
                      />

                      <bz-text
                        v-if="setting.listElements.date"
                        v-model="data.items[index].date"
                      />

                      <bz-text
                        v-if="setting.listElements.description"
                        v-model="data.items[index].description"
                      />

                      <bz-divider />
                    </bz-alignment>
                  </div>
                </div>
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
import BzTitle from "../../components/section/BzTitle";
import BzContainer from "../../components/section/BzContainer";
import BzSubtitle from "../../components/section/BzSubtitle";
import BzText from "../../components/section/BzText";
import BzItems from "../../components/section/BzItems";
import BzAlignment from "../../components/section/BzAlignment";
import BzDivider from "../../components/section/BzDivider";
import BzImage from "../../components/section/BzImage";

export default {
  components: {
    BzImage,
    BzDivider,
    BzAlignment,
    BzItems,
    BzText,
    BzSubtitle,
    BzContainer,
    BzTitle,
    BzBackground,
  },
  mixins: [sectionMixin],
  methods: {
    listAlignment(index) {
      if (this.sectionWidth > 768) {
        if (this.setting.alignment === "alternate") {
          if (index % 2) {
            return "right";
          }
          return "left";
        }
        if (this.setting.alignment === "left") {
          return "right";
        }
        return "left";
      }
      return "left";
    },
    listStyle(index) {
      if (this.sectionWidth > 768) {
        let alignment = this.setting.alignment;

        if (alignment === "alternate") {
          if (index % 2) {
            alignment = "left";
          } else {
            alignment = "right";
          }
        }

        if (alignment === "right") {
          return {
            marginLeft: "auto",
            paddingLeft: "80px",
          };
        }
        return {
          paddingRight: "80px",
        };
      }

      return {
        paddingLeft: "40px",
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.bz-sec--timeline-2-root {
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

    .vertical-line {
      height: calc(100% + 20px);
      width: 2px;
      background-color: var(--bz-primary-color);
      opacity: 0.1;
      position: absolute;
    }

    .time-line-item {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: flex-start;

      .timeline-dot {
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 100px;
        margin-left: -8px;
      }

      .timeline-content {
        width: 100%;
        min-height: 100px;
      }
    }
  }

  &.bz-md {
    .timeline-items-field {
      .time-line-item {
        justify-content: center;

        .timeline-dot {
          width: 80px;
          height: 80px;
          border-radius: 100px;
          margin-left: 0;
        }
      }
      .timeline-content {
        width: 50%;
      }
    }
  }
}
</style>
