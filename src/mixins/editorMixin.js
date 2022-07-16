import componentMixin from './componentMixin'

export default {
  mixins: [componentMixin],
  props: {
    value: {
      required: true
    },
    left: {
      type: Number,
      default: 0
    },
    top: {
      type: Number,
      default: 0
    },
    button: {
      type: [HTMLElement],
      required: true
    }
  },
  created() {
    if (this.value) {
      if (typeof this.data !== 'undefined') {
        if (typeof this.value === 'object') {
          this.data = { ...this.data, ...this.value }
        }
      } else {
        this.data = this.value
      }
    }

    window.addEventListener('scroll', () => {
      this.$el.remove()
    })

    this.isIE =
      navigator.appName === 'Microsoft Internet Explorer' || (navigator.appName === 'Netscape' && /Trident\/.\*rv:([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent) !== null)
    this.isEdge = /Edge\/\d+/.exec(navigator.userAgent) !== null
    this.isMac = window.navigator.platform.toUpperCase().indexOf('MAC') >= 0
    this.isFF = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
  },
  data() {
    return {
      isIE: null,
      isEdge: null,
      isFF: null,
      isMac: null
    }
  },
  computed: {
    editableBackgroundColors() {
      const originalColors = {
        primaryColor: this.theme.primaryColor,
        secondaryColor: this.theme.secondaryColor,
        lightModeColor: this.theme.lightModeColor,
        darkModeColor: this.theme.darkModeColor
      }
      return this.filteredColors(originalColors)
    },
    editableColors() {
      const originalColors = {
        primaryColor: this.theme.primaryColor,
        secondaryColor: this.theme.secondaryColor,
        lightModeColor: this.theme.lightModeColor,
        darkModeColor: this.theme.darkModeColor,
        whiteColor: '#ffffff',
        blackColor: '#000000'
      }
      return this.filteredColors(originalColors)
    }
  },
  watch: {
    data(value) {
      this.$emit('input', value)
    }
  },
  methods: {
    handleOutsideClick(event) {
      if (!(this.button === event.target || this.button.contains(event.target))) {
        this.$el.remove()
      }
    },
    filteredColors(colors) {
      const brightNess = []
      const editableColors = []
      const brightNessOfBackgroundColor = window.getBrightness(this.backgroundColor)
      brightNess.push(brightNessOfBackgroundColor)
      for (const colorName in colors) {
        const b = window.getBrightness(colors[colorName])
        if (brightNess.every((item) => Math.abs(item - b) > 10)) {
          editableColors.push(colors[colorName])
        }
        brightNess.push(b)
      }
      return editableColors
    }
  }
}
