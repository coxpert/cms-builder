<template>
  <div
    class="bz-section-container bz-sec--footer-1-root"
    :class="{ [breakPoint]: true }"
    :data-section="section.sectionUUID"
  >
    <bz-background :setting="background" size="m">
      <bz-container>
        <bz-logo :title="setting.elements.siteTitle" />
        <div class="d-flex align-items-end justify-content-between">
          <div v-if="setting.elements.pagesMenu" class="bz-pages-menu">
            <bz-nav-bar>
              <template v-slot="{ pageName }">
                <span class="menu-item">{{ pageName }}</span>
              </template>
            </bz-nav-bar>
          </div>
          <bz-social-icons v-if="setting.elements.socialIcons" />
        </div>
        <bz-divider
          v-if="setting.elements.dividerLine"
          :line="true"
          :line-color="lineColor"
        />
        <div class="bz-row">
          <div class="bz-col-lg-4 bz-col-md-6">
            <template v-if="setting.elements.address">
              <bz-title v-model="data.elements.addressTitle" />

              <bz-address :location="setting.businessInformation.location" />
            </template>

            <bz-phone-number v-if="setting.elements.phoneNumber" />

            <bz-email v-if="setting.elements.email" />
          </div>
          <div class="bz-col-lg-8 bz-col-md-6">
            <template v-if="setting.elements.description">
              <bz-title v-model="activePage.name" />

              <bz-text v-model="data.elements.description" />
            </template>
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
              {{ templateSetting.businesses[0].companyName }}
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
import BzTitle from "../../components/section/BzTitle";
import BzDivider from "../../components/section/BzDivider";
import BzText from "../../components/section/BzText";
import BzAddress from "../../components/section/BzAddress";
import BzPhoneNumber from "../../components/section/BzPhoneNumber";
import BzEmail from "../../components/section/BzEmail";
import BzSetting from "../../components/section/BzSetting";
import BzSocialIcons from "../../components/section/BzSocialIcons";
import BzLogo from "../../components/section/BzLogo";
import BzNavBar from "../../components/section/BzNavBar";
import BaseFooter from "./BaseFooter";

export default {
  components: {
    BzNavBar,
    BzSocialIcons,
    BzSetting,
    BzEmail,
    BzTitle,
    BzPhoneNumber,
    BzAddress,
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
.bz-sec--footer-1-root {
  @import "style";
}
</style>
