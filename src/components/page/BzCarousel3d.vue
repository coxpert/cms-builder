<template>
  <div class="bz-el-carousel-3d-root">
    <carousel
      ref="carousel"
      :start-index="startIndex"
      :animation-speed="600"
      :controls-visible="true"
      :controls-prev-html="`<svg style='position:absolute; background-color: #0076df; border-radius: 50%; right: 75px; top: 20px' width='24' height='24' viewBox='0 0 24 24' fill='white'><path d='M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z'/></svg>`"
      :controls-next-html="`<svg style='position:absolute; background-color: #0076df; border-radius: 50%; left: 75px; top: 20px' width='24' height='24' viewBox='0 0 24 24' fill='white'><path d='M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z'/></svg>`"
      :on-main-slide-click="onMainSlideClick"
      :display="3"
      :perspective="1"
      :height="height"
      :width="width"
    >
      <slide v-for="(categorySection, index) of sections" :key="index" :index="index">
        <div style="pointer-events: none" :style="{ width: width + 'px' }">
          <component :is="categorySection.name" :properties="{ ...categorySection, data: { ...categorySection.data, data: currentSection.data.data } }" :preview="true" />
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel3d as Carousel, Slide } from 'vue-carousel-3d'
import { mapMutations } from 'vuex'

export default {
  name: 'BzCarousel3d',
  components: {
    Carousel,
    Slide
  },
  props: {
    onMainSlideClick: {
      type: Function,
      default: () => {}
    },
    height: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    startIndex: {
      type: Number,
      default: 0
    },
    sections: {
      type: Array,
      default: () => {
        return []
      }
    },
    currentSection: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    sectionContentStyle() {
      return {
        width: this.width + 'px',
        height: this.height + 'px'
      }
    },
    panelArrow() {
      return this.$store.state.panelArrow
    }
  },
  watch: {
    panelArrow(action) {
      if (action) {
        this.nextSlide(action)
        this.updateLayout('')
      }
    }
  },
  mounted() {
    console.log('BzCarousel.mounted', this.width)
  },
  methods: {
    nextSlide(action) {
      if (action === 'right') {
        console.log('this.$refs.carousel', this.$refs.carousel)
        this.$refs.carousel.goNext()
      } else {
        this.$refs.carousel.goPrev()
      }
    },
    ...mapMutations({
      updateLayout: 'updateLayout'
    })
  }
}
</script>

<style lang="scss" scoped>
.bz-el-carousel-3d-root {
  .section-wrapper {
    pointer-events: none;
    position: relative;
    background-color: rebeccapurple;
    display: flex;
    justify-content: center;
    align-items: center;

    .section-content {
      position: absolute;
    }
  }
}
</style>
