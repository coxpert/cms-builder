<template>
  <div
    class="pages_area z-index-999"
    :class="{ active: openSlider && activeSlider === 'pages' }"
  >
    <new-page-modal v-if="openNewPageModal" @close="openNewPageModal = false" />
    <div class="py-2 px-3">
      <div class="row align-items-center">
        <div class="col-10">
          <h5 class="mb-0 text-dark">
            <b>Pages</b>
            <span
              >({{ allPages.length }}/{{
                template.page_limit === -1 ? 50 : template.page_limit || 50
              }})</span
            >
          </h5>
        </div>
        <div class="col-2 text-right">
          <span
            class="bz-close-section-area text-dark cursor-pointer fs-20"
            @click.prevent="closeSlider()"
          >
            <bz-close-icon />
          </span>
        </div>
      </div>
    </div>
    <div class="mt-3 px-3">
      <button
        v-if="allowedToCreateNewPage"
        class="btn bz-btn-default w-100"
        @click.prevent="openNewPageModal = true"
      >
        New Page
      </button>
      <div class="w-100">
        <draggable-item
          v-model="allPages"
          draggable=".item"
          @end="handlePageDragEnd"
        >
          <template v-for="(page, index) in allPages">
            <div
              v-if="page.type !== 'module'"
              :key="index"
              v-ripple
              class="page_item item cursor-pointer"
              :class="{ active: index === indexOfActivePage }"
              @click="setActivePage({ index })"
            >
              {{ page.name }}
              <div class="icons">
                <div v-if="!page.url" class="d-flex align-items-center">
                  <home-icon :size="18" fill-color="#8080807f" />
                </div>
                <div v-dropdown="{ autoClose: true }" class="more-vert">
                  <button dropdown-toggle>
                    <more-vert-icon />
                  </button>
                  <div class="bz-dropdown-menu-container">
                    <div
                      class="bz-dropdown-menu"
                      @click.stop.prevent="openPageSettingModal = true"
                    >
                      Settings
                    </div>
                    <div
                      class="bz-dropdown-menu"
                      @click.stop.prevent="duplicatePage"
                    >
                      Duplicate
                    </div>
                    <div
                      v-if="page.url"
                      class="bz-dropdown-menu"
                      @click.stop.prevent="deletePage(page.id)"
                    >
                      Delete
                    </div>
                    <div
                      v-if="isWebsite && page.url"
                      class="bz-dropdown-menu"
                      @click.stop.prevent="updatePageStatus(page.id)"
                    >
                      {{ pageStatus(page) ? "Inactivate" : "Activate" }}
                    </div>
                  </div>
                </div>
                <div class="d-flex align-items-center">
                  <drag-indicator-icon :size="18" fill-color="#8080807f" />
                </div>
              </div>
            </div>
            <div
              v-else
              :key="index"
              v-ripple
              class="page_item item cursor-pointer"
            >
              {{ page.name }}
            </div>
          </template>
        </draggable-item>
      </div>
    </div>
  </div>
</template>

<script>
import BzCloseIcon from "../icons/Close";
import MoreVertIcon from "../icons/MoreVert";
import HomeIcon from "../icons/HomeIcon";
import DragIndicatorIcon from "../icons/DragIndicator";
import { mapMutations } from "vuex";
import NewPageModal from "../modals/NewPageModal";
import builderMixin from "../../mixins/builderMixin";

export default {
  name: "PageSetting",
  components: {
    NewPageModal,
    DragIndicatorIcon,
    HomeIcon,
    MoreVertIcon,
    BzCloseIcon,
  },
  mixins: [builderMixin],
  data() {
    return {
      openNewPageModal: false,
    };
  },
  computed: {
    allowedToCreateNewPage() {
      return true;
      // return !this.template.page_limit || this.allPages.length < Number(this.template.page_limit)
    },
  },
  methods: {
    handlePageDragEnd() {
      this.updatePagesOrder();
    },
    deletePage(pageId) {
      this.$dialog.confirm().then((res) => {
        if (res) {
          this.$store.commit("deletePage", pageId);
        }
      });
    },
    pageStatus(page) {
      let active = page.active;
      if (page.type === "module") {
        active = active && page.data.nav_status;
      }
      return active;
    },
    ...mapMutations({
      duplicatePage: "duplicatePage",
      updatePagesOrder: "updatePagesOrder",
      updatePageStatus: "updatePageStatus",
    }),
  },
};
</script>

<style lang="scss">
$active: #0076df;
.pages_area {
  width: 300px;
  height: calc(100vh - 60px);
  position: fixed;
  left: 70px;
  top: 60px;
  background-color: rgb(239, 240, 241);
  z-index: 3;
  overflow: hidden;
  transform: translateX(-370px);
  transition: transform 0.3s linear;

  .bz-close-section-area {
    font-size: 26px;

    &::after {
      width: calc(100vw - 370px);
      height: 100vh;
      position: fixed;
      top: 0;
      left: 370px;
      content: "";
      display: none;
    }
  }

  &.active {
    transform: translateX(0px);

    .bz-close-section-area {
      &::after {
        display: block;
      }
    }
  }

  .list {
    position: relative; /* position of list container must be set to `relative` */
  }

  /* dragging item will be added with a `dragging` class */
  /* so you can use this class to define the appearance of it */
  .list > *.dragging {
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  }

  .page_item {
    width: 100%;
    background-color: white;
    border-radius: 4px;
    padding: 10px;
    height: 40px;
    margin-top: 10px;
    box-shadow: 0 0 6px 3px #00000023;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;

    &.active {
      border: solid 2px #2196f3;
    }

    &[draggable="true"] {
      box-shadow: 0 0 2px 1px #00000012;
      background-color: #f3f3f3;
    }

    .icons {
      display: flex;
      margin-left: auto;

      .more-vert {
        display: flex;
        color: #8080807f;
      }
    }

    &:hover {
      .icons {
        .more-vert {
          color: #555555;
        }
      }
    }

    .bz-dropdown-menu-container {
      right: 20px;
    }
  }
}
</style>
