<template>
  <div
    class="bz-section-container bz-sec--footer-4-root"
    :class="{ [breakPoint]: true }"
    :data-section="section.sectionUUID"
  >
    <bz-background :setting="background" size="m">
      <bz-container>
        <div class="d-flex align-items-end justify-content-between">
          <div v-if="setting.elements.pagesMenu" class="bz-pages-menu">
            <a
              v-for="(page, index) of allPages"
              :key="index"
              class="menu-item"
              :href="pageUrl(page.url)"
            >
              {{ page.name }}
            </a>
          </div>
          <bz-logo :title="setting.elements.siteTitle" />
        </div>
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
          <div class="bz-col-6">
            <template v-if="setting.elements.description">
              <bz-title
                v-if="setting.elements.description"
                v-model="data.elements.descriptionTitle"
              />

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
import BzTitle from "../../components/section/BzTitle";
import BzDivider from "../../components/section/BzDivider";
import BzText from "../../components/section/BzText";
import BzAddress from "../../components/section/BzAddress";
import BzPhoneNumber from "../../components/section/BzPhoneNumber";
import BzEmail from "../../components/section/BzEmail";
import BzSetting from "../../components/section/BzSetting";
import BzLogo from "../../components/section/BzLogo";
import BaseFooter from "./BaseFooter";

export default {
  components: {
    BzLogo,
    BzSetting,
    BzEmail,
    BzPhoneNumber,
    BzAddress,
    BzText,
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
.bz-sec--footer-4-root {
  @import "style";
}
</style>
