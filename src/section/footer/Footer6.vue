<template>
  <div
    class="bz-section-container bz-sec--footer-6-root"
    :class="{ [breakPoint]: true }"
    :data-section="section.sectionUUID"
  >
    <bz-background :setting="background" size="s">
      <bz-divider :line="true" :line-color="lineColor" />
      <bz-container class="position-relative">
        <div class="logo-container">
          <bz-logo
            :title="false"
            :logo-size="setting.logoSize"
            @changeSize="handleLogoSizeChange"
          />
        </div>
        <div class="footer-content-row">
          <bz-social-icons v-if="setting.elements.socialIcons" />

          <div class="d-flex align-items-end justify-content-between">
            <div class="bz-pages-menu">
              <div v-for="(page, index) of allPages" :key="index">
                <bz-page-link :href="pageUrl(page.url)" page="page">
                  <span class="menu-item">{{ page.name }}</span>
                </bz-page-link>
              </div>
            </div>
          </div>
          <div v-if="setting.elements.description" class="mt-3">
            <bz-text v-model="data.elements.description" />
          </div>
        </div>
      </bz-container>
      <bz-container v-if="setting.elements.siteMap">
        <div class="text-right"><a href="/">Sitemap</a></div>
      </bz-container>
      <bz-divider :line="true" :line-color="lineColor" />
    </bz-background>
    <div class="copyright-section">
      <div class="mb-1">
        <bz-text v-model="data.elements.subtitle" />
      </div>
      <div
        v-if="setting.elements.copyrightMessage"
        class="d-flex align-items-center"
      >
        <span class="copyright-symbol">&copy; </span>
        <bz-text v-model="data.elements.copyrightMessage" />
      </div>
    </div>
  </div>
</template>

<script>
import BzBackground from "../../components/section/BzBackground";
import BzContainer from "../../components/section/BzContainer";
import BzDivider from "../../components/section/BzDivider";
import BzText from "../../components/section/BzText";
import BzSocialIcons from "../../components/section/BzSocialIcons";
import BzLogo from "../../components/section/BzLogo";
import BzPageLink from "../../components/page/BzPageLink";
import BaseFooter from "./BaseFooter";

export default {
  components: {
    BzPageLink,
    BzSocialIcons,
    BzText,
    BzDivider,
    BzContainer,
    BzBackground,
    BzLogo,
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
.bz-sec--footer-6-root {
  @import "style";

  .bz-pages-menu {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 500px;

    .menu-item {
      text-align: center;
      margin-right: 0;
      padding: 5px 10px;
    }
  }

  .logo-container {
    position: absolute;
    top: 0;
  }

  .footer-content-row {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .copyright-section {
    padding: 20px 10%;
    background-color: var(--bz-primary-color);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .copyright-symbol {
    font-size: 20px;
    font-weight: bold;
    color: var(--bz-theme-text-cloor);
  }
}
</style>
