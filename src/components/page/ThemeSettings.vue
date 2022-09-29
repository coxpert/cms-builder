<template>
  <div
    class="custom-scroll-h theme_area z-index-999"
    :class="{ active: openSlider && activeSlider === 'theme' }"
  >
    <preset-theme-name-modal
      v-if="openThemeNameModal"
      @close="openThemeNameModal = false"
      @confirm="addAdvancedThemeTemplate"
    />
    <build-palette-modal
      v-if="openBuildPaletteModal"
      @close="openBuildPaletteModal = false"
    />
    <div class="pb-2 px-3 pt-4">
      <div class="row align-items-center">
        <div class="col-10 d-flex align-self-center">
          <h5 class="mb-0 text-dark"><b>Theme</b></h5>
        </div>
        <div class="col-2 text-right">
          <div
            class="bz-close-section-area text-dark cursor-pointer"
            @click.prevent="closeSlider()"
          >
            <bz-close-icon fill-color="#555555" />
          </div>
        </div>
      </div>
    </div>
    <div class="w-100" style="height: calc(100% - 62px)">
      <md-tabs>
        <md-tab
          id="tab-colors"
          md-label="Colors"
          style="height: 100%; overflow-y: auto"
        >
          <div class="p-1 mb-3">
            <BzSwitch v-model="theme.isAdvanced" label="Advanced" />
          </div>
          <div class="theme-mode">
            <div :class="{ active: isLightMode }">
              <button
                :style="{
                  backgroundColor: theme.light.backgroundColor,
                  color: getColor(theme.light.backgroundColor),
                }"
                @click.prevent="theme.mode = 'light'"
              >
                Light
              </button>
            </div>
            <div :class="{ active: isDarkMode }">
              <button
                :style="{
                  backgroundColor: theme.dark.backgroundColor,
                  color: getColor(theme.dark.backgroundColor),
                }"
                @click.prevent="theme.mode = 'dark'"
              >
                Dark
              </button>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <p class="mt-3">
              {{ theme.isAdvanced ? "Advanced" : "Simple" }} Theme
            </p>
          </div>
          <div v-click-outside="closeEditor" class="w-100">
            <div v-if="theme.isAdvanced" class="theme-colors-wrap">
              <div class="theme-color-labels">
                <div><small>Background</small></div>
                <div><small>Buttons</small></div>
                <div><small>Social Icon</small></div>
                <div><small>Headings</small></div>
                <div><small>Boxes</small></div>
                <div><small>Secondary</small></div>
              </div>
              <draggable-item
                :value="advancedThemeColors"
                draggable=".theme-color-item"
                class="theme-colors"
                @end="handlePageDragEnd"
              >
                <div class="theme-color-item">
                  <div
                    :class="{ active: editor === 'background' }"
                    :style="{ backgroundColor: backgroundColor }"
                    @click.prevent="openSketch('background')"
                  />
                </div>
                <div class="theme-color-item">
                  <div
                    :class="{ active: editor === 'button' }"
                    :style="{ backgroundColor: theme[themeMode].buttonColor }"
                    @click.prevent="openSketch('button')"
                  />
                </div>
                <div class="theme-color-item">
                  <div
                    :class="{ active: editor === 'socialIcon' }"
                    :style="{
                      backgroundColor: theme[themeMode].socialIconColor,
                    }"
                    @click.prevent="openSketch('socialIcon')"
                  />
                </div>
                <div class="theme-color-item">
                  <div
                    :class="{ active: editor === 'heading' }"
                    :style="{ backgroundColor: theme[themeMode].headingColor }"
                    @click.prevent="openSketch('heading')"
                  />
                </div>
                <div class="theme-color-item">
                  <div
                    :class="{ active: editor === 'box' }"
                    :style="{ backgroundColor: theme[themeMode].boxColor }"
                    @click.prevent="openSketch('box')"
                  />
                </div>
                <div class="theme-color-item">
                  <div
                    :class="{ active: editor === 'secondary' }"
                    :style="{
                      backgroundColor: theme[themeMode].secondaryColor,
                    }"
                    @click.prevent="openSketch('secondary')"
                  />
                </div>
              </draggable-item>
            </div>
            <div v-else class="theme-colors-wrap">
              <div class="theme-color-labels">
                <div><small>Background</small></div>
                <div><small>Primary</small></div>
                <div><small>Secondary</small></div>
              </div>
              <draggable-item
                :value="advancedThemeColors"
                draggable=".theme-color-item"
                class="theme-colors"
                @end="handlePageDragEnd"
              >
                <div class="theme-color-item">
                  <div
                    :class="{ active: editor === 'background' }"
                    :style="{ backgroundColor }"
                    @click.prevent="openSketch('background')"
                  />
                </div>
                <div class="theme-color-item">
                  <div
                    :class="{ active: editor === 'primary' }"
                    :style="{ backgroundColor: theme[themeMode].primaryColor }"
                    @click.prevent="openSketch('primary')"
                  />
                </div>
                <div class="theme-color-item">
                  <div
                    :class="{ active: editor === 'secondary' }"
                    :style="{
                      backgroundColor: theme[themeMode].secondaryColor,
                    }"
                    @click.prevent="openSketch('secondary')"
                  />
                </div>
              </draggable-item>
            </div>
            <div v-if="editor" class="position-fixed" :style="sketchStyle">
              <Sketch :value="colorValue" @input="updateThemeColor" />
            </div>
          </div>
          <div
            v-if="theme.isAdvanced"
            class="d-flex align-items-center justify-content-end mt-2"
          >
            <template v-if="theme.paletteImage">
              <div
                class="p-2 theme-control-item"
                @click="refreshAdvancedThemColors"
              >
                <i class="fa fa-refresh"></i>
                Refresh
              </div>
            </template>
            <div
              class="p-2 theme-control-item"
              @click="openThemeNameModal = true"
            >
              <i class="fa fa-save"></i>
              Save
            </div>
          </div>
          <div class="w-100">
            <p
              class="w-100 bz-text-active text-right pt-4 cursor-pointer"
              @click="showMoreColors = !showMoreColors"
            >
              Preset color themes
              <i v-if="showMoreColors" class="fa fa-arrow-up"></i>
              <i v-else class="fa fa-arrow-down"></i>
            </p>
            <transition
              name="bounce"
              enter-active-class="fade"
              leave-active-class="fade"
            >
              <div v-if="showMoreColors" class="w-100 more-colors mb-2">
                <md-tabs>
                  <md-tab id="tab-vibrant" md-label="Vibrant">
                    <div class="color-panel">
                      <div
                        v-for="(color, index) of colors.variants"
                        :key="index"
                        class="color-group"
                        :class="{ active: isActiveColor(color) }"
                        @click="setThemeColors(color)"
                      >
                        <div
                          v-if="isLightMode"
                          class="color-item"
                          :style="{ backgroundColor: color.lightModeColor }"
                        />
                        <div
                          v-if="isDarkMode"
                          class="color-item"
                          :style="{ backgroundColor: color.darkModeColor }"
                        />
                        <template v-if="theme.isAdvanced">
                          <div
                            class="color-item"
                            :style="{ backgroundColor: color.buttonColor }"
                          />
                          <div
                            class="color-item"
                            :style="{ backgroundColor: color.socialIconColor }"
                          />
                          <div
                            class="color-item"
                            :style="{ backgroundColor: color.headingColor }"
                          />
                          <div
                            class="color-item"
                            :style="{ backgroundColor: color.boxColor }"
                          />
                        </template>
                        <div
                          v-else
                          class="color-item"
                          :style="{ backgroundColor: color.primaryColor }"
                        />
                        <div
                          class="color-item"
                          :style="{ backgroundColor: color.secondaryColor }"
                        />
                      </div>
                    </div>
                    <div class="load-more">Load More</div>
                  </md-tab>
                  <md-tab id="tab-subtle" md-label="Subtle">
                    <div class="color-panel">
                      <div
                        v-for="(color, index) of colors.subtle"
                        :key="index"
                        class="color-group"
                        :class="{ active: isActiveColor(color) }"
                        @click="setThemeColors(color)"
                      >
                        <div
                          v-if="isLightMode"
                          class="color-item"
                          :style="{ backgroundColor: color.lightModeColor }"
                        />
                        <div
                          v-if="isDarkMode"
                          class="color-item"
                          :style="{ backgroundColor: color.darkModeColor }"
                        />
                        <template v-if="theme.isAdvanced">
                          <div
                            class="color-item"
                            :style="{ backgroundColor: color.buttonColor }"
                          />
                          <div
                            class="color-item"
                            :style="{ backgroundColor: color.socialIconColor }"
                          />
                          <div
                            class="color-item"
                            :style="{ backgroundColor: color.headingColor }"
                          />
                          <div
                            class="color-item"
                            :style="{ backgroundColor: color.boxColor }"
                          />
                        </template>
                        <div
                          v-else
                          class="color-item"
                          :style="{ backgroundColor: color.primaryColor }"
                        />
                        <div
                          class="color-item"
                          :style="{ backgroundColor: color.secondaryColor }"
                        />
                      </div>
                    </div>
                    <div class="load-more">Load More</div>
                  </md-tab>
                  <md-tab id="tab-pastel" md-label="Pastel">
                    <div class="color-panel">
                      <div
                        v-for="(color, index) of colors.pastel"
                        :key="index"
                        class="color-group"
                        :class="{ active: isActiveColor(color) }"
                        @click="setThemeColors(color)"
                      >
                        <div
                          v-if="isLightMode"
                          class="color-item"
                          :style="{ backgroundColor: color.lightModeColor }"
                        />
                        <div
                          v-if="isDarkMode"
                          class="color-item"
                          :style="{ backgroundColor: color.darkModeColor }"
                        />
                        <template v-if="theme.isAdvanced">
                          <div
                            class="color-item"
                            :style="{ backgroundColor: color.buttonColor }"
                          />
                          <div
                            class="color-item"
                            :style="{ backgroundColor: color.socialIconColor }"
                          />
                          <div
                            class="color-item"
                            :style="{ backgroundColor: color.headingColor }"
                          />
                          <div
                            class="color-item"
                            :style="{ backgroundColor: color.boxColor }"
                          />
                        </template>
                        <div
                          v-else
                          class="color-item"
                          :style="{ backgroundColor: color.primaryColor }"
                        />
                        <div
                          class="color-item"
                          :style="{ backgroundColor: color.secondaryColor }"
                        />
                      </div>
                    </div>
                    <div class="load-more">Load More</div>
                  </md-tab>
                </md-tabs>
              </div>
            </transition>
          </div>
          <div v-if="theme.isAdvanced" class="w-100">
            <p
              class="w-100 bz-text-active text-right cursor-pointer"
              @click="showSavedThemColors = !showSavedThemColors"
            >
              Saved theme colors
              <i v-if="showSavedThemColors" class="fa fa-arrow-up"></i>
              <i v-else class="fa fa-arrow-down"></i>
            </p>
            <transition
              name="bounce"
              enter-active-class="fade"
              leave-active-class="fade"
            >
              <div v-if="showSavedThemColors" class="w-100 more-colors">
                <template v-if="theme.savedThemeColors?.length > 0">
                  <div
                    v-for="(item, index) of theme.savedThemeColors"
                    :key="index"
                    class="p-2"
                  >
                    <div class="d-flex">
                      <span>{{ item.name }}</span>
                      <div
                        class="cursor-pointer ml-2"
                        @click="removeSavedThemeColor(index)"
                      >
                        <i class="fa fa-trash"></i>
                      </div>
                    </div>
                    <div class="color-panel">
                      <div
                        class="color-group"
                        :class="{ active: isActiveColor(item[themeMode]) }"
                        @click="setAdvancedThemeColors(item)"
                      >
                        <div
                          class="color-item"
                          :style="{
                            backgroundColor: item[themeMode].backgroundColor,
                          }"
                        />
                        <div
                          class="color-item"
                          :style="{
                            backgroundColor: item[themeMode].buttonColor,
                          }"
                        />
                        <div
                          class="color-item"
                          :style="{
                            backgroundColor: item[themeMode].socialIconColor,
                          }"
                        />
                        <div
                          class="color-item"
                          :style="{
                            backgroundColor: item[themeMode].headingColor,
                          }"
                        />
                        <div
                          class="color-item"
                          :style="{ backgroundColor: item[themeMode].boxColor }"
                        />
                        <div
                          class="color-item"
                          :style="{
                            backgroundColor: item[themeMode].secondaryColor,
                          }"
                        />
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="p-2">No preset theme colors saved</div>
                </template>
              </div>
            </transition>
          </div>
          <div v-if="theme.isAdvanced" class="w-100 mt-2">
            <p
              class="w-100 bz-text-active text-right cursor-pointer"
              @click="applyingThemeSetting = !applyingThemeSetting"
            >
              Applying theme setting
              <i v-if="applyingThemeSetting" class="fa fa-arrow-up"></i>
              <i v-else class="fa fa-arrow-down"></i>
            </p>
            <transition
              name="bounce"
              enter-active-class="fade"
              leave-active-class="fade"
            >
              <div
                v-if="applyingThemeSetting"
                class="w-100 more-colors px-2"
                style="max-height: unset"
              >
                <div class="d-flex flex-column mt-2">
                  <md-radio
                    v-model="theme.appliedTo"
                    value="default"
                    @change="handleAppliedToChange"
                    >Default
                  </md-radio>
                  <md-radio
                    v-model="theme.appliedTo"
                    value="website"
                    @change="handleAppliedToChange"
                    >Entire Website</md-radio
                  >
                  <md-radio
                    v-model="theme.appliedTo"
                    value="page"
                    @change="handleAppliedToChange"
                    >Change by page</md-radio
                  >
                  <md-radio
                    v-model="theme.appliedTo"
                    value="section"
                    @change="handleAppliedToChange"
                    >Change by section</md-radio
                  >
                </div>
              </div>
            </transition>
          </div>
          <div v-if="theme.isAdvanced" class="w-100 mt-2">
            <p
              class="w-100 bz-text-active text-right cursor-pointer"
              @click="handleCreateNewColorTheme"
            >
              Create a new color theme
            </p>
          </div>
        </md-tab>
        <md-tab id="tab-fonts" md-label="Fonts">
          <p class="mt-3"><b>Font Size</b></p>
          <div class="btn-group w-100" role="group">
            <button
              type="button"
              class="btn bg-white p-2"
              :class="{ active: theme.fontSize === 's' }"
              @click="theme.fontSize = 's'"
            >
              Small
            </button>
            <button
              type="button"
              class="btn bg-white p-2"
              :class="{ active: theme.fontSize === 'm' }"
              @click="theme.fontSize = 'm'"
            >
              Medium
            </button>
            <button
              type="button"
              class="btn bg-white p-2"
              :class="{ active: theme.fontSize === 'l' }"
              @click="theme.fontSize = 'l'"
            >
              Large
            </button>
          </div>
          <p class="mt-3"><b>Font Style</b></p>
          <div class="btn-group w-100" role="group">
            <button
              type="button"
              class="btn bg-white p-2"
              :class="{ active: fontStyleView === 'presets' }"
              @click="fontStyleView = 'presets'"
            >
              Presets
            </button>
            <button
              type="button"
              class="btn bg-white p-2"
              :class="{ active: fontStyleView === 'custom' }"
              @click="fontStyleView = 'custom'"
            >
              Custom
            </button>
          </div>
          <div
            v-if="fontStyleView === 'presets'"
            class="w-100 mt-3 font-presets"
          >
            <div
              v-for="(font, index) of fonts.presets"
              :key="index"
              class="font-item"
              :class="{
                active:
                  theme.titleFont === font.titleFont &&
                  theme.paragraphFont === font.paragraphFont,
                [font.titleFont]: true,
              }"
              @click="
                theme.titleFont = font.titleFont;
                theme.paragraphFont = font.paragraphFont;
              "
            >
              {{ font.label }}
            </div>
          </div>

          <div v-if="fontStyleView === 'custom'" class="w-100 mt-3">
            <bz-select
              v-model="theme.titleFont"
              label="Title Font"
              :options="fonts.title"
              :pre-selected="false"
              :item-key="'name'"
              :min-height="40"
              class="mt-5"
            />
            <bz-select
              v-model="theme.paragraphFont"
              label="Paragraph Font"
              :options="fonts.title"
              :pre-selected="false"
              :item-key="'name'"
              :min-height="40"
              class="mt-5"
            />
          </div>
        </md-tab>
      </md-tabs>
    </div>
  </div>
</template>

<script>
import BzCloseIcon from "../icons/Close";
import colors from "../../data/colors";
import fonts from "../../data/fonts";
import BzSelect from "./BzSelect";
import { Sketch } from "vue-color";
import BzSwitch from "./BzSwitch";
import PresetThemeNameModal from "../modals/PresetThemeNameModal";
import BuildPaletteModal from "../modals/BuildPaletteModal";
import builderMixin from "../../mixins/builderMixin";
import advancedPresetColors from "../../data/advancedPresetColors";
import { mapMutations } from "vuex";
import { cloneDeep } from "lodash";

export default {
  name: "ThemeSettings",
  components: {
    BuildPaletteModal,
    PresetThemeNameModal,
    BzSwitch,
    BzSelect,
    BzCloseIcon,
    Sketch,
  },
  mixins: [builderMixin],
  data() {
    return {
      fonts: fonts,
      editor: null,
      fontStyleView: "presets",
      showMoreColors: false,
      showSavedThemColors: false,
      applyingThemeSetting: false,
      paletteImage: "",
      openThemeNameModal: false,
      openBuildPaletteModal: false,
    };
  },
  computed: {
    colors() {
      return this.theme.isAdvanced ? advancedPresetColors : colors;
    },
    colorValue() {
      switch (this.editor) {
        case "primary":
          return this.theme[this.themeMode].primaryColor;
        case "secondary":
          return this.theme[this.themeMode].secondaryColor;
        case "background":
          return this.theme[this.themeMode].backgroundColor;
        case "button":
          return this.theme[this.themeMode].buttonColor;
        case "socialIcon":
          return this.theme[this.themeMode].socialIconColor;
        case "heading":
          return this.theme[this.themeMode].headingColor;
        case "box":
          return this.theme[this.themeMode].boxColor;
        default:
          return "#000000";
      }
    },
    sketchStyle() {
      let paddingLeft = 0;
      switch (this.editor) {
        case "primary":
          paddingLeft = 0;
          break;
        case "secondary":
          paddingLeft = 15;
          break;
        case "lightMode":
        case "darkMode":
          paddingLeft = 0;
          break;
        default:
          paddingLeft = 0;
      }
      return {
        marginTop: "10px",
        paddingLeft: paddingLeft + "px",
        zIndex: 999,
      };
    },
    simpleThemeColors: {
      get() {
        return [
          this.theme[this.themeMode].backgroundColor,
          this.theme[this.themeMode].primaryColor,
          this.theme[this.themeMode].secondaryColor,
        ];
      },
      set(newColors) {
        this.theme[this.themeMode].backgroundColor = newColors[0];
        this.theme[this.themeMode].primaryColor = newColors[1];
        this.theme[this.themeMode].secondaryColor = newColors[2];
      },
    },
    advancedThemeColors: {
      get() {
        return [
          this.theme[this.themeMode].backgroundColor,
          this.theme[this.themeMode].buttonColor,
          this.theme[this.themeMode].socialIconColor,
          this.theme[this.themeMode].headingColor,
          this.theme[this.themeMode].boxColor,
          this.theme[this.themeMode].secondaryColor,
        ];
      },
      set(newColors) {
        this.theme[this.themeMode].backgroundColor = newColors[0];
        this.theme[this.themeMode].buttonColor = newColors[1];
        this.theme[this.themeMode].socialIconColor = newColors[2];
        this.theme[this.themeMode].headingColor = newColors[3];
        this.theme[this.themeMode].boxColor = newColors[4];
        this.theme[this.themeMode].secondaryColor = newColors[5];
      },
    },
    isAdvanced() {
      return this.theme.isAdvanced;
    },
    appliedTo() {
      return this.theme.appliedTo;
    },
    theme: {
      get() {
        return this.$store.state.theme;
      },
      set(value) {
        this.$store.commit("updateTheme", value);
      },
    },
  },
  watch: {
    indexOfActivePage() {
      if (this.openSlider && this.activeSlider === "theme") {
        if (this.theme.isAdvanced && this.theme.appliedTo !== "website") {
          if (this.activePage) {
            const storeTheme = this.$store.state.theme;
            if (this.activePage.data) {
              if (this.activePage.data.themeId) {
                if (this.activePage.data.themeId === storeTheme.themeId) {
                  return;
                }
                const pageTheme = storeTheme.savedThemeColors.find((item) => {
                  return item.themeId === this.activePage.data.themeId;
                });
                if (pageTheme) {
                  this.theme = {
                    ...storeTheme,
                    ...pageTheme,
                  };
                  return;
                } else {
                  console.error("getThemeOfActivePage: theme does not exist");
                }
              }
            } else {
              console.warn(
                "Active page data is undefined: watcher index of active page",
                this.activePage,
                this.indexOfActivePage
              );
            }
            const defaultTheme = this.$store.state.defaultTheme;
            this.theme = {
              ...this.$store.state.theme,
              name: "",
              dark: defaultTheme.dark,
              light: defaultTheme.light,
              paletteImage: "",
              availableColorList: [],
              appliedTo: "default",
              themeId: this.$uuid.v4(),
            };
          } else {
            console.error(
              "watcher IndexOfActivePage in ThemeSettings: Active page is undefined",
              this.activePage,
              this.indexOfActivePage
            );
          }
        }
      }
    },
    isAdvanced(value) {
      if (!value) {
        this.theme.appliedTo = "website";
      }
    },
  },
  mounted() {
    if (!this.theme.themeId) {
      this.theme.themeId = this.$uuid.v4();
    }
  },
  methods: {
    handleAppliedToChange(value) {
      console.info("handleAppliedToChange", value);
      if (value === "page") {
        if (this.activePage) {
          if (this.activePage.data) {
            this.activePage.data.themeId = this.theme.themeId;
          } else {
            console.warn("Active page data is undefined", this.activePage);
            this.activePage.data = { themeId: this.theme.themeId };
          }
        } else {
          console.error("Active page is undefined!");
        }
      } else if (value === "section") {
        if (this.activeSection) {
          if (this.activeSection.data) {
            this.activeSection.data.themeId = this.theme.themeId;
          } else {
            console.warn(
              "Active section data is undefined",
              this.activeSection
            );
            this.activeSection.data = { themeId: this.theme.themeId };
          }
          if (this.activePage.data) {
            this.activePage.data.themeId = null;
          } else {
            console.warn("Active page data is undefined", this.activePage);
          }
        } else {
          console.error("Active section is undefined!");
        }
      }
    },
    /**
     * Opens Palette Builder modal.
     * If there is no palette image uploaded, it will first open the Image selector modal to select and image
     */
    handleCreateNewColorTheme() {
      if (this.theme.paletteImage) {
        this.openBuildPaletteModal = true;
      } else {
        const self = this;
        this.openModal({
          name: "selectImage",
          onChange: ({ url }) => {
            self.getColorPaletteFromImage(url);
            self.theme.paletteImage = url;
            self.openBuildPaletteModal = true;
          },
        });
      }
    },
    /**
     * Sets Theme colors from the preset color list when one of them is clicked.
     * @param color
     */
    setThemeColors(color) {
      // background color
      if (this.isDarkMode) {
        this.theme.dark.backgroundColor = color.darkModeColor;
      } else {
        this.theme.light.backgroundColor = color.lightModeColor;
      }

      // simple them colors
      this.theme[this.themeMode].primaryColor = color.primaryColor;
      this.theme[this.themeMode].secondaryColor = color.secondaryColor;

      // advanced theme colors
      if (this.theme.isAdvanced) {
        this.theme[this.themeMode].buttonColor = color.buttonColor;
        this.theme[this.themeMode].headingColor = color.headingColor;
        this.theme[this.themeMode].boxColor = color.boxColor;
        this.theme[this.themeMode].socialIconColor = color.socialIconColor;
      }
    },
    handlePageDragEnd(event) {
      if (this.theme.isAdvanced) {
        const tempColor = this.advancedThemeColors[event.newIndex];
        this.advancedThemeColors[event.newIndex] =
          this.advancedThemeColors[event.oldIndex];
        this.advancedThemeColors[event.oldIndex] = tempColor;
        this.advancedThemeColors = Object.assign([], this.advancedThemeColors);
      } else {
        const tempColor = this.simpleThemeColors[event.newIndex];
        this.simpleThemeColors[event.newIndex] =
          this.simpleThemeColors[event.oldIndex];
        this.simpleThemeColors[event.oldIndex] = tempColor;
        this.simpleThemeColors = Object.assign([], this.simpleThemeColors);
      }
    },
    closeEditor() {
      if (this.editor) {
        this.editor = null;
      }
    },
    hideShowMore() {
      this.showMoreColors = false;
    },
    /**
     * Sets advanced them color template from the saved colors list
     * @param colorItem
     */
    setAdvancedThemeColors(colorItem) {
      this.theme = cloneDeep({
        ...this.$store.state.theme,
        dark: colorItem.dark,
        light: colorItem.light,
        paletteImage: colorItem.paletteImage,
        availableColorList: colorItem.availableColorList,
      });
    },
    openSketch(editor) {
      if (this.editor === editor) {
        this.editor = null;
      } else {
        this.editor = editor;
      }
    },
    updateThemeColor(color) {
      switch (this.editor) {
        case "primary": {
          this.theme[this.themeMode].primaryColor = color.hex8;
          break;
        }
        case "secondary": {
          this.theme[this.themeMode].secondaryColor = color.hex8;
          break;
        }
        case "background": {
          this.theme[this.themeMode].backgroundColor = color.hex8;
          break;
        }
        case "button": {
          this.theme[this.themeMode].buttonColor = color.hex8;
          break;
        }
        case "socialIcon": {
          this.theme[this.themeMode].socialIconColor = color.hex8;
          break;
        }
        case "heading": {
          this.theme[this.themeMode].headingColor = color.hex8;
          break;
        }
        case "box": {
          this.theme[this.themeMode].boxColor = color.hex8;
          break;
        }
      }
    },
    ...mapMutations(["openModal"]),
  },
};
</script>

<style lang="scss">
$active: rgb(0, 118, 223);
.theme_area {
  width: 400px;
  height: calc(100vh - 60px);
  position: fixed;
  left: 70px;
  top: 60px;
  background-color: rgb(239, 240, 241);
  overflow: hidden;
  max-height: unset;
  z-index: 3;
  transform: translateX(-470px);
  transition: transform 0.3s linear;

  .bz-close-section-area {
    font-size: 26px;
  }

  &.active {
    transform: translateX(0);
  }

  .md-tabs {
    height: 100%;

    .md-tabs-container {
      height: 100%;
    }

    .md-tabs-content {
      height: 100% !important;
    }

    .md-button-content {
      text-transform: capitalize;
    }

    .md-tabs-navigation.md-elevation-0 {
      background-color: rgb(239, 240, 241) !important;
      border-bottom: solid 1px #8080803f;
    }

    .md-content.md-theme-default {
      background-color: transparent !important;
      flex-grow: 1;
    }

    .theme-mode {
      display: flex;
      align-items: center;
      justify-content: space-between;

      div {
        padding: 1px;
        border-radius: 5px;
        width: 48%;
        height: 38px;

        &.active {
          border: solid 2px #0076df;
        }

        button {
          width: 100%;
          height: 100%;
          border-radius: 4px;
          border: solid 1px #8080803f;
        }
      }
    }
  }

  .theme-colors-wrap {
    width: 100%;

    .theme-color-labels {
      display: flex;
      width: 100%;
      align-items: center;
      div {
        flex: 1;
        text-align: center;
        display: flex;
        justify-content: center;
        small {
          text-align: center;
        }
      }
    }

    .theme-colors {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      position: relative;

      .theme-color-item {
        flex: 1;
        margin: 0 1px;
        text-align: center;

        div {
          height: 34px;
          border-radius: 4px;
          border: solid 1px #8080803f;
          outline: solid 2px transparent;

          &:hover {
            outline: solid 2px rgb(157, 222, 255);
            border: solid 1px white;
          }

          &.active {
            border: solid 1px white;
            outline: solid 2px #0076df;
          }
        }
      }
    }
  }
  .more-colors {
    box-shadow: 0 0 4px 2px #00000012;
    background-color: white;
    border: solid 1px #8080803f;
    border-radius: 4px;
    height: 100%;

    .md-radio {
      margin: 4px 0;
    }

    .md-tabs {
      .md-tabs-navigation.md-elevation-0 {
        background-color: white !important;
        border-bottom: solid 1px #8080803f;
      }

      .color-panel {
        height: 214px;
        overflow-y: scroll;
      }

      .load-more {
        width: 100%;
        padding: 10px 0;
        color: $active;
        border-top: solid 1px #8080807f;
        cursor: pointer;
      }
    }
  }

  .color-group {
    margin: 4px 0;
    width: 100%;
    height: 30px;
    border: solid 1px #8080803f;
    border-radius: 4px;
    overflow: hidden;
    display: flex;

    &:hover {
      border: solid 2px rgb(123, 236, 214);
    }

    &.active {
      border: solid 2px $active;
    }

    .color-item {
      flex: 1;
      height: 100%;
      cursor: pointer;
      margin-right: 1px;
    }

    .color-item:last-child {
      margin-right: 0;
    }
  }

  #tab-fonts {
    button {
      outline: none !important;
      border: none !important;

      &.active {
        background-color: $active !important;
        color: white !important;
      }
    }

    .font-presets {
      .font-item {
        width: 100%;
        background-color: white;
        padding: 12px;
        border: solid 2px transparent;
        box-shadow: 0 0 2px 1px #00000012;
        margin-top: 10px;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          border: solid 2px #9ddeff;
        }

        &.active {
          border: solid 2px $active;
        }
      }
    }
  }

  .bz-select {
    width: 100px;
    border-radius: 2px;
    border: solid 1px #80808034;
    padding: 4px;
    background-color: white;
  }

  .theme-control-item {
    color: $active;
    cursor: pointer;

    &:hover {
      color: $active;
    }
  }

  .page-list {
    label {
      display: flex;
      cursor: pointer;
      align-items: center;
      padding: 6px 0;
      width: 100%;

      input {
        margin-right: 10px;
      }

      &:hover {
        color: $active;
      }
    }
  }
}
</style>
