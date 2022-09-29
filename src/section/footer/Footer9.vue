<template>
  <div
    class="bz-section-container bz-sec--footer-9-root"
    :class="{ [breakPoint]: true }"
    :data-section="section.sectionUUID"
  >
    <bz-background :setting="background" size="m">
      <bz-container>
        <div class="wrapper-1">
          <div
            v-for="(page, index) of allPages"
            :key="index"
            class="bz-pages-menu"
          >
            <a class="menu-item" :href="pageUrl(page.url)"> {{ page.name }} </a>
          </div>

          <div class="mt-3">
            <bz-social-icons :edit="true" />
          </div>

          <div class="my-3">
            <bz-title v-model="data.elements.title" />
          </div>

          <div class="d-flex align-items-center">
            <span class="copyright-symbol">&copy; </span>
            <bz-text v-model="data.elements.copyrightMessage" />
          </div>
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzBackground from "../../components/section/BzBackground";
import BzContainer from "../../components/section/BzContainer";
import BzSocialIcons from "../../components/section/BzSocialIcons";
import BzTitle from "../../components/section/BzTitle";
import BzText from "../../components/section/BzText";
import BaseFooter from "./BaseFooter";

export default {
  name: "Footer9",
  components: {
    BzText,
    BzTitle,
    BzSocialIcons,
    BzContainer,
    BzBackground,
  },
  extends: BaseFooter,
  methods: {
    openBusinessSetting() {
      this.openSettingSlider(1, "tab-address");
    },
  },
};
</script>
<style lang="scss" scoped>
.bz-sec--footer-9-root {
  @import "style";
  .justify-space-between {
    justify-content: space-between;
  }

  .wrapper-1 {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  * {
    color: var(--bz-theme-text-color) !important;
  }
}
</style>
