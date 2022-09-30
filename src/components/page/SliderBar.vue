<template>
  <section>
    <div class="sidebar bg-white d-flex">
      <ul class="mb-0 pl-0 list-style-none flex-column item_list">
        <li class="side-item">
          <div
            class="item_div"
            :class="{ active: activeSlider === 'sections' }"
            @click.prevent="openSectionSlider"
          >
            <add-circle-icon
              :fill-color="activeSlider === 'sections' ? '#ffffff' : '#555555'"
            />
            <div class="text-capitalize mt-1">sections</div>
          </div>
        </li>
        <template v-if="activePage">
          <li class="side-item">
            <div
              class="item_div"
              :class="{ active: activeSlider === 'pages' }"
              @click.prevent="openPageSlider"
            >
              <insert-drive-file-icon
                :fill-color="activeSlider === 'pages' ? '#ffffff' : '#555555'"
              />
              <div class="text-capitalize mt-1">pages</div>
            </div>
          </li>

          <li class="side-item">
            <div
              class="item_div"
              :class="{ active: activeSlider === 'theme' }"
              @click.prevent="openThemeSlider"
            >
              <ColorLensIcon
                :fill-color="activeSlider === 'theme' ? '#ffffff' : '#555555'"
              />
              <div class="text-capitalize mt-1">theme</div>
            </div>
          </li>

          <li class="side-item">
            <div
              :class="{ active: activeSlider === 'settings' }"
              class="item_div"
              @click.prevent="openSettingSlider"
            >
              <SettingIcon
                :fill-color="
                  activeSlider === 'settings' ? '#ffffff' : '#555555'
                "
              />
              <div class="text-capitalize mt-1">settings</div>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <template v-if="activePage">
      <!-- <section-list v-if="activeSlider === 'sections'" /> -->
      <!-- <theme-settings v-if="activeSlider === 'theme'" /> -->
      <!-- <page-setting v-if="activeSlider === 'pages'" /> -->
      <!-- <template-settings v-if="activeSlider === 'settings'" /> -->
    </template>
    <div
      class="close-panel-over-layer"
      :class="{ open: openSlider, [activeSlider]: true }"
      @click="handleOverlayerClick"
    ></div>
  </section>
</template>

<script>
import ColorLensIcon from "../icons/ColorLens";
import SettingIcon from "../icons/Setting";
import AddCircleIcon from "../icons/AddCircle";
import InsertDriveFileIcon from "../icons/InsertDriveFile";
// import SectionList from "./SectionList";
// import TemplateSettings from "./TemplateSettings";
// import ThemeSettings from "./ThemeSettings";
// import PageSetting from "./PagesSetting";
import builderMixin from "../../mixins/builderMixin";

export default {
  components: {
    // PageSetting,
    // ThemeSettings,
    // TemplateSettings,
    // SectionList,
    InsertDriveFileIcon,
    AddCircleIcon,
    SettingIcon,
    ColorLensIcon,
  },
  mixins: [builderMixin],
  watch: {
    /**
     *  Watch openSlider changes
     *
     * @param value
     */
    openSlider(value) {
      // if (value) {
      //   if (this.activeSlider === 'pages' || this.activeSlider === 'sections') {
      //     window.document.getElementsByTagName('html')[0].style.overflow = 'hidden'
      //   }
      // } else {
      //   window.document.getElementsByTagName('html')[0].style.overflow = ''
      // }
    },
  },
  methods: {
    openSectionSlider() {
      if (!this.openSlider || this.activeSlider !== "sections") {
        this.setViewMode("desktop");
        this.enableEdit();
        this.setOpenSlider({ sliderName: "sections" });
        this.appendSection();
      }
    },
    handleOverlayerClick() {
      if (this.activeSlider === "pages" || this.activeSlider === "sections") {
        this.closeSlider();
      }
    },
  },
};
</script>
<style lang="scss">
$active: #0076df;
.close-panel-over-layer {
  height: 100vh;
  position: fixed;
  top: 0;
  content: "";
  display: none;
  z-index: 5;
  cursor: pointer;

  &.open {
    display: block;
  }

  &.sections {
    left: 570px;
    width: calc(100vw - 570px);
    display: none;
  }

  &.pages {
    left: 370px;
    width: calc(100vw - 370px);
  }

  &.theme {
    left: 470px;
    width: calc(100vw - 470px);
    display: none;
  }

  &.settings {
    left: 970px;
    width: calc(100vw - 970px);
  }
}

.sidebar {
  height: 100vh;
  width: 70px;
  position: fixed;
  top: 60px;
  left: 0;
  box-sizing: border-box;
  z-index: 4;

  .item_list {
    box-shadow: rgb(0 0 0 / 10%) 1px 0 0 !important;
    width: 100%;

    .side-item {
      width: 100%;

      .item_div {
        height: 60px;
        display: flex;
        color: #555555;
        background-color: transparent;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        width: 100%;
        cursor: pointer;

        i {
          font-size: 18px;
        }

        &.active {
          background-color: $active;
          color: white;
        }
      }
    }
  }
}
</style>
