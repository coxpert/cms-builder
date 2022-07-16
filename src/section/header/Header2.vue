<template>
  <header class="bz-section-container bz-sec--header-2-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background">
      <header class="bz-header">
        <bz-logo :title="setting.elements.siteTitle" />
        <div class="bz-action">
          <div class="mr-2 d-flex my-auto">
            <div class="mx-1">
              <bz-button v-if="setting.elements.loginButton" v-model="data.elements.login" :button-color="headerButtonColor" />
            </div>
            <div class="mx-1">
              <bz-button v-if="setting.elements.registerButton" v-model="data.elements.register" :button-color="headerButtonColor" />
            </div>
          </div>
          <button class="menu-button my-auto" @click.prevent="toggleMenu">
            <HamburgerIcon :hamburger-open="openMenu" />
          </button>
        </div>
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
          <div v-for="(page, index) of allPages" :key="index" style="margin-top: 20px" @click="toggleMenu">
            <router-link :to="`/${page.url || ''}`">
              <span class="link-text">
                {{ page.name }}
              </span>
            </router-link>
          </div>

          <bz-social-icons />
        </div>
      </slide-up-down>
    </div>
  </header>
</template>

<script>
import sectionMixin from '../../mixins/sectionMixin'
import BzButton from '../../components/section/BzButton'
import HamburgerIcon from '../../components/icons/Hamburger'
import BzBackground from '../../components/section/BzBackground'
import BzSocialIcons from '../../components/section/BzSocialIcons'
import headerMixin from '../../mixins/headerMixin'
import BzLogo from '../../components/section/BzLogo'

export default {
  components: {
    BzLogo,
    BzSocialIcons,
    BzBackground,
    HamburgerIcon,
    BzButton
  },
  mixins: [sectionMixin, headerMixin]
}
</script>
<style lang="scss" scoped>
.bz-sec--header-2-root {
  .bz-header {
    max-width: 1440px;
    padding: 12px;
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: space-between;
  }

  .bz-action {
    display: flex;
  }

  .menu-button {
    background-color: var(--bz-primary-color);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    margin-left: 20px;
    z-index: 10001;
    height: 50px;
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
        color: #555555;
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
