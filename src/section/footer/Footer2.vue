<template>
  <div class="bz-section-container bz-sec--footer-2-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" size="m">
      <bz-container>
        <bz-logo :title="setting.elements.siteTitle" />
        <bz-text v-if="setting.elements.subtitle" v-model="data.elements.description" />
        <div v-if="setting.elements.pagesMenu" class="d-flex align-items-end justify-content-between mb-5">
          <div class="bz-pages-menu">
            <a v-for="(page, index) of allPages" :key="index" class="menu-item" :href="pageUrl(page.url)"> {{ page.name }} </a>
          </div>
        </div>
        <bz-social-icons v-if="setting.elements.socialIcons" :size="24" :edit="true" />
        <div class="w-100 d-flex align-items-center mt-3">
          <bz-setting v-if="setting.elements.copyrightMessage" :on-click="openBusinessSetting" :wrap-content="true">
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
import BzTitle from '../../components/section/BzTitle'
import BzDivider from '../../components/section/BzDivider'
import BzText from '../../components/section/BzText'
import BzAddress from '../../components/section/BzAddress'
import BzPhoneNumber from '../../components/section/BzPhoneNumber'
import BzEmail from '../../components/section/BzEmail'
import BzSetting from '../../components/section/BzSetting'
import BzSocialIcons from '../../components/section/BzSocialIcons'
import BzLogo from '../../components/section/BzLogo'

export default {
  components: {
    BzSocialIcons,
    BzSetting,
    BzEmail,
    BzPhoneNumber,
    BzAddress,
    BzText,
    BzDivider,
    BzTitle,
    BzContainer,
    BzBackground,
    BzLogo
  },
  mixins: [sectionMixin],
  computed: {
    lineColor() {
      const color = this.getTextColor(this.backgroundColor, this.theme.primaryColor)
      return color.brighten(80)
    }
  },
  methods: {
    openBusinessSetting() {
      this.openSettingSlider(1, 'tab-address')
    }
  }
}
</script>
<style lang="scss" scoped>
.bz-sec--footer-2-root {
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
