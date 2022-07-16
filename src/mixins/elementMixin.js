import componentMixin from './componentMixin'
import { mapMutations } from 'vuex'

export default {
  mixins: [componentMixin],
  props: {
    value: {
      type: [Object, String, Boolean, Number, Array, Date, undefined],
      default: undefined
    },
    textColor: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      color: 'black',
      dividerColor: '#808080',
      uuid: null
    }
  },
  computed: {
    edit() {
      return this.$parent.edit
    },
    position() {
      return this.$parent.position
    },
    backgroundColor() {
      if (this.$parent && this.$parent.backgroundColor) {
        return this.$parent.backgroundColor
      }
      if (this.$props.backgroundColor) {
        return this.$props.backgroundColor
      }
      return '#ffffff'
    },
    data: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    backgroundColor: {
      immediate: true,
      handler(value) {
        if (this.textColor) {
          this.color = this.textColor
        } else {
          this.color = this.getTextColor(value, this.theme.primaryColor)
        }
        const originalColor = window.tinycolor(this.color)
        this.dividerColor = originalColor.brighten(50).toString()
      }
    }
  },
  created() {
    this.uuid = this.$uuid.v4()
  },
  methods: {
    ...mapMutations({
      openAttachLink: 'openAttachLink'
    })
  }
}
