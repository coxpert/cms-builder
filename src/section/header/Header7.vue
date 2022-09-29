<template>
  <header
    class="bz-section-container bz-sec--header-7-root"
    :class="{ [breakPoint]: true }"
    :data-section="section.sectionUUID"
  >
    <bz-background :setting="background">
      <div v-if="setting.elements.topBar" class="top-bar">
        <bz-text v-model="data.elements.description" />
      </div>
      <header class="bz-header">
        <div v-if="setting.elements.logo">
          <bz-logo
            :title="false"
            :logo-size="setting.logoSize"
            @changeSize="handleLogoChange"
          />
        </div>
        <div
          v-if="setting.elements.siteTitle"
          class="d-flex justify-content-center"
        >
          <bz-title
            v-if="setting.elements.siteTitle"
            v-model="data.elements.siteTitle"
          />
        </div>
        <div>
          <div class="d-flex align-items-center">
            <div class="menu-container">
              <bz-menu>
                <template v-slot="{ pageName, active }">
                  <span class="menu-item" :class="{ active }">{{
                    pageName
                  }}</span>
                </template>
              </bz-menu>
            </div>
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
import BzMenu from "../../components/section/BzMenu";
import BzText from "../../components/section/BzText";
import BzTitle from "../../components/section/BzTitle";

export default {
  name: "Header7",
  components: { BzTitle, BzText, BzLogo, BzMenu, BzBackground },
  mixins: [headerMixin],
};
</script>
<style lang="scss" scoped>
.bz-sec--header-7-root {
  @import "style";

  .top-bar {
    background-color: var(--bz-primary-color);
    padding: 5px 0;
    display: flex;
    justify-content: center;
  }

  .bz-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > div {
      flex: 1;
    }
  }

  .menu-container {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px 0;
    margin-right: 20px;
    width: 100%;

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
</style>
