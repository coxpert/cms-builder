<template>
  <div
    v-if="activePage"
    id="main_content"
    ref="mainContent"
    class="main_content_area"
    :class="{ mobile_view: viewMode === 'mobile' }"
    :style="{ '--bz-content-scale': scale }"
    @wheel="handleMouseWheel"
  >
    <div
      v-if="template"
      class="sections-wrapper bz-page"
      :class="{ [activeSlider]: true, openSlider }"
      :style="sectionsWrapperStyle()"
      @mousedown="onMouseDown"
    >
      <header class="page-browser-bar">
        <div class="fake-browser-bar">
          <div class="fake-browser-menu">
            <div class="item" />
            <div class="item" />
            <div class="item" />
          </div>
          <div class="fake-browser-input">
            <span
              v-if="viewMode === 'desktop'"
              class="text-black"
              style="color: #000 !important"
            >
              {{ activePageUrl }}
            </span>
          </div>
          <div class="ml-3 cursor-pointer">
            <ZoomOut fill-color="#0076df" />
          </div>
        </div>
      </header>
      <div
        ref="headerContainer"
        class="bz-content-section"
        style="z-index: 2"
        :class="{ active: activePosition === 'header' }"
      >
        <div
          class="h-100"
          @click="handleSectionClick('header')"
          @dblclick="closeSlider"
        >
          <section
            v-if="carouselActive('header')"
            class="bz-component-container cursor-pointer"
          >
            <bz-carousel
              :height="carouselHeight"
              :width="carouselWidth"
              :start-index="startIndexForCarousel"
              :on-main-slide-click="handleHeaderSlideClick"
              :page-data="activePageData"
              :sections="headerSections"
              :current-section="header"
            />
          </section>
          <section v-else class="bz-component-container">
            <component
              :is="header.name"
              :page-data="activePageData"
              position="header"
              :edit="isSectionEditable"
              :properties="header"
            />
            <div
              v-if="activePosition === 'header'"
              class="active-content-overlay"
            >
              <template v-if="edit">
                <div
                  class="add_section bottom_add"
                  @click.prevent.stop="appendSection()"
                >
                  <bz-plus-icon :size="20" fill-color="white" />
                  <span class="add_section_txt">Add Section </span>
                </div>
                <span
                  class="left_arrow arrow_item"
                  @click.prevent="arrowAction('left')"
                >
                  <bz-arrow-left-icon fill-color="white" />
                </span>
                <span
                  class="right_arrow arrow_item"
                  @click.prevent="arrowAction('right')"
                >
                  <bz-arrow-right-icon fill-color="white" />
                </span>
              </template>
            </div>
          </section>
        </div>
      </div>
      <template v-if="sections.length">
        <div
          v-for="(section, position) in sections"
          :key="position"
          ref="sectionRef"
          class="bz-content-section"
          :class="{
            remove: removePosition === position,
            active: activePosition === position,
          }"
        >
          <div
            v-if="section === null"
            class="between_section_area"
            :class="{ active: openSlider }"
            :style="{ fontSize: 16 / scale + 'px' }"
          >
            <p>To add, click on a section in the sections bar on the left.</p>
            <button
              class="btn btn-outline-danger mt-5"
              @click="removeEmptySection"
            >
              Close
            </button>
          </div>
          <div
            v-else
            class="h-100"
            @click="handleSectionClick(position)"
            @dblclick="closeSlider"
          >
            <section
              v-if="carouselActive(position)"
              class="bz-component-container cursor-pointer"
            >
              <bz-carousel
                :height="carouselHeight"
                :width="carouselWidth"
                :start-index="startIndexForCarousel"
                :on-main-slide-click="handleSlideClick"
                :sections="getSectionsInCategory(section.category_id)"
                :current-section="section"
                :page-data="activePageData"
              />
            </section>
            <section
              v-else
              :ref="'componentContainer' + position"
              class="bz-component-container"
              :class="{ active: activePosition === position }"
            >
              <div
                class="w-100 h-100"
                :class="{
                  'overflow-hidden': changeSectionInSameCategory || deleting,
                }"
              >
                <component
                  :is="section.name"
                  :page-data="activePageData"
                  :edit="isSectionEditable"
                  :properties="section"
                  :position="position"
                />
              </div>
              <div
                v-if="position === activePosition"
                class="active-content-overlay"
              >
                <template v-if="edit">
                  <div class="control_box">
                    <span
                      v-if="position > 0"
                      class="arrow_top control_item"
                      @click.prevent="upward(position)"
                    >
                      <bz-arrow-up-icon fill-color="white" />
                    </span>
                    <span
                      v-if="position < sections.length - 1"
                      class="arrow_bottom mx-1 control_item"
                      @click.prevent="downward(position)"
                    >
                      <bz-arrow-down-icon fill-color="white" />
                    </span>
                    <span
                      class="arrow_remove control_item"
                      @click.prevent="remove(position)"
                    >
                      <bz-delete-icon fill-color="white" />
                    </span>
                  </div>
                  <template>
                    <div
                      class="add_section top_add"
                      @click.prevent.stop="prependSection()"
                    >
                      <bz-plus-icon :size="20" fill-color="white" />
                      <span class="add_section_txt">Add Section</span>
                    </div>
                    <div
                      class="add_section bottom_add"
                      @click.prevent.stop="appendSection()"
                    >
                      <bz-plus-icon :size="20" fill-color="white" />
                      <span class="add_section_txt"> Add Section </span>
                    </div>
                  </template>
                  <span
                    class="left_arrow arrow_item"
                    @click.prevent="arrowAction('left')"
                  >
                    <bz-arrow-left-icon fill-color="white" />
                  </span>
                  <span
                    class="right_arrow arrow_item"
                    @click.prevent="arrowAction('right')"
                  >
                    <bz-arrow-right-icon fill-color="white" />
                  </span>
                </template>
              </div>
            </section>
          </div>
        </div>
      </template>
      <div
        ref="footerContainer"
        class="bz-content-section"
        :class="{ active: activePosition === 'footer' }"
      >
        <div
          class="h-100"
          @click="handleSectionClick('footer')"
          @dblclick="closeSlider"
        >
          <section
            v-if="carouselActive('footer')"
            class="bz-component-container cursor-pointer"
          >
            <bz-carousel
              :height="carouselHeight"
              :width="carouselWidth"
              :start-index="startIndexForCarousel"
              :on-main-slide-click="handleFooterSlideClick"
              :sections="footerSections"
              :current-section="footer"
              :page-data="activePageData"
            />
          </section>
          <template v-else>
            <section ref="footerContainer" class="bz-component-container">
              <component
                :is="footer.name"
                :page-data="activePageData"
                position="footer"
                :edit="isSectionEditable"
                :properties="footer"
              />
              <div
                v-if="activePosition === 'footer'"
                class="active-content-overlay"
                :class="{ active: activePosition === 'footer' }"
              >
                <template v-if="edit">
                  <div
                    class="add_section top_add"
                    @click.prevent.stop="appendSection()"
                  >
                    <bz-plus-icon :size="20" fill-color="white" />
                    <span class="add_section_txt">Add Section </span>
                  </div>
                  <span
                    class="left_arrow arrow_item"
                    @click.prevent="arrowAction('left')"
                  >
                    <bz-arrow-left-icon fill-color="white" />
                  </span>
                  <span
                    class="right_arrow arrow_item"
                    @click.prevent="arrowAction('right')"
                  >
                    <bz-arrow-right-icon fill-color="white" />
                  </span>
                </template>
              </div>
            </section>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import ZoomOut from "../icons/ZoomOut";
import BzCarousel from "./BzCarousel3d";
import BzPlusIcon from "../icons/Plus";
import BzArrowRightIcon from "../icons/ArrowRight";
import BzArrowLeftIcon from "../icons/ArrowLeft";
import BzArrowDownIcon from "../icons/ArrowDown";
import BzArrowUpIcon from "../icons/ArrowUp";
import BzDeleteIcon from "../icons/Delete";
import builderMixin from "../../mixins/builderMixin";

export default {
  components: {
    BzDeleteIcon,
    BzArrowUpIcon,
    BzArrowDownIcon,
    BzArrowLeftIcon,
    BzArrowRightIcon,
    BzPlusIcon,
    BzCarousel,
    ZoomOut,
  },
  mixins: [builderMixin],
  data() {
    return {
      changeSectionInSameCategory: false,
      carouselHeight: 0,
      carouselWidth: 0,
      removePosition: null,
      deleting: false,
      startIndexForCarousel: 0,
      scale: 1,
      zoom: 1,
    };
  },
  computed: {
    sections() {
      return this.activeSections;
    },
    hasEmptySection() {
      const indexOfEmptySection = this.sections.findIndex(
        (section) => section === null
      );
      return indexOfEmptySection > -1;
    },
    activePageUrl() {
      let url = this.activePage.url;
      if (typeof url === "object") url = "";
      if (this.template.domain) {
        return `${this.template.domain}/${url || ""}`;
      }
      return `${window.appURL}/preview/${this.template.slug}/${url || ""}`;
    },
    _scrollToActiveSection() {
      return this.$store.state.scrollToActiveSection;
    },
    /**
     *  Enable Editing sections
     *
     *  If the theme setting left sidebar opened, the sections should not be editable.
     *
     * @returns {boolean}
     */
    isSectionEditable() {
      return !this.openSlider;
    },
    /**
     * returns some useful data of the active page to pass them to the sections and all elements.
     */
    activePageData() {
      if (this.activePage) {
        return {
          pageId: this.activePage.id,
          themeId: this.activePage.data?.themeId,
        };
      }
      return {};
    },
  },
  watch: {
    panelArrow(action) {
      if (action && !this.carouselActive(this.activePosition)) {
        this.arrowAction(action);
        this.updateLayout("");
      }
    },
    openSlider: {
      immediate: true,
      handler() {
        this.animate();
      },
    },
    activeSlider: {
      immediate: true,
      handler() {
        this.animate();
      },
    },
    scale() {
      this.scrollToActiveSection();
    },
    activePosition(position) {
      if (position != null) {
        this.$nextTick(() => {
          this.updateCarouselSize(position);
        });
      }
    },
    changeSectionInSameCategory(val) {
      if (!val) {
        this.$nextTick(() => {
          this.updateCarouselSize(this.activePosition);
        });
      }
    },
    _scrollToActiveSection() {
      this.scrollToActiveSection();
    },
  },
  mounted() {
    const self = this;
    window.addEventListener("scroll", function (e) {
      if (self.sections.length > 0) {
        const activeElement = self.getActiveElement();
        if (activeElement && !self.openSlider) {
          const top = activeElement.getBoundingClientRect().top;
          const bottom = activeElement.getBoundingClientRect().bottom;
          if (bottom < 0) {
            if (self.activePosition === "header") {
              self.activePosition = 0;
            } else if (self.activePosition === self.sections.length - 1) {
              self.activePosition = "footer";
            } else {
              self.activePosition = self.activePosition + 1;
            }
          } else if (top > window.innerHeight) {
            if (self.activePosition === 0) {
              self.activePosition = "header";
            } else if (self.activePosition === "footer") {
              self.activePosition = self.sections.length - 1;
            } else {
              self.activePosition = self.activePosition - 1;
            }
          }
        }
      }
    });
    this.updateCarouselSize("header");

    new ResizeObserver(function (entries) {
      const rect = entries[0].contentRect;
      const width = rect.width;
      self.scale = width / document.body.clientWidth;
    }).observe(self.$el);

    self.$el.addEventListener("mousemove", this.onMouseMove);
    self.$el.addEventListener("mouseup", this.onMouseUp);
  },
  methods: {
    handleSectionClick(position) {
      if (this.activePosition !== position) {
        this.removeEmptySection();
        this.activate(position);
      }
      if (
        this.openSlider &&
        this.activeSlider === "theme" &&
        this.$store.state.theme.appliedTo === "section"
      ) {
        if (this.activeSection.data.themeId) {
          this.activeSection.data.themeId = null;
        } else {
          this.activeSection.data.themeId = this.$store.state.theme.themeId;
        }
      }
    },
    carouselActive(position) {
      return (
        this.changeSectionInSameCategory &&
        this.activePosition === position &&
        this.carouselHeight &&
        this.carouselWidth
      );
    },
    updateCarouselSize(position) {
      if (position === "header") {
        this.carouselHeight = this.$refs.headerContainer?.clientHeight || 0;
        this.carouselWidth = this.$refs.headerContainer?.clientWidth || 0;
        if (this.carouselHeight < 300) {
          this.carouselHeight = 300;
        }
      } else if (position === "footer") {
        this.carouselHeight = this.$refs.footerContainer?.clientHeight || 0;
        this.carouselWidth = this.$refs.footerContainer?.clientWidth || 0;

        if (this.carouselHeight < 500) {
          this.carouselHeight = 500;
        }
      } else {
        this.carouselHeight =
          this.$refs["componentContainer" + position]?.[0]?.clientHeight || 0;
        this.carouselWidth =
          this.$refs["componentContainer" + position]?.[0]?.clientWidth || 0;
        if (this.carouselHeight < 800) {
          this.carouselHeight = 800;
        }
      }
    },
    getActiveElement() {
      let activeSectionElement;
      const position = this.activePosition;
      if (this.activePosition === "header") {
        activeSectionElement = this.$refs.headerContainer;
      } else if (this.activePosition === "footer") {
        activeSectionElement = this.$refs.footerContainer;
      } else {
        activeSectionElement = this.$refs.sectionRef[position];
      }
      return activeSectionElement;
    },
    animate() {
      this.$nextTick(() => {
        if (this.openSlider) {
          if (this.activeSlider === "sections") {
            this.$el.style.width = document.body.clientWidth - 850 + "px";
          } else if (this.activeSlider === "pages") {
            this.$el.style.width = document.body.clientWidth - 650 + "px";
          } else if (this.activeSlider === "theme") {
            this.$el.style.width = document.body.clientWidth - 750 + "px";
          }
        } else {
          this.$el.style.width = "100%";
        }
      });
    },
    sectionsWrapperStyle() {
      if (this.activeSlider !== "theme") {
        this.zoom = 1;
      }
      const translateX = (document.body.clientWidth / 2) * (1 - this.scale);
      return {
        "--window-width": document.body.clientWidth + "px",
        transform: `translateZ(0px) translateX(${-translateX}px) scale(${
          this.scale * this.zoom
        })`,
      };
    },
    getSectionsInCategory(categoryId) {
      let category = this.allCategories.find((item) => item.id === categoryId);
      if (!category) {
        category = this.moduleCategories.find((item) => item.id === categoryId);
      }
      if (category) {
        return category.sections || [];
      } else {
        console.error("Category does not exist");
      }
    },
    activate(position) {
      if (this.activePosition !== position) {
        this.activePosition = position;
        this.changeSectionInSameCategory = false;
      }
    },
    arrowAction(action) {
      if (action === "right") {
        if (this.activePosition === "header") {
          this.startIndexForCarousel =
            this.header.data.setting.layout % this.headerSections.length;
        } else if (this.activePosition === "footer") {
          this.startIndexForCarousel =
            this.footer.data.setting.layout % this.footerSections.length;
        } else {
          this.startIndexForCarousel =
            this.activeSection.data.setting.layout %
            this.getSectionsInCategory(this.activeSection.category_id).length;
        }
      } else {
        if (this.activePosition === "header") {
          this.startIndexForCarousel =
            (this.header.data.setting.layout + this.headerSections.length - 2) %
            this.headerSections.length;
        } else if (this.activePosition === "footer") {
          this.startIndexForCarousel =
            (this.footer.data.setting.layout + this.footerSections.length - 2) %
            this.footerSections.length;
        } else {
          const sectionsInCategory = this.getSectionsInCategory(
            this.activeSection.category_id
          );
          this.startIndexForCarousel =
            (this.activeSection.data.setting.layout +
              sectionsInCategory.length -
              2) %
            sectionsInCategory.length;
        }
      }
      this.changeSectionInSameCategory = true;
    },
    handleSlideClick({ index }) {
      const categorySections = this.getSectionsInCategory(
        this.activeSection.category_id
      );
      const newSection = categorySections[index];
      this.activeSection.data.setting = window._take(
        newSection.data.setting,
        this.activeSection.data.setting,
        ["layout", "columns", "alignments"]
      );
      this.activeSection.name = newSection.name;
      this.changeSectionInSameCategory = false;
    },
    handleHeaderSlideClick({ index }) {
      const newHeader = this.headerSections[index];
      this.header.data.setting = window._take(
        newHeader.data.setting,
        this.header.data.setting,
        ["layout", "columns", "alignments"]
      );
      this.header.name = newHeader.name;
      this.changeSectionInSameCategory = false;
    },
    handleFooterSlideClick({ index }) {
      const newFooter = this.footerSections[index];
      this.footer.data.setting = window._take(
        newFooter.data.setting,
        this.footer.data.setting,
        ["layout", "columns", "alignments"]
      );
      this.footer.name = newFooter.name;
      this.changeSectionInSameCategory = false;
    },
    upward(position) {
      const activeSection = this.$refs.sectionRef[position];
      const targetSection = this.$refs.sectionRef[position - 1];
      this.exchangeSection(activeSection, targetSection);
      setTimeout(() => {
        this.upwardSection(position);
        this.clearTransition(activeSection);
        this.clearTransition(targetSection);
      }, 400);
    },
    downward(position) {
      const activeSection = this.$refs.sectionRef[position];
      const targetSection = this.$refs.sectionRef[position + 1];
      this.exchangeSection(targetSection, activeSection);
      setTimeout(() => {
        this.downwardSection(position);
        this.clearTransition(activeSection);
        this.clearTransition(targetSection);
      }, 400);
    },
    clearTransition(section) {
      section.style.transition = "";
      section.style.transform = "";
    },
    exchangeSection(bottomSection, topSection) {
      bottomSection.style.transition = "0.5s";
      topSection.style.transition = "0.5s";
      bottomSection.style.transform = `translateY(-${
        topSection?.clientHeight || 0
      }px)`;
      topSection.style.transform = `translateY(${
        bottomSection?.clientHeight || 0
      }px)`;
    },
    remove(position) {
      this.deleting = true;
      this.removePosition = position;
      setTimeout(() => {
        this.removePosition = null;
        this.removeSection(position);
        this.deleting = false;
      }, 450);
    },
    scrollToActiveSection() {
      let offsetScrollTop = 149;
      const activeSectionElement = this.getActiveElement();

      if (activeSectionElement) {
        const position = this.activePosition;
        const activeHeight = activeSectionElement.clientHeight;

        if (position !== "header") {
          offsetScrollTop += this.$refs.headerContainer.clientHeight || 0;

          if (position !== "footer") {
            for (let i = 0; i < position; i++) {
              offsetScrollTop += this.$refs.sectionRef[i].clientHeight || 0;
            }
          }

          if (position === "footer") {
            for (let i = 0; i < this.sections.length; i++) {
              offsetScrollTop += this.$refs.sectionRef[i].clientHeight || 0;
            }
          }
        }
        const scrollTop =
          (offsetScrollTop + activeHeight / 2) * this.scale -
          window.innerHeight / 2;

        window.scrollTo({
          top: scrollTop,
          left: 0,
        });
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
        });
      }
    },
    /**
     * Mouse wheel event handler on the active page. The page should be able to zoom in/out with theme setting panel opened, so users can see full page color perspective.
     * @param e
     */
    handleMouseWheel(e) {
      if (this.activeSlider === "theme") {
        if (event.ctrlKey === true) {
          e.preventDefault();
          if (e.deltaY > 0) {
            if (this.zoom >= 1) {
              this.zoom = 1;
            } else {
              this.zoom *= 1.5;
            }
          } else {
            if (this.zoom <= 0.05) {
              this.zoom = 0.05;
            } else {
              this.zoom /= 1.5;
            }
          }
        }
      }
    },
    onMouseDown(e) {
      this.onDown(e);
      e.preventDefault();
    },
    onDown(e) {
      this.calc(e);
      this.isResizing = this.onBottomEdge;
      this.clicked = {
        y: this.y,
        cy: e.clientY,
        h: this.b.height,
        isResizing: this.isResizing,
        onBottomEdge: this.onBottomEdge,
      };
    },
    calc(e) {
      const activeSectionElement = this.getActiveElement();
      if (activeSectionElement) {
        this.b = activeSectionElement.getBoundingClientRect();
        this.y = e.clientY - this.b.top;
        this.onBottomEdge = Math.abs(this.y - this.b.height) < 10;
      }
    },
    onMouseMove(e) {
      this.calc(e);
      this.redraw = true;
      this.animate2(e);
    },
    onMouseUp(e) {
      this.calc(e);
      this.clicked = null;
      this.isResizing = false;
    },
    animate2(e) {
      requestAnimationFrame(this.animate2);
      if (!this.redraw) return;
      this.redraw = false;
      if (this.clicked && this.clicked.isResizing) {
        this.activeBackground.size =
          Math.max(this.y, this.minHeight || 50) / this.scale;
      }
      if (this.onBottomEdge) {
        this.$el.style.cursor = "ns-resize";
      } else {
        this.$el.style.cursor = "default";
      }
    },
    ...mapMutations({
      removeSection: "removeSection",
      upwardSection: "upward",
      downwardSection: "downward",
      updateLayout: "updateLayout",
    }),
  },
};
</script>

<style lang="scss">
$active: #0076df;
$dark_active: #0067c1;
$danger: darkred;
.main_content_area {
  padding: 30px;
  display: flex;
  border-radius: 4px;
  flex-direction: column;
  min-height: calc(100vh - 60px);
  width: 100%;
  margin-left: auto;

  .sections-wrapper {
    --window-width: 100vw;
    width: var(--window-width);
    transform-origin: center top;
    transition: transform 0.3s linear;
    background-size: calc(16px / var(--bz-content-scale))
      calc(16px / var(--bz-content-scale));
    background-image: conic-gradient(
      white 0deg,
      white 90deg,
      #cccccc 90deg,
      #cccccc 180deg,
      white 180deg,
      white 270deg,
      #cccccc 270deg
    );
    background-repeat: repeat;
  }

  &::-webkit-scrollbar {
    width: 2px;
  }

  .page-browser-bar {
    margin-bottom: 4px;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    height: calc(35px / var(--bz-content-scale));

    .fake-browser-bar {
      width: 100%;
      height: 100%;
      background-color: white;
      display: flex;
      padding: 0 15px;
      align-items: center;

      .fake-browser-menu {
        display: flex;
        align-items: center;
        height: 100%;

        .item {
          height: calc(12px / var(--bz-content-scale));
          width: calc(12px / var(--bz-content-scale));
          border-radius: 50%;
          background-color: rgb(229, 229, 229);
          margin-right: 8px;
        }
      }

      .fake-browser-input {
        height: calc(28px / var(--bz-content-scale));
        display: flex;
        flex: 1 1 0;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
        background-color: rgb(246, 246, 246);
        border: 1px solid rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        padding: 0 12px;
        width: calc(100% - 200px);
        font-size: calc(14px / var(--bz-content-scale));

        span {
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 100%;
          overflow: hidden;
        }
      }
    }
  }

  &.sm_view {
    max-width: 900px;
  }

  &.mobile_view {
    max-width: 500px !important;
  }

  .empty_section {
    width: 100%;
    min-height: 576px;
    border: 5px dotted #ffffff;
    font-size: 36px;
    color: $active;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;

    &:hover {
      background-color: #fff;
      border: 5px dotted #333333;
      z-index: 2;
    }
  }

  .between_section_area {
    width: 100%;
    height: 0;
    background-color: #fff;
    font-size: 18px;
    color: $active;
    text-align: center;
    padding: 0 20px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    border: 2px solid white;
    position: relative;
    z-index: 2;
    overflow: hidden;

    animation-name: slide-in;
    animation-duration: 0.4s;
    animation-fill-mode: forwards;

    &.active {
      animation-fill-mode: forwards;
      border: 2px solid $active;
      animation-name: slide-out;
      animation-duration: 0.4s;
    }

    @keyframes slide-in {
      from {
        height: calc(180px / var(--bz-content-scale));
      }
      to {
        height: 0;
      }
    }
    @keyframes slide-out {
      from {
        height: 0;
      }
      to {
        height: calc(180px / var(--bz-content-scale));
      }
    }

    button {
      transform: scale(calc(1 / var(--bz-content-scale)));
    }
  }

  .bz-component-container {
    border: 2px solid transparent;
    margin-top: -4px;
    position: relative;
    height: 100%;

    [class*="carousel-3d-container"] {
      position: unset !important;
    }

    .carousel-3d-slider {
      display: flex !important;
      align-items: center !important;
      transform: scale(0.8);
    }

    .carousel-3d-slide {
      top: unset !important;
      height: min-content !important;

      &.current {
        border: solid 3px $active !important;
      }
    }
  }
}

.bz-content-section {
  position: relative;
  height: min-content;

  &.remove {
    animation-name: remove;
    animation-duration: 0.5s;
  }

  @keyframes remove {
    from {
      height: 500px;
    }
    to {
      height: 0;
    }
  }

  &.bz-selected::after {
    content: "";
    display: block;
    position: absolute;
    box-shadow: rgb(0 0 0 / 24%) 0 1px 6px 0;
    pointer-events: none;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 3px solid rgb(0, 118, 223);
  }

  .active-content-overlay {
    &:before {
      content: "";
      position: absolute;
      display: block;
      box-shadow: rgb(0 0 0 / 24%) 0 1px 6px 0;
      pointer-events: none;
      border: 1px solid white;
      outline: rgb(0, 118, 223) solid 3px;
      height: calc(100% - var(--next-decorator-offset, 4px));
      inset: 0;
      z-index: 2;
    }

    .arrow_item {
      position: absolute;
      top: calc(50% - 12px);
      transform: translate(-50%, 0);
      border-radius: 50%;
      background-color: $active;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      * {
        color: white !important;
      }

      &:hover {
        background-color: $dark_active;
      }

      &.left_arrow {
        left: -20px;
      }

      &.right_arrow {
        right: -45px;
      }
    }

    .add_section {
      position: absolute;
      left: 50%;
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100px;
      padding: 2px;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
      background-color: $active;

      .add_section_txt {
        width: 0;
        font-size: 12px;
        font-weight: 400;
        overflow: hidden;
        white-space: nowrap;
        transition: 0.3s;
        color: white;
      }

      &:hover {
        background-color: $dark_active;
      }

      &:hover > .add_section_txt {
        width: 72px;
        margin-left: 4px;
        transition: width 0.3s;
        padding-right: 5px;
      }

      &.top_add {
        top: 0;
        transform: translate(-50%, -50%);
      }

      &.bottom_add {
        bottom: 0;
        transform: translate(-50%, 50%);
      }
    }

    .control_box {
      position: absolute;
      top: 10px;
      right: 15px;
      display: flex;
      background-color: $active;
      border-radius: 30px;
      z-index: 9;

      .control_item {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $active;
        width: 30px;
        border-radius: 50%;
        height: 30px;
        cursor: pointer;

        &:hover {
          background-color: $dark_active;
        }

        &.arrow_remove {
          background-color: $danger;
        }
      }
    }
  }
}
</style>
