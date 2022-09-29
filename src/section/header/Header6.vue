<template>
  <header
    class="bz-section-container bz-sec--header-6-root"
    :class="{ [breakPoint]: true }"
    :data-section="section.sectionUUID"
  >
    <bz-background :setting="background">
      <header class="bz-header">
        <bz-logo
          :title="false"
          :logo-size="setting.logoSize"
          @changeSize="handleLogoChange"
        />

        <div class="d-flex align-items-center">
          <div class="menu-container">
            <bz-nav-bar>
              <template v-slot="{ pageName, active }">
                <span class="menu-item" :class="{ active }">{{
                  pageName
                }}</span>
              </template>
            </bz-nav-bar>
            <a href="/login">
              <span class="menu-item">Login</span>
            </a>
            <a href="/register">
              <span class="menu-item">Register</span>
            </a>
          </div>
        </div>
      </header>
    </bz-background>
  </header>
</template>

<script>
import headerMixin from "../../mixins/headerMixin";
import BzBackground from "../../components/section/BzBackground";
import BzLogo from "../../components/section/BzLogo";
import BzNavBar from "../../components/section/BzNavBar";

export default {
  name: "Header6",
  components: { BzNavBar, BzLogo, BzBackground },
  mixins: [headerMixin],
};
</script>
<style lang="scss" scoped>
.bz-sec--header-6-root {
  @import "style";

  .bz-header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .menu-container {
    display: flex;
    justify-content: space-evenly;
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
        text-decoration: none !important;

        &:hover {
          text-decoration: none !important;
        }
      }
    }
  }
}
</style>
