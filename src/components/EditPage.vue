<template>
  <main class="w-100">
    <template v-if="loadingData">
      <Loading :active="true" :is-full-page="true" color="#0076DF" />
    </template>
    <template v-else>
      <Modals />
      <div class="edit_page_container">
        <div class="content_body w-100 bg-transparent">
          <NavBar />
          <SliderBar />
          <!-- <SettingPanel /> -->
          <div class="bz-page-content">
            <!-- <PageContent /> -->
          </div>
        </div>
      </div>
    </template>
  </main>
</template>

<script>
import Loading from "vue-loading-overlay";
import NavBar from "./page/NavBar";
// import PageContent from "./page/PageContent";
import SliderBar from "./page/SliderBar";
// import SettingPanel from "./page/SettingPanel";
import Modals from "./modals/Modals";
import componentMixin from "../mixins/componentMixin";

export default {
  components: {
    Loading,
    NavBar,
    Modals,
    // SettingPanel,
    SliderBar,
    // PageContent,
  },
  mixins: [componentMixin],
  computed: {
    loadingData() {
      return this.$store.state.loadingData;
    },
  },
  created() {
    this.$store.commit("enableEdit");
    this.$store.commit("setTemplate");
  },
  mounted() {
    // if (window.appEnv !== "local") {
    //   window.onbeforeunload = function () {
    //     return "Do you want to leave?";
    //   };
    // }
  },
};
</script>
<style lang="scss">
.edit_page_container {
  position: relative;
  height: 100%;

  .content_body {
    width: 100%;

    .bz-page-content {
      position: absolute;
      margin-left: 70px;
      margin-right: 280px;
      background-color: rgb(217, 222, 227);
      min-height: calc(100vh - 60px);
      height: min-content;
      display: flex;
      justify-content: center;
      padding-bottom: 1000px;
      width: calc(100% - 350px);
    }
  }
}
.item-dropzone-area {
  height: 300px;
  background: transparent;
  opacity: 0.8;
  animation-duration: 0.5s;
  animation-name: nodeInserted;
}
</style>
