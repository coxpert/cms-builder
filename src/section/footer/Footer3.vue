<template>
  <div
    class="bz-section-container bz-lg bz-md bz-sec--footer-3-root"
    :class="{ [breakPoint]: true }"
    :data-section="section.sectionUUID"
  >
    <bz-background :setting="background" size="m">
      <bz-container>
        <div class="bz-row">
          <div class="bz-col-lg-4 bz-col-md-6">
            <bz-logo :title="setting.elements.siteTitle" />
            <bz-text
              v-if="setting.elements.description"
              v-model="data.elements.description"
            />
          </div>
          <div class="bz-col-lg-4 bz-col-md-6">
            <template v-if="setting.elements.pagesMenu">
              <div
                v-for="(page, index) of allPages"
                :key="index"
                class="bz-pages-menu"
              >
                <a class="menu-item" :href="pageUrl(page.url)">
                  {{ page.name }}
                </a>
              </div>
            </template>
          </div>
          <div class="bz-col-lg-4 bz-col-md-6">
            <bz-social-icons v-if="setting.elements.socialIcons" :edit="true" />
          </div>
        </div>
        <bz-divider
          v-if="setting.elements.dividerLine"
          :line="true"
          :line-color="lineColor"
        />
        <div class="w-100 d-flex align-items-center">
          <bz-setting
            v-if="setting.elements.copyrightMessage"
            :wrap-content="true"
            @click="openBusinessSetting"
          >
            <span style="font-size: 14px; font-weight: 300">
              &copy; {{ new Date().getFullYear() }}
              {{ templateSetting.businesses[activeCompanyIndex].companyName }}
            </span>
          </bz-setting>
          <div v-if="setting.elements.siteMap" class="site-map">Sitemap</div>
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzBackground from "../../components/section/BzBackground";
import BzContainer from "../../components/section/BzContainer";
import BzDivider from "../../components/section/BzDivider";
import BzText from "../../components/section/BzText";
import BzSetting from "../../components/section/BzSetting";
import BzSocialIcons from "../../components/section/BzSocialIcons";
import BzLogo from "../../components/section/BzLogo";
import BaseFooter from "./BaseFooter";

export default {
  components: {
    BzLogo,
    BzSocialIcons,
    BzSetting,
    BzText,
    BzDivider,
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
.bz-sec--footer-3-root {
  @import "style";
}
</style>
