<template>
  <header
    class="bz-section-container bz-sec--header-8-root"
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
        <div class="menu-container">
          <bz-nav-bar>
            <template v-slot="{ pageName, active }">
              <span class="menu-item" :class="{ active }">{{ pageName }}</span>
            </template>
          </bz-nav-bar>
        </div>
      </header>
    </bz-background>
  </header>
</template>

<script>
import BzBackground from "../../components/section/BzBackground";
import headerMixin from "../../mixins/headerMixin";
import BzLogo from "../../components/section/BzLogo";
import BzNavBar from "../../components/section/BzNavBar";

export default {
  name: "Header8",
  components: {
    BzNavBar,
    BzLogo,
    BzBackground,
  },
  mixins: [headerMixin],
};
</script>
<style lang="scss">
.bz-sec--header-8-root {
  @import "style";

  .bz-header {
    display: flex;
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
