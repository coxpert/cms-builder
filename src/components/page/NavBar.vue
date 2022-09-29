<template>
  <nav class="z-99 w-100 bz-navbar shadow-sm bg-white">
    <div class="w-100 row px-3">
      <div class="col-5">
        <div class="d-flex flex-nowrap align-items-center">
          <div class="nav-item">
            <button class="btn bz-btn-default-outline mr-1" @click="handleBack">
              Back
            </button>
          </div>
          <div v-dropdown="{ autoClose: true }" class="nav-item">
            <span
              class="page_select h-hover d-flex align-items-center justify-content-between minw-150px"
              dropdown-toggle
            >
              <span class="mr-2">
                Page: <b class="text-capitalize">{{ activePage.name }}</b>
              </span>
              <span class="fs-12px ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"
                  />
                </svg>
              </span>
            </span>
            <div class="bz-dropdown-menu-container">
              <template v-for="(page, index) of allPages">
                <div
                  v-if="page.type !== 'module'"
                  :key="index"
                  class="bz-dropdown-menu cursor-pointer"
                  @click="setActivePage({ index })"
                >
                  {{ page.name }}
                </div>
              </template>
              <hr class="w-100" style="margin: 0" />
              <div class="text-center pt-2">
                <a
                  href="javascript:void(0)"
                  @click.prevent.stop="openPageSlider()"
                  >Manage pages</a
                >
              </div>
            </div>
          </div>
          <div class="nav-item px-2">
            <a
              class="control-item mx-1 flip-x"
              :class="{ active: isUndoAvailable }"
              href=""
              @click.prevent="undoTemplate()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"
                ></path>
              </svg>
            </a>
            <a
              class="control-item mx-1"
              :class="{ active: isRedoAvailable }"
              href=""
              @click.prevent="redoTemplate()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"
                ></path>
              </svg>
            </a>
            <a class="control-item active d-md-inline-block mx-1" href="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z"
                />
              </svg>
            </a>
          </div>
          <div class="nav-item">
            <div @click="saveAllPages">
              <button
                class="btn bz-btn-default-outline d-flex align-items-center"
              >
                Save
                <bz-spinner v-if="savingAllPages" style="margin-left: 5px" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-2">
        <ul
          v-if="activeSlider === 'sections'"
          class="mb-0 pl-0 list-style-none d-none d-md-flex flex-row justify-content-center"
        >
          <!--          <li class="nav-item">-->
          <!--            <a class="switch_item d-inline-block mx-1" href="" :class="{ active: viewMode === 'desktop' }" @click.prevent="setViewMode('desktop')">-->
          <!--              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">-->
          <!--                <path d="M0 0v19h24v-19h-24zm22 14h-20v-12h20v12zm-6.599 7l2.599 3h-12l2.599-3h6.802z" />-->
          <!--              </svg>-->
          <!--            </a>-->
          <!--          </li>-->
          <!--          <li class="nav-item">-->
          <!--            <a class="switch_item d-inline-block mx-1" href="" :class="{ active: viewMode === 'mobile' }" @click.prevent="setViewMode('mobile')">-->
          <!--              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">-->
          <!--                <path-->
          <!--                  d="M19 2c0-1.104-.896-2-2-2h-10c-1.104 0-2 .896-2 2v20c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2v-20zm-8.5 0h3c.276 0 .5.224.5.5s-.224.5-.5.5h-3c-.276 0-.5-.224-.5-.5s.224-.5.5-.5zm1.5 20c-.553 0-1-.448-1-1s.447-1 1-1c.552 0 .999.448.999 1s-.447 1-.999 1zm5-3h-10v-14.024h10v14.024z"-->
          <!--                />-->
          <!--              </svg>-->
          <!--            </a>-->
          <!--          </li>-->
        </ul>
      </div>
      <div class="col-5">
        <ul
          class="mb-0 pl-0 list-style-none d-none d-md-flex flex-row justify-content-end"
        >
          <li class="nav-item">
            <a
              class="btn btn-outline-info m-1"
              :href="previewUrl"
              target="_blank"
            >
              Preview
            </a>
          </li>
          <li class="nav-item">
            <button
              class="btn btn-info m-1 text-white d-flex align-items-center"
              @click="publishContent"
            >
              Publish
              <bz-spinner v-if="publishingContent" style="margin-left: 5px" />
            </button>
          </li>
          <!--          <li class="nav-item">-->
          <!--            <a class="btn btn-outline-info m-1 text-white text-dark" href="">-->
          <!--              <i class="fas fa-ellipsis-v"></i>-->
          <!--            </a>-->
          <!--          </li>-->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import BzSpinner from "./BzSpinner";
import axios from "axios";
import { mapMutations, mapState } from "vuex";
import builderMixin from "../../mixins/builderMixin";

export default {
  components: { BzSpinner },
  mixins: [builderMixin],
  data() {
    return {
      savingAllPages: false,
      publishingContent: false,
    };
  },
  computed: {
    ...mapState(["isUndoAvailable", "isRedoAvailable"]),
    viewMode() {
      return this.$store.state.viewMode;
    },
    pages() {
      return this.$store.state.pages;
    },
    previewUrl() {
      return this.$config.urls.websitePreviewURL;
    },
    templateToWatch() {
      return Object.assign({}, this.template);
    },
  },
  watch: {
    templateToWatch: {
      immediate: true,
      deep: true,
      handler(newTemplate) {
        this.pushTemplate(newTemplate);
      },
    },
  },
  methods: {
    ...mapMutations({
      pushTemplate: "pushTemplate",
      redoTemplate: "redoTemplate",
      undoTemplate: "undoTemplate",
    }),
    handleBack() {
      if (window.location.href.includes("/website/"))
        window.location.href = "/account/website";
      else window.location.href = "/admin/template/item";
    },
    async publishContent() {
      this.publishingContent = true;

      try {
        const template = this.template;
        const hostName = new URL(window.location.href).hostname;
        const isTemplate = !this.$store.state.template.domain;

        const updateContentUrl = this.$config.urls.updateContentUrl;

        if (!updateContentUrl) {
          console.error("update content url does not exist");
          return;
        }

        const redirectUrl = isTemplate
          ? "//" + template.slug + ".template." + hostName
          : "//" + template.domain;
        const status = isTemplate ? 1 : "active";

        if (
          isTemplate &&
          (!template.favicon ||
            !template.image ||
            !template.data.setting.internalTemplateSettings.logo)
        ) {
          this.$toast.warning("Template Settings Missing");
          this.openSettingSlider();
          this.publishingContent = false;
        } else {
          await this.saveAllPages();
          axios
            .post(updateContentUrl)
            .then((res) => {
              this.publishingContent = false;
              if (res.status) {
                this.$store.state.template.status = status;
                setTimeout(function () {
                  window.open(redirectUrl, "_blank");
                }, 500);
              } else {
                this.$toast.error("Failed to save!");
              }
            })
            .catch((err) => {
              this.publishingContent = false;
              console.log("updateContentUrl in NavBar.vue", err);
              this.$toast.error("Failed to save!");
            });
        }
      } catch (error) {
        console.error(error);
        this.publishingContent = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.bz-navbar {
  height: 60px;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.bz-dropdown-menu-container {
  width: 150px;
  border-radius: 5px;
  border: solid 1px #8080803f;
  margin-top: 7px;
  box-shadow: unset;

  .bz-dropdown-menu {
    font-size: 14px;
  }
}

.control-item {
  svg {
    fill: #b6b6b6;
  }
  &.active {
    svg {
      fill: #0076df;
    }
  }
}
</style>
