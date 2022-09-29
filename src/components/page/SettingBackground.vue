<template>
  <div class="w-100">
    <template v-if="activePosition === 'header'">
      <div class="mt-4 px-2">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <span class="element_item_label">Connect to section below</span>
          <label class="custom_switch">
            <input
              v-model="header.data.background.connectToSectionBelow"
              type="checkbox"
            />
            <span />
          </label>
        </div>
      </div>
    </template>
    <template
      v-if="
        !(
          activePosition === 'header' &&
          header.data.background.connectToSectionBelow
        )
      "
    >
      <div class="p-2 mt-4">
        <div class="btn-group w-100 background-type">
          <button
            type="button"
            class="btn bg-white p-2"
            :class="{ active: activeBackgroundType === 'color' }"
            @click.prevent="activeBackgroundType = 'color'"
          >
            Color
          </button>
          <button
            type="button"
            class="btn bg-white p-2"
            :class="{ active: activeBackgroundType === 'image' }"
            @click.prevent="activeBackgroundType = 'image'"
          >
            Image
          </button>
          <button
            type="button"
            class="btn bg-white p-2"
            :class="{ active: activeBackgroundType === 'video' }"
            @click.prevent="activeBackgroundType = 'video'"
          >
            Video
          </button>
        </div>
      </div>
      <div v-if="activeBackgroundType === 'color'" class="w-100">
        <div class="p-2">
          <!--          <bz-color-set v-model="activeBackgroundColor" />-->
          <div
            class="bz-text-active cursor-pointer text-right mt-3"
            @click.prevent="openThemeSlider"
          >
            Manage Theme Colors
          </div>
        </div>
        <div
          class="background-effect d-flex justify-content-between align-items-center mb-2"
        >
          <span class="element_item_label">Pattern</span>
          <label class="custom_switch">
            <input v-model="activeBackground.pattern" type="checkbox" />
            <span />
          </label>
        </div>
        <div
          v-if="activeBackground.pattern"
          class="w-100 p-4 background-pattern"
        >
          <div class="row">
            <div
              v-for="pattern of bgPatterns"
              :key="pattern.name"
              class="col-3"
            >
              <bz-aspect-view>
                <img
                  :src="pattern.url"
                  class="bz-img-full pattern-item"
                  :class="{ active: activeBackgroundPattern === pattern.name }"
                  :alt="pattern.name"
                  @click="activeBackgroundPattern = pattern.name"
                />
              </bz-aspect-view>
            </div>
          </div>

          <div class="row">
            <div class="col-6 d-flex align-items-center">
              <span class="element_item_label">Strength</span>
            </div>
            <div class="col-6">
              <vue-material-slider
                v-model="activeBackground.patternStrength"
                :min="0"
                :max="100"
                thumb-label
                :display-with="displayWith"
              />
            </div>
            <div class="col-6 d-flex align-items-center">
              <span class="element_item_label">Animation</span>
            </div>
            <div class="col-6">
              <bz-select
                v-model="activeBackground.animation"
                :options="animations"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeBackgroundType === 'image'" class="w-100">
        <div class="w-100 p-4">
          <template v-if="activeBackground.image">
            <bz-aspect-view :ratio="3 / 5">
              <img :src="activeBackground.image" class="bz-img-full" alt="" />
            </bz-aspect-view>
            <button
              class="w-100 btn bz-btn-default mt-2"
              @click="openImageSelector"
            >
              Replace
            </button>
          </template>
          <template v-else>
            <button
              class="w-100 btn bz-btn-default mt-3"
              @click="openImageSelector"
            >
              Select Image
            </button>
          </template>
          <div class="w-100 mt-3">
            <div class="row">
              <div class="col-6 d-flex align-items-center">
                <span class="element_item_label">Animation</span>
              </div>
              <div class="col-6">
                <bz-select
                  v-model="activeBackground.animation"
                  :options="animations"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Background Video Section -->
      <div
        v-if="activeBackgroundType === 'video'"
        class="w-100 background-video"
      >
        <div class="w-100 p-2 mt-2">
          <div class="col-12">
            <div class="row">
              <div v-for="video of bgVideos" :key="video.name" class="col-6">
                <bz-aspect-view :ratio="1 / 2">
                  <img
                    :src="video.url"
                    class="bz-img-full video-item"
                    :class="{ active: activeBackgroundVideo === video.name }"
                    :alt="video.name"
                    @click="activeBackgroundVideo = video.name"
                  />
                </bz-aspect-view>
              </div>
            </div>
          </div>
        </div>
      </div>

      <template
        v-if="
          activeBackgroundType === 'image' || activeBackgroundType === 'video'
        "
      >
        <div
          class="background-effect d-flex justify-content-between align-items-center mb-2 mt-2"
        >
          <span class="element_item_label">Overlay</span>
          <label class="custom_switch">
            <input v-model="activeBackground.overlay" type="checkbox" />
            <span />
          </label>
        </div>
        <div
          v-if="activeBackground.overlay"
          class="w-100 p-4 background-pattern"
        >
          <bz-color-set v-model="activeBackground.overlayColor" />
          <div class="row mt-3">
            <div class="col-4 d-flex align-items-center">
              <span class="element_item_label">Opacity</span>
            </div>
            <div class="col-8">
              <vue-material-slider
                v-model="activeBackground.overlayOpacity"
                :min="0"
                :max="100"
                thumb-label
                :display-with="displayWith"
              />
            </div>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import SettingBase from "./SettingBase";
import BzColorSet from "./BzColorSet";
import BzAspectView from "../section/BzAspectView";
import bgVideos from "../../data/bgVideos";
import bgPatterns from "../../data/bgPatterns";
import BzSelect from "./BzSelect";

export default {
  name: "SettingBackground",
  components: { BzSelect, BzAspectView, BzColorSet },
  extends: SettingBase,
  data() {
    return {
      animations: ["none", "parallax", "fixed", "contain", "animate"],
      bgVideos: bgVideos,
      bgPatterns: bgPatterns,
    };
  },
  watch: {
    background: {
      deep: true,
      handler(val) {
        if (val.patternStrength === undefined) {
          val.patternStrength = 100;
          this.background = window._copy(this.background);
        }
        if (val.overlayOpacity === undefined) {
          val.overlayOpacity = 0;
          this.background = window._copy(this.background);
        }
      },
    },
  },
  methods: {
    updateActiveSectionSetting(newSetting) {
      this.activeSection.data.setting = newSetting;
    },
    openImageSelector() {
      this.$store.commit("openModal", {
        name: "selectImage",
        onChange: ({ url }) => {
          this.activeBackground.image = url;
          this.activeBackground = window._copy(this.activeBackground);
        },
      });
    },
  },
};
</script>
