<template>
  <div
    id="panel_area"
    class="toggle_panel_area m-quick-sidebar m-quick-sidebar--tabbed m-quick-sidebar--skin-light p-0 custom-scroll-h bz-setting-pannel"
    style="overscroll-behavior: contain"
  >
    <div v-if="showPageList" class="m-quick-sidebar__content py-3">
      <page-list />
    </div>
    <div
      v-else
      class="m-quick-sidebar__content py-3"
      style="min-height: 120vh; padding-bottom: 150px"
    >
      <div v-if="activeSection" class="tab-content">
        <div
          id="m_quick_sidebar_tabs_messenger"
          class="tab-pane active"
          role="tabpanel"
        >
          <div
            class="m-messenger m-messenger--message-arrow m-messenger--skin-light"
          >
            <div class="m-list-timeline">
              <div class="m-list-timeline__group">
                <div class="m-list-timeline__heading text-capitalize mb-0">
                  <h4 class="panel_tab_heading">Navigation</h4>
                  <div class="panel_tab_area">
                    <a
                      href="#"
                      class="panel_tab_btn"
                      :class="{ panel_tab_active: nav === 'setting' }"
                      @click.prevent="nav = 'setting'"
                      >Settings</a
                    >
                    <a
                      href="#"
                      class="panel_tab_btn"
                      :class="{ panel_tab_active: nav === 'bg' }"
                      @click.prevent="nav = 'bg'"
                      >Background</a
                    >
                    <div class="clearfix" />
                  </div>
                </div>

                <div v-if="!!activeSetting" class="panel_tab_content_section">
                  <div
                    id="setting_area"
                    class="panel_tab_content_area"
                    :class="{ area_active: nav === 'setting' }"
                  >
                    <setting-alignment />

                    <div
                      id="setting_accordion"
                      class="m-accordion m-accordion--default m-accordion--solid m-accordion--section m-accordion--toggle-arrow"
                      role="tablist"
                    >
                      <setting-paypal v-if="setting.hasOwnProperty('paypal')" />

                      <setting-blog-module
                        v-if="setting.hasOwnProperty('blog')"
                      />

                      <setting-business-information
                        v-if="setting.hasOwnProperty('businessInformation')"
                      />

                      <setting-elements
                        v-if="setting.hasOwnProperty('elements')"
                      />

                      <setting-layouts
                        v-if="setting.hasOwnProperty('layouts')"
                      />

                      <setting-list-elements
                        v-if="setting.hasOwnProperty('listElements')"
                      />

                      <setting-map v-if="setting.hasOwnProperty('map')" />

                      <setting-card v-if="setting.hasOwnProperty('card')" />

                      <setting-iframe v-if="setting.hasOwnProperty('iframe')" />

                      <setting-promotion
                        v-if="setting.hasOwnProperty('promotion')"
                      />
                    </div>
                  </div>
                  <div
                    v-if="nav === 'bg'"
                    id="background_area"
                    class="panel_tab_content_area"
                    :class="{ area_active: nav === 'bg' }"
                  >
                    <setting-background />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SettingBase from "./SettingBase";
import SettingBlogModule from "./SettingBlogModule";
import SettingAlignment from "./SettingAlignment";
import SettingPaypal from "./SettingPaypal";
import SettingElements from "./SettingElements";
import SettingLayouts from "./SettingLayouts";
import SettingMap from "./SettingMap";
import SettingListElements from "./SettingListElements";
import SettingBusinessInformation from "./SettingBusinessInformation";
import SettingCard from "./SettingCard";
import SettingIframe from "./SettingIframe";
import SettingPromotion from "./SettingPromotion";
import SettingBackground from "./SettingBackground";
import PageList from "./PageList";

export default {
  components: {
    PageList,
    SettingBackground,
    SettingPromotion,
    SettingIframe,
    SettingCard,
    SettingBusinessInformation,
    SettingListElements,
    SettingMap,
    SettingLayouts,
    SettingElements,
    SettingPaypal,
    SettingAlignment,
    SettingBlogModule,
  },
  extends: SettingBase,
  data() {
    return {
      nav: "setting", // 'setting','bg'
      view: "desktop",
    };
  },
  computed: {
    showPageList() {
      return (
        this.openSlider &&
        (this.activeSlider === "theme" || this.activeSlider === "sections")
      );
    },
  },
};
</script>

<style lang="scss">
$active: #0076df;
$activeHover: #1187ef;

.bz-setting-pannel {
  position: fixed;
  top: 60px;
  right: 0;
  width: 280px !important;

  .layouts-wrapper {
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    .forward-button,
    .back-button {
      height: 30px;
      background-color: $active;
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover {
        background-color: $activeHover;
      }
    }

    .forward-button {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    .back-button {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    .current-layout {
      height: 30px;
      width: calc(100% - 60px);
      background-color: #00000012;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .alignment-wrapper {
    height: 35px;
    display: table;
    align-items: center;
    flex: 1;
    width: 100%;

    .align-left,
    .align-right,
    .align-alternate,
    .align-center {
      display: table-cell;
      background-color: #00000012;
      vertical-align: middle;
      text-align: center;

      &.active {
        background-color: $active;

        svg {
          color: white;
        }
      }
    }

    .align-left {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    .align-right {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }

  .column-wrapper {
    height: 35px;
    display: table;
    align-items: center;
    flex: 1;
    width: 100%;

    .column-item {
      display: table-cell;
      background-color: #00000012;
      vertical-align: middle;
      text-align: center;
      cursor: pointer;

      &:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      &:last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }

      &.active {
        background-color: $active;
        color: white;
      }
    }
  }

  .background-type {
    button {
      outline: none !important;
      border: none !important;
      background-color: #0000001a !important;

      &.active {
        background-color: $active !important;
        color: white !important;
      }
    }
  }

  .background-effect {
    background-color: #0000001a;
    padding: 18px;
    border-top: solid 1px #8080803f;
    border-bottom: solid 1px #8080803f;
  }

  .background-pattern {
    .col-3 {
      padding: 5px;
    }

    .pattern-item {
      border: solid 1px #8080803f;
      border-radius: 4px;
      cursor: pointer;

      &.active {
        border: solid 2px $active;
      }
    }
  }

  .background-video {
    .col-6 {
      padding: 5px;
    }

    .video-item {
      border: solid 1px #8080803f;
      border-radius: 4px;
      cursor: pointer;

      &.active {
        border: solid 2px $active;
      }
    }
  }
}

.custom-scroll-h::-webkit-scrollbar {
  width: 2px !important;
}
</style>
