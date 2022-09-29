<template>
  <div
    class="bz-section-container bz-sec--footer-8-root"
    :class="{ [breakPoint]: true }"
    :data-section="section.sectionUUID"
  >
    <bz-background :setting="background" size="m">
      <bz-container>
        <div class="wrapper-1">
          <div class="bz-row">
            <template v-if="data.items">
              <div class="bz-col-lg-4 bz-col-md-6">
                <bz-title v-model="data.items[0].title" />
                <div v-for="(link, index) of data.items[0].links" :key="index">
                  <bz-text v-model="link.label" />
                </div>
              </div>
              <div class="bz-col-lg-4 bz-col-md-6">
                <bz-title v-model="data.items[1].title" />
                <div v-for="(link, index) of data.items[1].links" :key="index">
                  <bz-text v-model="link.label" />
                </div>
              </div>
            </template>
            <div class="bz-col-lg-4 bz-col-md-6">
              <div class="d-flex flex-column align-items-end">
                <bz-logo
                  :title="false"
                  :logo-size="setting.logoSize"
                  @changeSize="handleLogoSizeChange"
                />
                <div class="mt-3">
                  <bz-title v-model="activePage.data.title" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bz-row mt-3">
          <div class="bz-col-lg-4 bz-col-md-6">
            <div class="d-flex align-items-center">
              <span class="copyright-symbol">&copy; </span>
              <bz-text v-model="data.elements.copyrightMessage" />
            </div>
          </div>
          <div class="bz-col-lg-4 bz-col-md-6">
            <bz-address />
          </div>
          <div class="bz-col-lg-4 bz-col-md-6">
            <bz-text v-model="data.elements.description" />
          </div>
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzBackground from "../../components/section/BzBackground";
import BzContainer from "../../components/section/BzContainer";
import BzTitle from "../../components/section/BzTitle";
import BzLogo from "../../components/section/BzLogo";
import BzText from "../../components/section/BzText";
import BaseFooter from "./BaseFooter";
import BzAddress from "../../components/section/BzAddress";

export default {
  components: {
    BzAddress,
    BzText,
    BzLogo,
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
.bz-sec--footer-8-root {
  @import "style";
  .justify-space-between {
    justify-content: space-between;
  }

  .wrapper-1 {
    background-color: var(--bz-primary-color);
    padding: 50px 20px;
  }
}
</style>
