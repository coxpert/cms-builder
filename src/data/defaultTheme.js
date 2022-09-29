/**
 *  Copyright @2022 Bizinabox.
 *  All rights reserved
 */

export default {
  /**
   *  Set the theme type
   *  We have two kind of theme, one is simple theme, another is advanced theme.
   *  Simple theme has 3 colors - Background Color (light/dark mode), primary color, secondary color.
   *  Simple theme is applied to whole website.
   *
   *  Advanced theme has 6 colors Background color (light/dark mode), social icons color, button color, heading color, boxes color, secondary color
   *  We can define the pages and sections to apply this advanced theme and we can save it with name.
   *  Also, we can build color palette from image.
   */
  isAdvanced: false,

  /**
   *  Set the color mode we have 2 color mode, dark mode and ligth mode
   */
  mode: "light",

  light: {
    /**
     *  Background color of the non-module type of pages
     *  This is set as --bz-background-color.
     *  Take a look at _setThemeColors function in /section-builder/custom/Utils.js
     */
    backgroundColor: "#ffffff",

    /**
     *  Primary color of the non-module type of pages.
     *  This color is available for only simple theme.
     *  It's applied to button backgrounds, some backgrounds of boxes, social icons, headings...
     *  This is set as --bz-primary-color
     *  Take a look at _setThemeColors function in /section-builder/custom/Utils.js
     */
    primaryColor: "#E07F10",

    /**
     *  Button Color, Social Icons color, Heading color, Box color are specific representation of the primary color.
     *  So, these are available for only advanced color.
     *  They are set as followings in similar way
     *  --bz-button-color
     *  --bz-social-icon-color
     *  --bz-heading-color
     *  --bz-box-color
     *  Take a look at _setThemeColors function in /section-builder/custom/Utils.js
     */
    buttonColor: "#E07F10",
    socialIconColor: "#11638F",
    headingColor: "#1e7730",
    boxColor: "#939393",

    secondaryColor: "#11638F",
  },

  /**
   *  Dark version of the them colors above.
   */
  dark: {
    backgroundColor: "#243037",
    primaryColor: "#E07F10",
    buttonColor: "#E07F10",
    socialIconColor: "#11638F",
    headingColor: "#1e7730",
    boxColor: "#939393",
    secondaryColor: "#11638F",
  },

  /**
   *  Image url of a theme palette in advanced mode.
   */
  paletteImage: "",

  /**
   *  Holds the saved theme template for advanced mode.
   *  It has light/dark mode colors, palette image, and color sets swatched from the palette image.
   */
  savedThemeColors: [],

  /**
   *  All the available colors array from the selected palette image
   */
  advancedColorAvailableList: null,

  /**
   *  Font size
   *  There are 3 kind of font size small - s, medium - m, large - l.
   *  Default font size is small
   */
  fontSize: "m",

  /**
   *  Font family of the title.
   *  This is applied to BzTitle component
   */
  titleFont: "",

  /**
   *  Font family of the text
   *  This is applied to BzSubtitle and BzText component
   */
  paragraphFont: "",

  /**
   *  Enable animation effect for each section if it's set to TRUE.
   *  If we enable it, we can see an Animation Section in the right setting side-bar of a selected section, which allows us to select a animation effect by adding a class to the background component
   *  This feature is applied to the Sections that has the animationClass attribute in setting object of its data.
   */
  animation: true,

  /**
   *  Set the duration of the animation
   *  We have 2 values for it short and long.
   */
  animationDuration: "short",

  /**
   *  Set where this theme will be applied to.
   *  3 values are available, website, page, section.
   *  If it's website, this theme will be applied to whole website including header and footer.
   *  If it's page, this them will be applied to only the pages selected with this theme. Header and Footer will have current page's theme.
   *  If it's section, this theme will be applied to section based. We can set Header and Footer theme separately otherwise They will use the theme form the just neighbouring section.
   */
  appliedTo: "default",
};
