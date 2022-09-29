<template>
  <header
    class="bz-section-container bz-sec--header-9-root"
    :class="{ [breakPoint]: true }"
  >
    <bz-background :setting="background">
      <bz-container v-if="setting.elements.topBar">
        <div class="d-flex align-items-center justify-content-between">
          <bz-logo
            v-if="setting.elements.logo"
            :title="setting.elements.title"
          />
        </div>
      </bz-container>
      <bz-container>
        <div class="d-flex justify-content-end">
          <bz-navigation v-model="data.navigations">
            <template v-slot="{ item }">
              <div class="nav-item link-text">
                {{ item.name }}
                <div v-if="item.icon" class="nav-item-icon link-text">
                  <i
                    v-if="item.icon"
                    :class="item.icon"
                    style="padding-bottom: 2px"
                    class="mr-1"
                  ></i>
                </div>
              </div>
            </template>
          </bz-navigation>
        </div>
      </bz-container>
    </bz-background>
  </header>
</template>

<script>
import BzBackground from "../../components/section/BzBackground";
import headerMixin from "../../mixins/headerMixin";
import BzContainer from "../../components/section/BzContainer";
import BzNavigation from "../../components/page/BzNavigation";
import BzLogo from "../../components/section/BzLogo";

export default {
  components: {
    BzLogo,
    BzNavigation,
    BzContainer,
    BzBackground,
  },
  mixins: [headerMixin],
};
</script>
<style lang="scss">
.bz-sec--header-9-root {
  @import "style";
  .nav-item {
    padding: 0 10px;
    display: flex;
    align-items: center;

    .nav-item-icon {
      font-size: 14px;
      margin-left: 4px;
    }
  }
}
</style>
