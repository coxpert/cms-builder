<template>
  <div
    class="bz-section-container bz-sec-call-to-action-1-root"
    :class="{ [breakPoint]: true }"
  >
    <bz-background
      :setting="background"
      :size="sectionSize"
      :bzAnimationClass="setting.animationClass"
    >
      <bz-container>
        <div class="content" :class="{ [setting.layouts.alignment]: true }">
          <bz-text-element
            v-model="data.elements"
            :setting="setting.elements"
            :alignment="setting.layouts.alignment"
          />

          <div class="buttons" :class="{ [setting.layouts.alignment]: true }">
            <bz-button-group
              class="mt-3"
              v-model="data.elements.buttons"
              v-if="setting.elements.buttons"
            />
          </div>
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzBackground from "../../components/section/BzBackground";
import BzContainer from "../../components/section/BzContainer";
import sectionMixin from "../../mixins/sectionMixin";
import BzButtonGroup from "../../components/section/BzButtonGroup";
import BzTextElement from "../../components/section/BzTextElement";
export default {
  components: {
    BzTextElement,
    BzButtonGroup,
    BzContainer,
    BzBackground,
  },
  mixins: [sectionMixin],
};
</script>
<style lang="scss">
.bz-sec-call-to-action-1-root {
  .content {
    .text-elements {
      width: 70%;

      &.left {
        text-align: left;
      }

      &.center {
        text-align: center;
        width: 100%;
      }

      &.right {
        text-align: right;
      }
    }

    .buttons {
      width: 30%;
      display: flex;
      align-items: flex-end;
      flex-wrap: wrap;
      justify-content: flex-end;

      &.center {
        width: 100%;
        align-items: center;
        justify-content: center;
      }

      &.right {
        justify-content: flex-start;
      }
    }

    &.right,
    &.left {
      display: flex;
      align-items: flex-end;
    }

    &.center {
      flex-direction: column;
    }

    &.right {
      flex-flow: row-reverse;
    }
  }
}
</style>
