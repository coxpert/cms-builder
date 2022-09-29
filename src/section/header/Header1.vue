<template>
  <header
    class="bz-section-container bz-sec--header-1-root"
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
        <button class="menu-button" @click.prevent="toggleMenu">
          <HamburgerIcon :hamburger-open="openMenu" />
        </button>
      </header>
    </bz-background>
    <div class="menu-container">
      <slide-up-down :active="openMenu" :duration="500">
        <div class="menu-content">
          <div class="close-icon" @click="toggleMenu">
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.414 5A1 1 0 105 6.414L10.586 12 5 17.586A1 1 0 106.414 19L12 13.414 17.586 19A1 1 0 1019 17.586L13.414 12 19 6.414A1 1 0 1017.586 5L12 10.586 6.414 5z"
              ></path>
            </svg>
          </div>
          <div
            v-for="(page, index) of allPages"
            :key="index"
            style="margin-top: 20px"
            @click="toggleMenu"
          >
            <a :href="`/${page.url || ''}`">
              <span class="link-text">
                {{ page.name }}
              </span>
            </a>
          </div>
          <div
            v-if="setting.elements.loginButton"
            style="margin-top: 20px"
            @click="toggleMenu"
          >
            <a href="/login">
              <span class="link-text">Login</span>
            </a>
          </div>
          <div
            v-if="setting.elements.registerButton"
            style="margin-top: 20px"
            @click="toggleMenu"
          >
            <a href="/register">
              <span class="link-text">Register</span>
            </a>
          </div>
          <div style="margin-top: 50px">
            <bz-social-icons />
          </div>
        </div>
      </slide-up-down>
    </div>
  </header>
</template>

<script>
import HamburgerIcon from "../../components/icons/Hamburger";
import BzBackground from "../../components/section/BzBackground";
import BzSocialIcons from "../../components/section/BzSocialIcons";
import BzLogo from "../../components/section/BzLogo";
import headerMixin from "../../mixins/headerMixin";

export default {
  components: {
    BzSocialIcons,
    BzBackground,
    HamburgerIcon,
    BzLogo,
  },
  mixins: [headerMixin],
};
</script>
<style lang="scss" scoped>
.bz-sec--header-1-root {
  @import "style";

  .bz-header {
    justify-content: space-between;
  }

  .menu-container {
    position: fixed;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 10000;

    .menu-content {
      width: 100%;
      height: 100vh;
      background-color: white;
      position: relative;
      padding-top: 10%;
      padding-bottom: 20%;
      justify-content: center;
      align-items: center;
      display: flex;
      flex-direction: column;

      a {
        &:hover {
          text-decoration: none !important;
        }
      }

      .link-text {
        text-decoration: none;
        font-size: 36px;
        margin-top: 20px;
        font-weight: 100;

        &:hover {
          text-decoration: none;
          color: var(--bz-primary-color);
        }
      }

      .close-icon {
        position: absolute;
        right: 16px;
        top: 16px;
        padding: 8px;
        border: 2px solid #555555;
        border-radius: 50%;
        fill: #555555;
        cursor: pointer;

        &:hover {
          fill: var(--bz-primary-color);
          border-color: var(--bz-primary-color);
        }
      }
    }
  }
}
</style>
