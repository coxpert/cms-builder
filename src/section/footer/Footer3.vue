<template>
  <div class="bz-section-container bz-lg bz-md bz-sec--footer-3-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" size="m">
      <bz-container>
        <div class="bz-row">
          <div class="bz-col-lg-4 bz-col-md-6">
            <bz-logo :title="setting.elements.siteTitle" />
            <bz-text v-if="setting.elements.description" v-model="data.elements.description" />
          </div>
          <div class="bz-col-lg-4 bz-col-md-6">
            <template v-if="setting.elements.pagesMenu">
              <div v-for="(page, index) of allPages" class="bz-pages-menu" :key="index">
                <a class="menu-item" :href="pageUrl(page.url)"> {{ page.name }} </a>
              </div>
            </template>
          </div>
          <div class="bz-col-lg-4 bz-col-md-6">
            <bz-social-icons v-if="setting.elements.socialIcons" :edit="true" />
          </div>
        </div>
        <bz-divider :line="true" v-if="setting.elements.dividerLine" :line-color="lineColor" />
        <div class="w-100 d-flex align-items-center">
          <bz-setting :on-click="openBusinessSetting" v-if="setting.elements.copyrightMessage" :wrap-content="true">
            <span style="font-size: 14px; font-weight: 300"> &copy; {{ new Date().getFullYear() }} {{ templateSetting.businesses[activeCompanyIndex].companyName }} </span>
          </bz-setting>
          <div v-if="setting.elements.siteMap" class="site-map">Sitemap</div>
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from '../../mixins/sectionMixin'
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzDivider from '../../components/section/BzDivider'
import BzText from '../../components/section/BzText'
import BzAddress from '../../components/section/BzAddress'
import BzPhoneNumber from '../../components/section/BzPhoneNumber'
import BzEmail from '../../components/section/BzEmail'
import BzSetting from '../../components/section/BzSetting'
import BzSocialIcons from '../../components/section/BzSocialIcons'
import BzLogo from '../../components/section/BzLogo'

export default {
  mixins: [sectionMixin],
  components: {
    BzLogo,
    BzSocialIcons,
    BzSetting,
    BzEmail,
    BzPhoneNumber,
    BzAddress,
    BzText,
    BzDivider,
    BzContainer,
    BzBackground
  },
  methods: {
    openBusinessSetting() {
      this.openSettingSlider(1, 'tab-address')
    }
  },
  computed: {
    lineColor() {
      const color = this.getTextColor(this.backgroundColor, this.theme.primaryColor)
      return color.brighten(80)
    }
  }
}
</script>
<style lang="scss" scoped>
.bz-sec--footer-3-root {
  .bz-pages-menu {
    display: flex;
    flex-direction: row;
    padding: 4px;

    .menu-item {
      color: #555555;
      font-weight: 300;
      text-decoration: underline;
      font-size: 14px;
      margin-right: 24px;
      cursor: pointer;
    }
  }

  .site-map {
    text-decoration: underline;
    font-size: 14px;
    margin-left: 20px;
    font-weight: 300;
  }
}
</style>
