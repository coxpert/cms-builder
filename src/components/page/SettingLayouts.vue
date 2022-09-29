<template>
  <div class="m-accordion__item">
    <div
      class="m-accordion__item-head"
      data-area="#setting_accordion_item_3_body"
    >
      <span class="m-accordion__item-title">Layout Settings</span>
      <span class="m-accordion__item-mode" />
    </div>
    <div
      id="setting_accordion_item_3_body"
      class="m-accordion__item-body collapse show"
    >
      <div
        v-if="setting.layouts.hasOwnProperty('fullWidth')"
        class="d-flex justify-content-between align-items-center mb-2"
      >
        <span class="element_item_label">Full Width</span>
        <label class="custom_switch">
          <input v-model="setting.layouts.fullWidth" type="checkbox" />
          <span />
        </label>
      </div>

      <div
        v-if="setting.layouts.hasOwnProperty('carousel')"
        class="d-flex justify-content-between align-items-center mb-2"
      >
        <span class="element_item_label">Carousel</span>
        <label class="custom_switch">
          <input v-model="setting.layouts.carousel" type="checkbox" />
          <span />
        </label>
      </div>

      <div
        v-if="setting.layouts.hasOwnProperty('fullPage')"
        class="d-flex justify-content-between align-items-center mb-2"
      >
        <span class="element_item_label">Full Page</span>
        <label class="custom_switch">
          <input v-model="setting.layouts.fullPage" type="checkbox" />
          <span />
        </label>
      </div>

      <div
        v-if="setting.layouts.hasOwnProperty('animation')"
        class="d-flex justify-content-between align-items-center mb-2"
      >
        <div class="row">
          <div class="col-6 d-flex align-items-center">
            <span class="element_item_label">Animation</span>
          </div>
          <div class="col-6">
            <bz-select
              v-model="setting.layouts.animation"
              :options="['bouncy', 'smooth', 'overshoot']"
            />
          </div>
        </div>
      </div>

      <div
        v-if="setting.layouts.hasOwnProperty('interval')"
        class="d-flex justify-content-between align-items-center mb-2"
      >
        <div class="row">
          <div class="col-6 d-flex align-items-center">
            <span class="element_item_label">Interval (seconds)</span>
          </div>
          <div class="col-6">
            <bz-select
              v-model="setting.layouts.interval"
              :options="[2, 3, 4, 5]"
            />
          </div>
        </div>
      </div>

      <div
        v-if="setting.layouts.hasOwnProperty('fullSize')"
        class="d-flex justify-content-between align-items-center mb-2"
      >
        <span class="element_item_label">Full size</span>
        <label class="custom_switch">
          <input v-model="setting.layouts.fullSize" type="checkbox" />
          <span />
        </label>
      </div>

      <div
        v-if="setting.layouts.hasOwnProperty('sectionSize')"
        class="d-flex justify-content-between align-items-center mb-2"
      >
        <div class="row">
          <div class="col-6 d-flex align-items-center">
            <span class="element_item_label">Section size</span>
          </div>
          <div class="col-6">
            <bz-select
              v-model="setting.layouts.sectionSize"
              :options="['s', 'm', 'l', 'xl']"
            />
          </div>
        </div>
      </div>

      <div
        v-if="setting.layouts.hasOwnProperty('shape')"
        class="d-flex justify-content-between align-items-center mb-2"
      >
        <div class="row">
          <div class="col-6 d-flex align-items-center">
            <span class="element_item_label">Shape</span>
          </div>
          <div class="col-6">
            <template
              v-if="
                setting.layouts.hasOwnProperty('shapes') &&
                Array.isArray(setting.layouts.shapes)
              "
            >
              <bz-select
                v-model="setting.layouts.shape"
                :options="setting.layouts.shapes"
              />
            </template>
            <template v-else>
              <bz-select
                v-model="setting.layouts.shape"
                :options="['circle', 'square']"
              />
            </template>
          </div>
        </div>
      </div>

      <div
        v-if="setting.layouts.hasOwnProperty('valueSize')"
        class="d-flex justify-content-between align-items-center mb-2"
      >
        <div class="row">
          <div class="col-6 d-flex align-items-center">
            <span class="element_item_label">Value Size</span>
          </div>
          <div class="col-6">
            <bz-select
              v-model="setting.layouts.valueSize"
              :options="['regular', 'medium', 'large']"
            />
          </div>
        </div>
      </div>

      <div
        v-if="setting.layouts.hasOwnProperty('shadow')"
        class="d-flex justify-content-between align-items-center mb-2"
      >
        <span class="element_item_label">Shadow</span>
        <label class="custom_switch">
          <input v-model="setting.layouts.shadow" type="checkbox" />
          <span />
        </label>
      </div>

      <div
        v-if="setting.layouts.hasOwnProperty('spacing')"
        class="d-flex justify-content-between align-items-center mb-2"
      >
        <span class="element_item_label">Spacing</span>
        <label class="custom_switch">
          <input v-model="setting.layouts.spacing" type="checkbox" />
          <span />
        </label>
      </div>

      <div
        v-if="setting.layouts.hasOwnProperty('alignment')"
        class="d-flex justify-content-between align-items-center mb-2"
      >
        <div class="row">
          <div class="col-6 d-flex align-items-center">
            <span class="element_item_label">Content alignment</span>
          </div>
          <div class="col-6">
            <bz-select
              v-model="setting.layouts.alignment"
              :options="['left', 'center', 'right']"
            />
          </div>
        </div>
      </div>

      <div
        v-if="setting.layouts.hasOwnProperty('aspectRatios')"
        class="d-flex justify-content-between align-items-center mb-2"
      >
        <div class="row">
          <div class="col-6 d-flex align-items-center">
            <span class="element_item_label">Aspect ratio</span>
          </div>
          <div class="col-6">
            <bz-select
              v-model="setting.layouts.aspectRatio"
              :options="setting.layouts.aspectRatios"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SettingBase from "./SettingBase";
import BzSelect from "./BzSelect";
export default {
  name: "SettingLayouts",
  components: { BzSelect },
  extends: SettingBase,
};
</script>
