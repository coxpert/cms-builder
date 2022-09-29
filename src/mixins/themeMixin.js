import palette from "image-palette";
import pixels from "image-pixels";

export default {
  computed: {
    storeTheme: {
      get() {
        return this.$store.state.theme;
      },
      set(value) {
        this.$store.commit("updateTheme", value);
      },
    },
    /**
     *  Returns current assigned theme to the elements.
     */
    theme: {
      get() {
        const storeTheme = this.$store.state.theme;
        const defaultTheme = this.$store.state.defaultTheme;

        if (storeTheme.isAdvanced) {
          try {
            // check section theme
            if (this.themeId) {
              const sectionTheme = storeTheme.savedThemeColors.find(
                (item) => item.themeId === this.themeId
              );

              if (sectionTheme) {
                return { ...storeTheme, ...sectionTheme };
              }

              if (storeTheme.themeId === this.themeId) {
                return storeTheme;
              }
            }

            // check page theme
            if (this.pageData && this.pageData.themeId) {
              if (this.pageData.themeId === storeTheme.themeId) {
                return storeTheme;
              }
              const pageTheme = storeTheme.savedThemeColors.find((item) => {
                return item.themeId === this.pageData.themeId;
              });
              if (pageTheme) {
                return {
                  ...storeTheme,
                  ...pageTheme,
                };
              } else {
                console.error(
                  "template mixin theme getter: page theme theme does not exist",
                  this.pageData.themeId,
                  storeTheme
                );
              }
            }

            if (this.storeTheme.appliedTo === "website") {
              return this.storeTheme;
            }

            return {
              ...defaultTheme,
              savedThemeColors: storeTheme.savedThemeColors,
              isAdvanced: true,
              name: "",
              themeId: this.$uuid.v4(),
            };
          } catch (error) {
            console.error("theme getter in theme Mixin Error: ", error);
          }
        }
        return storeTheme;
      },
    },
    themeMode: {
      get() {
        return this.theme.mode;
      },
      set(value) {
        this.theme.mode = value;
      },
    },
    /**
     *  Returns social icon background color
     *  With the simple mode, it will be primary color
     */
    socialIconColor() {
      if (this.theme.isAdvanced) {
        return this.theme[this.themeMode].socialIconColor;
      }
      return this.theme[this.themeMode].primaryColor;
    },

    /**
     *  Returns heading background color
     *  With the simple mode, it will be primary color
     */
    headingColor() {
      if (this.theme.isAdvanced) {
        return this.theme[this.themeMode].headingColor;
      }
      return this.theme[this.themeMode].primaryColor;
    },

    /**
     *  Returns heading secondary color
     */
    secondaryColor() {
      return this.theme[this.themeMode].secondaryColor;
    },
  },
  methods: {
    /**
     * Refresh advanced theme colors from the color palette swatched from an image
     * @returns {Promise<void>}
     */
    async refreshAdvancedThemColors() {
      if (this.theme.advancedColorAvailableList) {
        const shuffledColors = this.theme.advancedColorAvailableList.sort(
          () => 0.5 - Math.random()
        );
        this.setAdvancedColors(shuffledColors);
      }
    },
    /**
     * sets advanced theme colors from the colors
     * @param colors
     */
    setAdvancedColors(colors) {
      this.theme[this.themeMode].backgroundColor = colors[0];
      this.theme[this.themeMode].buttonColor = colors[1];
      this.theme[this.themeMode].socialIconColor = colors[2];
      this.theme[this.themeMode].headingColor = colors[3];
      this.theme[this.themeMode].boxColor = colors[4];
      this.theme[this.themeMode].secondaryColor = colors[5];
    },
    /**
     * get color palette from image
     * @param src
     * @returns {Promise<void>}
     */
    async getColorPaletteFromImage(src) {
      this.processing = true;
      try {
        const { colors } = palette(await pixels(src + "?1"), 64);
        const hexColors = colors.map((item) => {
          const r = item[0];
          const g = item[1];
          const b = item[2];
          return (
            "#" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)
          );
        });
        const uniqueColors = Array.from(new Set(hexColors));
        this.theme.advancedColorAvailableList = uniqueColors;
        this.setAdvancedColors(uniqueColors);
        this.processing = false;
      } catch (error) {
        this.processing = false;
        console.error("getColorPaletteFromImage Error: ", error);
      }
    },
    /**
     * Color is same as the current theme colors
     * @param color
     * @returns {boolean}
     */
    isActiveColor(color) {
      if (this.theme.isAdvanced) {
        return (
          this.theme[this.themeMode].buttonColor === color.buttonColor &&
          this.theme[this.themeMode].socialIconColor ===
            color.socialIconColor &&
          this.theme[this.themeMode].headingColor === color.headingColor &&
          this.theme[this.themeMode].boxColor === color.boxColor &&
          this.theme[this.themeMode].secondaryColor === color.secondaryColor
        );
      } else {
        return (
          this.theme[this.themeMode].primaryColor === color.primaryColor &&
          this.theme[this.themeMode].secondaryColor === color.secondaryColor &&
          this.theme[this.themeMode].backgroundColor ===
            (this.isDarkMode ? color.darkModeColor : color.lightModeColor)
        );
      }
    },
    /**
     *  Save advanced them template
     * @param themeName
     */
    addAdvancedThemeTemplate(themeName) {
      if (!this.theme.savedThemeColors) {
        this.theme.savedThemeColors = [];
      }

      if (!themeName) {
        themeName = "Theme Template " + this.theme.savedThemeColors.length;
      }

      if (
        this.theme.savedThemeColors.some((item) =>
          this.isActiveColor(item[this.themeMode])
        )
      ) {
        return;
      }

      this.theme.savedThemeColors.push({
        themeId: this.theme.themeId,
        name: themeName,
        dark: this.theme.dark,
        light: this.theme.light,
        mode: this.themeMode,
        paletteImage: this.theme.paletteImage,
        availableColorList: this.theme.advancedColorAvailableList,
        appliedTo: this.theme.appliedTo,
      });

      this.openThemeNameModal = false;
    },
    removeSavedThemeColor(index) {
      const removedTheme = this.theme.savedThemeColors.splice(index, 1);

      if (removedTheme.themeId !== this.theme.themeId) {
        for (const page of this.allPages) {
          if (page.data.themeId === removedTheme.themeId) {
            page.data.themeId = null;
          }
          for (const section of page.sections) {
            if (section.data.themeId === removedTheme.themeId) {
              section.data.themeId = null;
            }
          }
        }
      }
    },
  },
};
