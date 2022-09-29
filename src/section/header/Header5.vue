<template>
  <header
    class="bz-section-container bz-sec--header-5-root"
    :class="{ [breakPoint]: true }"
    :data-section="section.sectionUUID"
  >
    <bz-background :setting="background">
      <header class="bz-header">
        <bz-logo
          :title="setting.elements.siteTitle"
          :logo-size="setting.logoSize"
          @changeSize="handleLogoChange"
        />
        <div class="d-flex align-items-center">
          <div class="menu-container">
            <bz-nav-bar>
              <template v-slot="{ pageName, active }">
                <span class="menu-item link-text" :class="{ active }">{{
                  pageName
                }}</span>
              </template>
            </bz-nav-bar>
          </div>
        </div>
      </header>
    </bz-background>
  </header>
</template>

<script>
import BzBackground from "../../components/section/BzBackground";
import BzLogo from "../../components/section/BzLogo";
import BzNavBar from "../../components/section/BzNavBar";
import headerMixin from "../../mixins/headerMixin";

export default {
  components: { BzNavBar, BzLogo, BzBackground },
  mixins: [headerMixin],
};
</script>
<style lang="scss" scoped>
.bz-sec--header-5-root {
  @import "style";

  .menu-container {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px 20px 6px;
    box-shadow: 0 0.25rem 1rem rgb(0 0 0 / 12%);
    border-radius: 48px;
    background: rgba(255, 255, 255, 0.4);

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

    @media (max-width: 500px) {
      display: none;
    }
  }
}

.mobile_view {
  .menu-button {
    display: flex !important;
  }

  .menu-container {
    display: none !important;
  }
}
</style>
