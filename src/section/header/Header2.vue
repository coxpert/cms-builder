<template>
  <header
    class="bz-section-container bz-sec--header-2-root"
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
        <bz-menu :max-width="400">
          <template v-slot="{ pageName, active }">
            <div class="nav-item ml-3" :class="{ active }">
              <span class="link-text">
                {{ pageName }}
              </span>
            </div>
          </template>
        </bz-menu>
        <div class="d-flex align-items-center">
          <a href="/login" class="nav-item ml-3">
            <span class="link-text"> Login </span>
          </a>
          <a href="/register" class="nav-item ml-3">
            <span class="link-text"> Register </span>
          </a>
        </div>
      </header>
    </bz-background>
  </header>
</template>

<script>
import BzBackground from "../../components/section/BzBackground";
import BzLogo from "../../components/section/BzLogo";
import BzMenu from "../../components/section/BzMenu";
import headerMixin from "../../mixins/headerMixin";

export default {
  components: {
    BzMenu,
    BzLogo,
    BzBackground,
  },
  mixins: [headerMixin],
};
</script>
<style lang="scss">
.bz-sec--header-2-root {
  @import "style";

  .nav-item {
    color: var(--bz-theme-text-color);
    font-size: 16px;
    font-weight: bold;
    white-space: nowrap;
    cursor: pointer;

    &.active {
      color: blue;
    }
  }

  .dropdown {
    .nav-item {
      border-bottom: solid 1px #80808034;
      padding: 6px 20px;
      margin-left: 0 !important;

      &:hover {
        background-color: #55555512;
      }
    }
  }
}
</style>
