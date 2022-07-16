<template>
  <header class="bz-section-container bz-sec--header-5-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background">
      <header class="bz-header">
        <bz-logo :title="setting.elements.siteTitle" />
        <div class="d-flex align-items-center">
          <div class="menu-container">
            <bz-menu>
              <template slot-scope="{ pageName, active }">
                <span class="menu-item" :class="{ active }">{{ pageName }}</span>
              </template>
            </bz-menu>
          </div>
          <div class="mr-2 d-flex">
            <div class="mx-1">
              <bz-button v-if="setting.elements.loginButton" v-model="data.elements.login" :button-color="headerButtonColor" />
            </div>
            <div class="mx-1">
              <bz-button v-if="setting.elements.registerButton" v-model="data.elements.register" :button-color="headerButtonColor" />
            </div>
          </div>
          <button class="menu-button" @click.prevent="toggleMenu">
            <HamburgerIcon :hamburger-open="openMenu" />
          </button>
        </div>
      </header>
    </bz-background>
  </header>
</template>

<script>
import sectionMixin from '../../mixins/sectionMixin'
import headerMixin from '../../mixins/headerMixin'
import BzButton from '../../components/section/BzButton'
import BzBackground from '../../components/section/BzBackground'
import BzMenu from '../../components/section/BzMenu'
import BzLogo from '../../components/section/BzLogo'
import HamburgerIcon from '../../components/icons/Hamburger'

export default {
  components: { BzLogo, BzMenu, BzBackground, BzButton, HamburgerIcon },
  mixins: [sectionMixin, headerMixin]
}
</script>
<style lang="scss" scoped>
.bz-sec--header-5-root {
  .bz-header {
    width: 100%;
    display: flex;
    padding: 20px;
    justify-content: space-between;
    align-items: center;
  }

  .menu-button {
    background-color: var(--bz-primary-color);
    display: none;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 46px;
    margin-left: 20px;
    @media (max-width: 500px) {
      display: flex;
    }
  }

  .menu-container {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px 20px 6px;
    margin-right: 20px;
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
