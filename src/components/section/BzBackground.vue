<template>
  <div class="bz-el-background-root">
    <template v-if="!(setting.connectToSectionBelow && activeSections.length)">
      <div class="bz-background-content" :style="backgroundStyle()" :class="{ 'expand-to-header': position === 0 }">
        <video v-if="backgroundType === 'video' && options.video" ref="backgroundVideo" autoplay loop muted>
          <source :src="imageHost + '/images/videos/' + options.video + '.mp4'" type="video/mp4" />
        </video>
        <div v-if="backgroundType === 'image' || pattern" class="background-image-base" :style="backgroundStyle()">
          <div v-if="options.animation === 'parallax'" class="background-parallax-container">
            <div class="background-image" :class="{ pattern, [options.patternName]: true, image: backgroundType === 'image' && options.image }" :style="backgroundImageStyle()" />
          </div>
          <div v-else class="background-image" :class="backgroundImageClasses" :style="backgroundImageStyle()" />
        </div>
        <div v-if="options.overlay" class="background-over-layer" :style="backgroundOverlayStyle()" />
      </div>
    </template>
    <div class="w-100 h-100 position-relative">
      <template v-if="edit">
        <bz-section-size v-if="size" :section-size="size">
          <slot />
        </bz-section-size>
        <slot v-else />
      </template>
      <template v-else>
        <vue-aos :animation-class="theme.animation ? 'animate__animated ' + bzAnimationClass : ''">
          <bz-section-size v-if="size" :section-size="size">
            <slot />
          </bz-section-size>
          <slot v-else />
        </vue-aos>
      </template>
    </div>
  </div>
</template>

<script>
import BzSectionSize from './BzSectionSize'
import elementMixin from '../../mixins/elementMixin'

export default {
  name: 'BzBackground',
  components: { BzSectionSize },
  mixins: [elementMixin],
  props: {
    setting: {
      type: [Object, Array],
      default: () => {
        return {}
      }
    },
    size: {
      type: String,
      default: ''
    },
    bzAnimationClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      defaultOptions: {
        type: 'color',
        animation: 'none'
      }
    }
  },
  computed: {
    options() {
      return { ...this.defaultOptions, ...this.setting }
    },
    backgroundType() {
      return this.options.type || 'color'
    },
    pattern() {
      return this.backgroundType === 'color' && this.options.pattern && this.options.patternName
    },
    backgroundImageClasses() {
      return { pattern: this.pattern, [this.options.animation]: true, [this.backgroundType]: true }
    },
    themeBgColor() {
      return this.theme.mode === 'light' ? this.theme.lightModeColor : this.theme.darkModeColor
    }
  },
  watch: {
    options: {
      deep: true,
      handler(value, oldValue) {
        if (value.video !== oldValue.video) {
          this.$nextTick(function () {
            if (this.$refs.backgroundVideo) {
              this.$refs.backgroundVideo.setAttribute('src', '/images/videos/' + this.options.video + '.mp4')
              this.$refs.backgroundVideo.load()
              this.$refs.backgroundVideo.play()
            }
          })
        }
      }
    }
  },
  methods: {
    backgroundStyle() {
      if (this.setting.connectToSectionBelow) {
        if (this.edit) {
          if (this.activeSections.length) {
            return {
              backgroundColor: 'transparent'
            }
          }
        } else {
          return {
            backgroundColor: 'transparent'
          }
        }
      }
      if (this.backgroundType === 'color' || (this.backgroundType === 'image' && !this.options.image) || (this.backgroundType === 'video' && !this.options.video)) {
        const backgroundColor = this.backgroundColor || this.themeBgColor
        return { backgroundColor }
      }
      return { backgroundColor: 'white' }
    },
    backgroundOverlayStyle() {
      if (this.options.overlay) {
        const opacity = (this.options.overlayOpacity || 0) / 100
        const backgroundColor = this.setting.overlayColor || this.themeBgColor
        return { backgroundColor, opacity }
      }
      return null
    },
    backgroundImageStyle() {
      const backgroundColor = this.backgroundColor || this.themeBgColor

      if (this.backgroundType === 'color') {
        let opacity = 1
        opacity = this.options.patternStrength / 100
        if (this.options.pattern && this.options.patternName) {
          return {
            opacity,
            backgroundImage: `url(${this.imageHost}/images/pattern/${this.options.patternName}.svg)`
          }
        }
      } else if (this.backgroundType === 'image' && this.options.image) {
        const url = this.options.image
        // if (!url.includes('http')) url = this.imageHost + url
        return {
          backgroundImage: `url(${url})`
        }
      }
      return { backgroundColor }
    }
  }
}
</script>

<style lang="scss">
.bz-el-background-root {
  width: 100%;
  height: inherit;
  position: relative;

  .bz-background-content {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;

    &.expand-to-header {
      top: calc(-1 * var(--navigate-bar-height, 0px));
    }

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 0;
    }

    .background-image-base {
      width: 100%;
      height: 100%;
      z-index: 1;
      overflow: hidden;

      .background-image {
        width: 100%;
        height: 100%;

        &.image {
          background-position: center center;
          background-repeat: no-repeat;

          &.animate {
            background-size: cover;
          }
        }

        &.none {
          background-size: cover;
        }

        &.contain {
          background-size: contain;
        }

        &.fixed {
          background-size: cover;
          background-attachment: fixed;
        }

        &.pattern {
          background-size: unset;
          background-position: unset;
          background-repeat: repeat;

          &.pattern5 {
            background-size: 48px 48px !important;
          }
          &.pattern6 {
            background-size: 16px 16px !important;
          }
        }

        &.animate {
          animation: 60s linear animateImage;
          transform-origin: center center;
          animation-iteration-count: infinite;
        }

        @keyframes animateImage {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(2);
          }
        }
      }

      .background-parallax-container {
        transform: scale(1.4) translate3d(0px, 3.99808%, 0px);
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-repeat: no-repeat;
        background-attachment: scroll;
        background-position: center center;
        background-size: cover;

        .background-image {
          background-attachment: scroll;
          background-position: center center;

          &.image {
            background-size: cover;
          }
        }
      }
    }

    .background-over-layer {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }
  }
}
</style>
