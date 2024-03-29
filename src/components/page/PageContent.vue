<template>
  <div v-if="activePage" id="main_content" ref="mainContent" class="main_content_area bz-page" :class="{ mobile_view: viewMode === 'mobile' }">
    <div v-if="template" class="sections-wrapper" :class="{ [activeSlider]: true, openSlider }" :style="sectionsWrapperStyle()">
      <header class="page-browser-bar">
        <div class="fake-browser-bar">
          <div class="fake-browser-menu">
            <div class="item" />
            <div class="item" />
            <div class="item" />
          </div>
          <div class="fake-browser-input">
            <span v-if="viewMode === 'desktop'">
              {{ activePageUrl }}
            </span>
          </div>
          <div class="ml-3 cursor-pointer">
            <ZoomOut fill-color="#0076df" />
          </div>
        </div>
      </header>
      <div class="bz-content-section" style="z-index: 2" :class="{ active: activePosition === 'header' }">
        <div class="h-100" @click="activate('header')">
          <section ref="headerContainer" class="bz-component-container" :class="{ active: activePosition === 'header' }">
            <section v-if="carouselActive('header')" class="bz-component-container cursor-pointer">
              <bz-carousel
                :height="carouselHeight"
                :width="carouselWidth"
                :start-index="startIndexForCarousel"
                :on-main-slide-click="handleHeaderSlideClick"
                :sections="headerSections"
                :current-section="header"
              />
            </section>
            <template v-else>
              <component :is="header.name" :edit="true" :properties="header" />
              <div v-if="activePosition === 'header'" class="active-content-overlay">
                <div class="add_section bottom_add" @click.prevent="appendSection()">
                  <bz-plus-icon :size="20" fill-color="white" />
                  <span class="add_section_txt">Add Section </span>
                </div>
                <span class="left_arrow arrow_item" @click.prevent="arrowAction('left')">
                  <bz-arrow-left-icon fill-color="white" />
                </span>
                <span class="right_arrow arrow_item" @click.prevent="arrowAction('right')">
                  <bz-arrow-right-icon fill-color="white" />
                </span>
              </div>
            </template>
          </section>
        </div>
      </div>
      <template v-if="sections.length">
        <div
          v-for="(section, position) in sections"
          :key="position"
          ref="sectionRef"
          class="bz-content-section"
          :class="{ remove: removePosition === position, active: activePosition === position }"
        >
          <div v-if="section === null" class="between_section_area" :class="{ active: openSlider }">To add, click on a section in the sections bar on the left</div>
          <div v-else class="h-100" @click="activate(position)">
            <section v-if="carouselActive(position)" class="bz-component-container cursor-pointer">
              <bz-carousel
                :height="carouselHeight"
                :width="carouselWidth"
                :start-index="startIndexForCarousel"
                :on-main-slide-click="handleSlideClick"
                :sections="getSectionsInCategory(section.category_id)"
                :current-section="section"
              />
            </section>
            <section v-else :ref="'componentContainer' + position" class="bz-component-container" :class="{ active: activePosition === position }">
              <div class="w-100 h-100" :class="{ 'overflow-hidden': changeSectionInSameCategory || deleting }">
                <component :is="section.name" :edit="true" :properties="section" :position="position" />
              </div>
              <div v-if="position === activePosition" class="active-content-overlay">
                <div class="control_box">
                  <span v-if="position > 0" class="arrow_top control_item" @click.prevent="upward(position)">
                    <bz-arrow-up-icon fill-color="white" />
                  </span>
                  <span v-if="position < sections.length - 1" class="arrow_bottom mx-1 control_item" @click.prevent="downward(position)">
                    <bz-arrow-down-icon fill-color="white" />
                  </span>
                  <span class="arrow_remove control_item" @click.prevent="remove(position)">
                    <bz-delete-icon fill-color="white" />
                  </span>
                </div>
                <template v-if="!hasEmptySection">
                  <div class="add_section top_add" @click.prevent="prependSection()">
                    <bz-plus-icon :size="20" fill-color="white" />
                    <span class="add_section_txt"> Add Section</span>
                  </div>
                  <div class="add_section bottom_add" @click.prevent="appendSection()">
                    <bz-plus-icon :size="20" fill-color="white" />
                    <span class="add_section_txt"> Add Section </span>
                  </div>
                </template>
                <span class="left_arrow arrow_item" @click.prevent="arrowAction('left')">
                  <bz-arrow-left-icon fill-color="white" />
                </span>
                <span class="right_arrow arrow_item" @click.prevent="arrowAction('right')">
                  <bz-arrow-right-icon fill-color="white" />
                </span>
              </div>
            </section>
          </div>
        </div>
      </template>
      <div ref="footerContainer" class="bz-content-section" :class="{ active: activePosition === 'footer' }">
        <div class="h-100" @click="activate('footer')">
          <section v-if="carouselActive('footer')" class="bz-component-container cursor-pointer">
            <bz-carousel
              :height="carouselHeight"
              :width="carouselWidth"
              :start-index="startIndexForCarousel"
              :on-main-slide-click="handleFooterSlideClick"
              :sections="footerSections"
              :current-section="footer"
            />
          </section>
          <template v-else>
            <section ref="footerContainer" class="bz-component-container">
              <component :is="footer.name" :edit="true" :properties="footer" />
              <div v-if="activePosition === 'footer'" class="active-content-overlay" :class="{ active: activePosition === 'footer' }">
                <div class="add_section top_add" @click.prevent="appendSection()">
                  <bz-plus-icon :size="20" fill-color="white" />
                  <span class="add_section_txt">Add Section </span>
                </div>
                <span class="left_arrow arrow_item" @click.prevent="arrowAction('left')">
                  <bz-arrow-left-icon fill-color="white" />
                </span>
                <span class="right_arrow arrow_item" @click.prevent="arrowAction('right')">
                  <bz-arrow-right-icon fill-color="white" />
                </span>
              </div>
            </section>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import ZoomOut from '../icons/ZoomOut'
import BzCarousel from './BzCarousel3d'
import BzPlusIcon from '../icons/Plus'
import BzArrowRightIcon from '../icons/ArrowRight'
import BzArrowLeftIcon from '../icons/ArrowLeft'
import BzArrowDownIcon from '../icons/ArrowDown'
import BzArrowUpIcon from '../icons/ArrowUp'
import BzDeleteIcon from '../icons/Delete'
import componentMixin from '../../mixins/componentMixin'

export default {
  components: {
    BzDeleteIcon,
    BzArrowUpIcon,
    BzArrowDownIcon,
    BzArrowLeftIcon,
    BzArrowRightIcon,
    BzPlusIcon,
    BzCarousel,
    ZoomOut
  },
  mixins: [componentMixin],
  data() {
    return {
      changeSectionInSameCategory: false,
      carouselHeight: 0,
      carouselWidth: 0,
      removePosition: null,
      deleting: false,
      zoom: 1,
      startIndexForCarousel: 0
    }
  },
  computed: {
    sections() {
      return this.activeSections
    },
    hasEmptySection() {
      const indexOfEmptySection = this.sections.findIndex((section) => section === null)
      return indexOfEmptySection > -1
    },
    activePageUrl() {
      let url = this.activePage.url
      if (typeof url === 'object') url = ''
      if (this.template.domain) {
        return `${this.template.domain}/${url || ''}`
      }
      return `${window.appURL}/preview/${this.template.slug}/${url || ''}`
    }
  },
  watch: {
    panelArrow(action) {
      if (action && !this.carouselActive(this.activePosition)) {
        this.arrowAction(action)
        this.updateLayout('')
      }
    },
    openSlider: {
      immediate: true,
      handler() {
        this.animate()
      }
    },
    activeSlider: {
      immediate: true,
      handler() {
        this.animate()
      }
    },
    activePosition(position) {
      if (position != null) {
        this.$nextTick(() => {
          this.updateCarouselSize(position)
        })
      }
    },
    changeSectionInSameCategory(val) {
      if (!val) {
        this.$nextTick(() => {
          this.updateCarouselSize(this.activePosition)
        })
      }
    }
  },
  mounted() {
    const self = this
    window.addEventListener('scroll', function (e) {
      if (e.target.scrollingElement) {
        const scrollTop = e.target.scrollingElement.scrollTop
        let offsetTop = 0
        if (self.$refs.sectionRef && self.$refs.sectionRef.length) {
          self.$refs.sectionRef.forEach((ref, index) => {
            offsetTop = ref.offsetTop
            if (scrollTop <= offsetTop && offsetTop < scrollTop + window.innerHeight / 6) {
              self.activate(index)
            }
          })
        }
        if (scrollTop > offsetTop) {
          self.activate('footer')
        }
      }
    })
    this.updateCarouselSize('header')
  },
  methods: {
    carouselActive(position) {
      return this.changeSectionInSameCategory && this.activePosition === position && this.carouselHeight && this.carouselWidth
    },
    updateCarouselSize(position) {
      if (position === 'header') {
        this.carouselHeight = this.$refs.headerContainer?.clientHeight || 0
        this.carouselWidth = this.$refs.headerContainer?.clientWidth || 0
      } else if (position === 'footer') {
        this.carouselHeight = this.$refs.footerContainer?.clientHeight || 0
        this.carouselWidth = this.$refs.footerContainer?.clientWidth || 0
      } else {
        this.carouselHeight = this.$refs['componentContainer' + position][0]?.clientHeight || 0
        this.carouselWidth = this.$refs['componentContainer' + position][0]?.clientWidth || 0
      }
    },
    animate() {
      if (this.showSettingPanel) {
        if (this.activeSlider === 'sections') {
          this.zoom = this.openSlider ? (window.innerWidth - 991) / (window.innerWidth - 491) : 1
        } else if (this.activeSlider === 'pages') {
          this.zoom = this.openSlider ? (window.innerWidth - 791) / (window.innerWidth - 491) : 1
        }
      } else {
        if (this.activeSlider === 'sections') {
          this.zoom = this.openSlider ? (window.innerWidth - 671) / (window.innerWidth - 171) : 1
        } else if (this.activeSlider === 'pages') {
          this.zoom = this.openSlider ? (window.innerWidth - 471) / (window.innerWidth - 171) : 1
        }
      }
      if (this.sections.length > 1) {
        setTimeout(() => {
          const position = this.activePosition
          let scrollTop
          let offsetScrollTop = 0

          const activeHeight = this.$refs.sectionRef[position]?.clientHeight || 0

          if (this.$refs.sectionRef[position]) {
            for (let i = 0; i < position; i++) {
              offsetScrollTop += this.$refs.sectionRef[i]?.clientHeight || 0
            }
            scrollTop = (offsetScrollTop + activeHeight / 2) * this.zoom - (window.innerHeight / 2 - 110)
          } else if (position === 'footer') {
            for (let i = 0; i < this.sections.length; i++) {
              offsetScrollTop += this.$refs.sectionRef[i]?.clientHeight || 0
            }
            scrollTop = (offsetScrollTop + activeHeight / 2) * this.zoom - (window.innerHeight / 2 - 110)
          } else {
            for (let i = 0; i <= position; i++) {
              offsetScrollTop += this.$refs.sectionRef[i]?.clientHeight || 0
            }
            scrollTop = (offsetScrollTop + activeHeight / 2) * this.zoom - (window.innerHeight / 2 - 110)
          }

          window.scrollTo({
            top: scrollTop,
            left: 0,
            behavior: 'smooth'
          })
        }, 600)
      }
    },
    sectionsWrapperStyle() {
      if (this.openSlider) {
        return {
          transform: `translateZ(0px) scale(${this.zoom})`,
          transition: 'linear 0.8s',
          transformOrigin: 'right top',
          transitionDelay: '0.4s'
        }
      }
      return ''
    },
    getSectionsInCategory(categoryId) {
      return this.allCategories.find((item) => item.id === categoryId).sections || []
    },
    activate(position) {
      if (this.activePosition !== position) {
        this.activePosition = position
        this.changeSectionInSameCategory = false
      }
    },
    arrowAction(action) {
      if (action === 'right') {
        if (this.activePosition === 'header') {
          this.startIndexForCarousel = this.header.data.setting.layout % this.headerSections.length
        } else if (this.activePosition === 'footer') {
          this.startIndexForCarousel = this.footer.data.setting.layout % this.footerSections.length
        } else {
          this.startIndexForCarousel = this.activeSection.data.setting.layout % this.getSectionsInCategory(this.activeSection.category_id).length
        }
      } else {
        if (this.activePosition === 'header') {
          this.startIndexForCarousel = (this.header.data.setting.layout + this.headerSections.length - 2) % this.headerSections.length
        } else if (this.activePosition === 'footer') {
          this.startIndexForCarousel = (this.footer.data.setting.layout + this.footerSections.length - 2) % this.footerSections.length
        } else {
          const sectionsInCategory = this.getSectionsInCategory(this.activeSection.category_id)
          this.startIndexForCarousel = (this.activeSection.data.setting.layout + sectionsInCategory.length - 2) % sectionsInCategory.length
        }
      }
      this.changeSectionInSameCategory = true
    },
    handleSlideClick({ index }) {
      const categorySections = this.getSectionsInCategory(this.activeSection.category_id)
      const newSection = categorySections[index]
      this.activeSection.data.setting = window._take(newSection.data.setting, this.activeSection.data.setting, ['layout', 'columns', 'alignments'])
      this.activeSection.name = newSection.name
      this.changeSectionInSameCategory = false
    },
    handleHeaderSlideClick({ index }) {
      const newHeader = this.headerSections[index]
      this.header.data.setting = window._take(newHeader.data.setting, this.header.data.setting, ['layout', 'columns', 'alignments'])
      this.header.name = newHeader.name
      this.changeSectionInSameCategory = false
    },
    handleFooterSlideClick({ index }) {
      const newFooter = this.footerSections[index]
      this.footer.data.setting = window._take(newFooter.data.setting, this.footer.data.setting, ['layout', 'columns', 'alignments'])
      this.footer.name = newFooter.name
      this.changeSectionInSameCategory = false
    },
    upward(position) {
      const activeSection = this.$refs.sectionRef[position]
      const targetSection = this.$refs.sectionRef[position - 1]
      this.exchangeSection(activeSection, targetSection)
      setTimeout(() => {
        this.upwardSection(position)
        this.clearTransition(activeSection)
        this.clearTransition(targetSection)
      }, 400)
    },
    downward(position) {
      const activeSection = this.$refs.sectionRef[position]
      const targetSection = this.$refs.sectionRef[position + 1]
      this.exchangeSection(targetSection, activeSection)
      setTimeout(() => {
        this.downwardSection(position)
        this.clearTransition(activeSection)
        this.clearTransition(targetSection)
      }, 400)
    },
    clearTransition(section) {
      section.style.transition = ''
      section.style.transform = ''
    },
    exchangeSection(bottomSection, topSection) {
      bottomSection.style.transition = '0.5s'
      topSection.style.transition = '0.5s'
      bottomSection.style.transform = `translateY(-${topSection?.clientHeight || 0}px)`
      topSection.style.transform = `translateY(${bottomSection?.clientHeight || 0}px)`
    },
    remove(position) {
      this.deleting = true
      this.removePosition = position
      setTimeout(() => {
        this.removePosition = null
        this.removeSection(position)
        this.deleting = false
      }, 450)
    },
    ...mapMutations({
      removeSection: 'removeSection',
      upwardSection: 'upward',
      downwardSection: 'downward',
      updateLayout: 'updateLayout'
    })
  }
}
</script>

<style lang="scss">
$active: #0076df;
$dark_active: #0067c1;
$danger: darkred;
.main_content_area {
  padding: 50px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px);
  transition: 0.8s ease-in-out;
  transition-delay: 0.1s;
  width: 100%;

  &::-webkit-scrollbar {
    width: 2px;
  }

  .page-browser-bar {
    border: solid 2px white;
    margin-bottom: 4px;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;

    .fake-browser-bar {
      width: 100%;
      height: 35px;
      background-color: white;
      display: flex;
      padding: 0 15px;
      align-items: center;

      .fake-browser-menu {
        display: flex;
        align-items: center;
        height: 100%;

        .item {
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background-color: rgb(229, 229, 229);
          margin-right: 8px;
        }
      }

      .fake-browser-input {
        height: 28px;
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
        height: 200px;
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
        height: 200px;
      }
    }
  }

  .bz-component-container {
    border: 2px solid transparent;
    margin-top: -4px;
    position: relative;
    height: 100%;

    [class*='carousel-3d-container'] {
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

  .sections-wrapper {
    width: 100%;
    transition: 0.8s;
    transition-delay: 0.4s;

    &.openSlider {
      .empty_section {
        border: 3px solid $active;
        transition-delay: 0.1s;
        transition: 0.4s;
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
    content: '';
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
      content: '';
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

      &:hover {
        background-color: $dark_active;
      }

      &.left_arrow {
        left: -20px;
      }

      &.right_arrow {
        right: -50px;
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
