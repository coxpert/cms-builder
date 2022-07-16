import createModal from './createModal'

export default {
  install(Vue) {
    Vue.prototype.$dialog = {
      confirm: async ({ title, description } = {}) => {
        return createModal({
          title: title || 'Confirmation',
          description: description || 'Are you sure with this action?'
        })
      }
    }
  }
}
