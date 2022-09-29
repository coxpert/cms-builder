<template>
  <div class="w-100 p-3">
    <div v-if="categorySections.length > 1" class="w-100">
      <h6>Layout</h6>
      <div class="layouts-wrapper">
        <div class="back-button" @click.prevent="panelArrowAction('left')">
          <arrow-back-icon fill-color="white" />
        </div>
        <div class="current-layout">
          {{ setting.layout }}/{{ categorySections.length }}
        </div>
        <div class="forward-button" @click.prevent="panelArrowAction('right')">
          <arrow-forward-icon fill-color="white" />
        </div>
      </div>
    </div>

    <div v-if="setting.hasOwnProperty('alignment')" class="w-100 mt-3">
      <h6>Alignment</h6>
      <div class="alignment-wrapper">
        <div
          class="align-left"
          :class="{ active: setting.alignment === 'left' }"
          @click="setting.alignment = 'left'"
        >
          <align-left-icon />
        </div>
        <div
          v-if="(setting.alignments || []).includes('alternate')"
          class="align-alternate"
          :class="{ active: setting.alignment === 'alternate' }"
          @click="setting.alignment = 'alternate'"
        >
          <align-alternate-icon />
        </div>
        <div
          class="align-right"
          :class="{ active: setting.alignment === 'right' }"
          @click="setting.alignment = 'right'"
        >
          <align-right-icon />
        </div>
      </div>
    </div>

    <div v-if="setting.hasOwnProperty('columns')" class="w-100 mt-3">
      <h6>Columns</h6>
      <div class="column-wrapper">
        <div
          v-for="column of setting.columns"
          :key="column"
          class="column-item"
          :class="{ active: setting.column === column }"
          @click="setting.column = column"
        >
          {{ column }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SettingBase from "./SettingBase";
import ArrowBackIcon from "../icons/ArrowBack";
import ArrowForwardIcon from "../icons/ArrowForward";
import AlignLeftIcon from "../icons/AlignLeft";
import AlignAlternateIcon from "../icons/AlignAlternate";
import AlignRightIcon from "../icons/AlignRight";

export default {
  name: "SettingAlignment",
  components: {
    AlignRightIcon,
    AlignAlternateIcon,
    AlignLeftIcon,
    ArrowForwardIcon,
    ArrowBackIcon,
  },
  extends: SettingBase,
  computed: {
    categorySections() {
      if (this.activePosition === "header") {
        return this.headerSections;
      }

      if (this.activePosition === "footer") {
        return this.footerSections;
      }

      if (this.activeSection && this.activeSection.category) {
        return this.activeSection.category.sections;
      }
      return {};
    },
  },
};
</script>
