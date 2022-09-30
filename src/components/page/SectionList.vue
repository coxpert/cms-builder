<template>
  <div
    class="sections_area z-index-999"
    :class="{ active: activeSlider === 'sections' && openSlider }"
  >
    <div class="section_heading py-2 px-3">
      <div class="row align-items-center">
        <div class="col-4">
          <h5 class="mb-0 text-dark"><b>Sections</b></h5>
        </div>
        <div class="col-6">
          <input
            type="text"
            class="form-control w-150px"
            placeholder="Search sections"
          />
        </div>
        <div class="col-2 text-right">
          <div class="text-dark cursor-pointer" @click.prevent="closeSlider()">
            <close-icon fill-color="#555555" />
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="section_content h-100 d-flex">
      <div
        class="section_category_area w-50 p-3 preview_content_ul custom-scroll-h scroll-w-5"
      >
        <div v-if="moduleCategories">
          <p class="heading mb-0 fs-18px font-weight-bold pb-2">Modules</p>
          <ul class="ml-0 pl-2 list-style-none">
            <li
              v-for="(cat, key1) in moduleCategories"
              :key="key1"
              class="side_category_item"
            >
              <a
                href=""
                class="mb-1"
                :class="{ active: activeCategory.id === cat.id }"
                @click.prevent="handleCategoryClick(cat)"
              >
                {{ cat.name }}
              </a>
            </li>
          </ul>
        </div>
        <div v-if="recommendedCategories.length">
          <p class="heading mb-0 fs-18px font-weight-bold pb-2">Recommended</p>
          <ul class="ml-0 pl-2 list-style-none">
            <li
              v-for="(cat, key1) in recommendedCategories"
              :key="key1"
              class="side_category_item"
            >
              <a
                href=""
                class="mb-1"
                :class="{ active: activeCategory.id === cat.id }"
                @click.prevent="handleCategoryClick(cat)"
              >
                {{ cat.name }}
              </a>
            </li>
          </ul>
        </div>
        <p class="heading mb-0 fs-18px font-weight-bold pb-2">All categories</p>
        <ul class="ml-0 mb-0 pl-2 list-style-none">
          <template v-for="(cat, key2) in restCategories" :key="key2">
            <li class="side_category_item">
              <a
                href=""
                class="mb-1"
                :class="{ active: activeCategory.id === cat.id }"
                @click.prevent="handleCategoryClick(cat)"
              >
                {{ cat.name }}
              </a>
            </li>
          </template>
        </ul>
      </div>
      <div class="section_category_preview_area w-100">
        <div
          class="ml-0 mb-0 p-3 list-style-none preview_content_ul custom-scroll-h scroll-w-5"
        >
          <template v-if="categorySections.length">
            <div v-for="(section, key3) in categorySections" :key="key3">
              <div
                ref="sectionPreView"
                class="section_preview_item cursor-pointer"
                :class="{ active: isSectionActive(section) }"
                @click.prevent.stop="handleSectionClick($event, section)"
              >
                <div
                  ref="sectionBase"
                  class="section-preview-base bz-page"
                  style="pointer-events: none"
                >
                  <component
                    :is="section.name"
                    :preview="true"
                    :properties="section"
                  />
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <li class="w-100">
              <span>No sections</span>
            </li>
          </template>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import draggable from "vuedraggable";
import CloseIcon from "../icons/Close";
import builderMixin from "../../mixins/builderMixin";

export default {
  components: {
    draggable,
    CloseIcon,
  },
  mixins: [builderMixin],
  data() {
    return {
      recommendedCategories: [],
      restCategories: [],
      categorySections: [],
      activeCategory: {},
      dragData: {},
      prevActivePosition: null,
      selectedSection: {},
    };
  },
  watch: {
    activeCategory: {
      deep: true,
      immediate: true,
      handler(val) {
        this.categorySections = val.sections || [];
      },
    },
    categorySections: {
      deep: true,
      immediate: true,
      handler(value) {
        if (value.length) {
          this.$nextTick(() => {
            this.$refs.sectionBase.forEach((item, index) => {
              if (item) {
                const sectionPreView = this.$refs.sectionPreView[index];
                new ResizeObserver(function (entries) {
                  const rect = entries[0].contentRect;
                  sectionPreView.style.height = rect.height * 0.214285 + "px";
                }).observe(item);
              }
            });
          });
        }
      },
    },
  },
  mounted() {
    const recommendedCategories = [];
    const restCategories = [];
    window.$.each(this.allCategories, function (key, item) {
      if (item.recommended) {
        recommendedCategories.push(item);
      } else {
        restCategories.push(item);
      }
    });
    this.recommendedCategories = recommendedCategories;
    this.restCategories = restCategories;
    this.activeCategory = this.restCategories[2] || {};
  },
  methods: {
    handleCategoryClick(cat) {
      this.activeCategory = cat;
      if (cat.name === "Header") {
        if (this.prevActivePosition === null) {
          this.prevActivePosition = this.activePosition;
        }
        this.activePosition = "header";
      } else if (cat.name === "Footer") {
        if (this.prevActivePosition === null) {
          this.prevActivePosition = this.activePosition;
        }
        this.activePosition = "footer";
      } else {
        if (this.prevActivePosition !== null) {
          this.activePosition = this.prevActivePosition;
          this.prevActivePosition = null;
        }
      }
      this.$store.commit("scrollToActiveSection");
    },
    isSectionActive(section) {
      if (section.name.includes("Header")) {
        return section.name === this.header.name;
      }
      if (section.name.includes("Footer")) {
        return section.name === this.footer.name;
      }
      if (this.activeSection) {
        return this.activeSection.name === section.name;
      } else {
        return this.selectedSection.name === section.name;
      }
    },
    handleSectionClick(event, section) {
      this.selectedSection = section;
      const index = this.activeSections?.indexOf(null);
      if (
        this.activeCategory.name === "Header" ||
        this.activeCategory.name === "Footer"
      ) {
        if (index > -1) {
          this.activeSections.splice(index, 1);
        }
        if (this.activeCategory.name === "Header") {
          this.header.data.setting = section.data.setting;
          this.header.data.background = section.data.background;
          this.header.name = section.name;
          this.activePosition = "header";
        } else {
          this.footer.data.setting = section.data.setting;
          this.footer.data.background = section.data.background;

          this.footer.name = section.name;
          this.activePosition = "footer";
        }
      } else {
        if (this.activePosition === "header") {
          this.activePosition = 0;
        } else if (this.activePosition === "footer") {
          this.activePosition = this.activeSections?.length || 0;
        }
        if (index > -1) {
          this.assignSection(section);
          this.prependSection(index);
        } else {
          this.addPosition = this.activePosition;
          this.assignSection(section);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sections_area {
  position: fixed;
  top: 60px;
  height: calc(100vh - 60px);
  background-color: #eff0f1;
  overflow: hidden;
  width: 500px;
  left: 70px;
  z-index: 3;
  transform: translateX(-570px);
  transition: transform 0.3s linear;

  .bz-close-section-area {
    font-size: 26px;

    &::after {
      width: calc(100vw - 570px);
      height: 100vh;
      position: fixed;
      top: 0;
      left: 570px;
      background-color: red;
      display: none;
    }
  }

  &.active {
    transform: translateX(0);

    .bz-close-section-area {
      &::after {
        display: block;
      }
    }
  }

  .section_heading {
    border-bottom: 1px solid #d7d8d8;
  }

  .section_content {
    .preview_content_ul {
      max-height: calc(100vh - 130px);
    }

    .section_category_area {
      border-right: 1px solid #d7d8d8;

      .side_category_item {
        a {
          color: #000;
          padding: 5px 10px;
          display: block;
          border-radius: 4px;

          &:hover,
          &.active {
            text-decoration: none;
            background-color: #d9dee3;
          }
        }
      }
    }
  }
}

.section_preview_item {
  display: flex;
  border: 2px solid transparent;
  margin-bottom: 10px;
  box-shadow: none;
  transition: 0.3s;
  width: 300px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  outline: solid 1px #8080807f;

  &.active {
    outline: solid 2px var(--bz-edit-active);
  }

  .section-preview-base {
    width: 1400px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: scale(0.21428571428571428);
  }
}
</style>
