<template>
  <div
    class="bz-section-container bz-sec--footer-7-root"
    :class="{ [breakPoint]: true }"
    :data-section="section.sectionUUID"
  >
    <bz-background :setting="background" size="m">
      <bz-container>
        <div class="bz-row">
          <div class="bz-col-lg-4 bz-col-md-6">
            <bz-logo
              :title="false"
              :logo-size="setting.logoSize"
              @changeSize="handleLogoSizeChange"
            />
            <div v-if="activePage?.data" class="my-3">
              <bz-title v-model="activePage.data.title" />
            </div>
            <bz-social-icons :gap="2" />
          </div>
          <template v-if="data.items">
            <div class="bz-col-lg-4 bz-col-md-6">
              <bz-title v-model="data.items[0].title" />
              <div
                v-for="(link, index) of data.items[0].links"
                :key="index"
                class="mt-2"
              >
                <bz-link :link="link.link">
                  <bz-text
                    v-model="link.label"
                    :link="link.link"
                    :with-link="true"
                    @changeLink="link.link = $event"
                  />
                </bz-link>
              </div>
            </div>
            <div class="bz-col-lg-4 bz-col-md-6">
              <bz-title v-model="data.items[1].title" />
              <div
                v-for="(link, index) of data.items[1].links"
                :key="index"
                class="mt-2"
              >
                <bz-link :link="link.link">
                  <bz-text
                    v-model="link.label"
                    :link="link.link"
                    :with-link="true"
                    @changeLink="link.link = $event"
                  />
                </bz-link>
              </div>
            </div>
          </template>
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzBackground from "../../components/section/BzBackground";
import BzContainer from "../../components/section/BzContainer";
import BzTitle from "../../components/section/BzTitle";
import BzSocialIcons from "../../components/section/BzSocialIcons";
import BzLogo from "../../components/section/BzLogo";
import BaseFooter from "./BaseFooter";
import BzText from "../../components/section/BzText";
import BzLink from "../../components/section/BzLink";

export default {
  name: "Footer7",
  components: {
    BzLink,
    BzText,
    BzLogo,
    BzSocialIcons,
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
.bz-sec--footer-7-root {
  @import "style";
  .justify-space-between {
    justify-content: space-between;
  }
}
</style>
