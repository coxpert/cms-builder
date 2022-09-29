<template>
  <div
    class="bz-section-container bz-sec--footer-5-root"
    :class="{ [breakPoint]: true }"
    :data-section="section.sectionUUID"
  >
    <bz-background :setting="background" size="m">
      <bz-container>
        <bz-logo :title="setting.elements.siteTitle" />
        <bz-divider
          v-if="setting.elements.dividerLine"
          :line="true"
          :line-color="lineColor"
        />
        <div class="bz-row">
          <div class="bz-col-6">
            <template v-if="setting.elements.address">
              <bz-title v-model="data.elements.addressTitle" />

              <bz-address :location="setting.businessInformation.location" />
            </template>

            <bz-phone-number v-if="setting.elements.phoneNumber" />

            <bz-email v-if="setting.elements.email" />
          </div>
          <div v-if="setting.elements.pagesMenu" class="bz-col-6">
            <div
              v-for="(page, index) of allPages"
              :key="index"
              class="bz-pages-menu"
            >
              <a class="menu-item" :href="pageUrl(page.url)">
                {{ page.name }}
              </a>
            </div>
          </div>
        </div>
        <bz-divider
          v-if="setting.elements.dividerLine"
          :line="true"
          :line-color="lineColor"
        />
        <div class="w-100 d-flex justify-space-between">
          <div class="d-flex">
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
          <bz-social-icons v-if="setting.elements.socialIcons" :edit="true" />
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzBackground from "../../components/section/BzBackground";
import BzContainer from "../../components/section/BzContainer";
import BzTitle from "../../components/section/BzTitle";
import BzDivider from "../../components/section/BzDivider";
import BzAddress from "../../components/section/BzAddress";
import BzPhoneNumber from "../../components/section/BzPhoneNumber";
import BzEmail from "../../components/section/BzEmail";
import BzSetting from "../../components/section/BzSetting";
import BzSocialIcons from "../../components/section/BzSocialIcons";
import BzLogo from "../../components/section/BzLogo";
import BaseFooter from "./BaseFooter";

export default {
  components: {
    BzLogo,
    BzSocialIcons,
    BzSetting,
    BzEmail,
    BzPhoneNumber,
    BzAddress,
    BzDivider,
    BzTitle,
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
.bz-sec--footer-5-root {
  @import "style";
  .justify-space-between {
    justify-content: space-between;
  }
}
</style>
