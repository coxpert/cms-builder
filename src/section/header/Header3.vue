<template>
  <header class="bz-section-container bz-sec--header-3-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background">
      <header class="bz-header">
        <bz-social-icons :size="24" />
        <bz-logo :title="setting.elements.siteTitle" />
        <div class="d-flex position-absolute auth-group">
          <div class="mr-2 d-flex">
            <div class="mx-1">
              <bz-button v-if="setting.elements.loginButton" v-model="data.elements.login" :button-color="headerButtonColor" />
            </div>
            <div class="mx-1">
              <bz-button v-if="setting.elements.registerButton" v-model="data.elements.register" :button-color="headerButtonColor" />
            </div>
          </div>
        </div>
      </header>
      <bz-divider :line="true" :line-color="lineColor" />
      <div class="menu-container">
        <bz-menu>
          <template slot-scope="{ pageName, active }">
            <span class="menu-item" :class="{ active }">{{ pageName }}</span>
          </template>
        </bz-menu>
      </div>
    </bz-background>
  </header>
</template>

<script>
import sectionMixin from '../../mixins/sectionMixin'
import BzButton from '../../components/section/BzButton'
import BzBackground from '../../components/section/BzBackground'
import BzSocialIcons from '../../components/section/BzSocialIcons'
import BzDivider from '../../components/section/BzDivider'
import BzMenu from '../../components/section/BzMenu'
import headerMixin from '../../mixins/headerMixin'
import BzLogo from '../../components/section/BzLogo'

export default {
  components: {
    BzLogo,
    BzMenu,
    BzDivider,
    BzSocialIcons,
    BzBackground,
    BzButton
  },
  mixins: [sectionMixin, headerMixin]
}
</script>
<style lang="scss">
.bz-sec--header-3-root {
  .bz-header {
    max-width: 1440px;
    padding: 12px;
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: center;
  }

  .auth-group {
    right: 8px;
    bottom: 0;
  }

  .menu-button {
    background-color: var(--bz-primary-color);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    margin-left: 20px;
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
