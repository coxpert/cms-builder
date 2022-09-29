<template>
  <header
    class="bz-section-container bz-sec--header-3-root"
    :class="{ [breakPoint]: true }"
    :data-section="section.sectionUUID"
  >
    <bz-background :setting="background">
      <header class="bz-header">
        <bz-social-icons :size="24" />
        <bz-logo
          :title="setting.elements.siteTitle"
          :logo-size="setting.logoSize"
          resize-direction="left-bottom"
          @changeSize="handleLogoChange"
        />
        <div class="d-flex position-absolute auth-group">
          <div class="mr-2 d-flex">
            <div class="mx-1">
              <bz-button
                v-if="setting.elements.loginButton"
                v-model="data.elements.login"
                :button-color="headerButtonColor"
              />
            </div>
            <div class="mx-1">
              <bz-button
                v-if="setting.elements.registerButton"
                v-model="data.elements.register"
                :button-color="headerButtonColor"
              />
            </div>
          </div>
        </div>
      </header>
      <bz-divider :line="true" :line-color="lineColor" />
      <div class="menu-container">
        <bz-nav-bar>
          <template v-slot="{ pageName, active }">
            <span class="menu-item link-text" :class="{ active }">{{
              pageName
            }}</span>
          </template>
        </bz-nav-bar>
      </div>
    </bz-background>
  </header>
</template>

<script>
import BzButton from "../../components/section/BzButton";
import BzBackground from "../../components/section/BzBackground";
import BzSocialIcons from "../../components/section/BzSocialIcons";
import BzDivider from "../../components/section/BzDivider";
import BzLogo from "../../components/section/BzLogo";
import BzNavBar from "../../components/section/BzNavBar";
import headerMixin from "../../mixins/headerMixin";

export default {
  components: {
    BzNavBar,
    BzLogo,
    BzDivider,
    BzSocialIcons,
    BzBackground,
    BzButton,
  },
  mixins: [headerMixin],
};
</script>
<style lang="scss">
.bz-sec--header-3-root {
  @import "style";

  .bz-header {
    justify-content: space-between;
  }

  .auth-group {
    right: 8px;
    bottom: 0;
  }

  .menu-container {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px 0;

    .menu-item {
      width: max-content;
      margin: 0 8px;
      padding-bottom: 2px;
      border-bottom: solid 2px transparent;
      cursor: pointer;

      &.active {
        border-bottom: solid 2px var(--bz-primary-color);
      }

      a {
        text-decoration: none;

        &:hover {
          text-decoration: none;
        }
      }
    }
  }
}
</style>
