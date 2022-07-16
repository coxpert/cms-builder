export default {
  data() {
    return {
      openMenu: false
    }
  },
  computed: {
    headerButtonColor() {
      return this.theme.primaryColor.brighten(30)
    },
    headerStyle() {
      return {
        backgroundColor: this.backgroundColor
      }
    },
    lineColor() {
      return this.textColor.brighten(80)
    }
  },
  watch: {
    setting: {
      deep: true,
      handler() {
        this.setBackground()
      }
    }
  },
  mounted() {
    this.setBackground()
  },
  methods: {
    toggleMenu() {
      if (!this.edit) {
        this.openMenu = !this.openMenu
      }
    },
    setBackground() {
      if (this.background.connectToSectionBelow) {
        document.documentElement.style.setProperty('--navigate-bar-height', this.$el.clientHeight + 'px')
      } else {
        document.documentElement.style.setProperty('--navigate-bar-height', '0px')
      }
    }
  }
}
