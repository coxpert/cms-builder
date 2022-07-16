export const layoutMutations = {
  setOpenSlider(state, payload) {
    state.openSlider = true
    state.activeSlider = payload.sliderName
    let tab = payload.activeTab || 0
    if (typeof tab === 'object') tab = 0
    state.activeTab = tab
    state.activeSubTab = payload.activeSubTab || 'template-name'
  },
  updateLayout(state, payload) {
    state.panelArrow = payload
  },
  setActiveCompanyIndex(state, payload) {
    state.activeCompanyIndex = payload
  },
  closeSlider(state) {
    state.openSlider = false
    const index = state.pages[state.indexOfActivePage].sections?.indexOf(null)
    setTimeout(() => {
      if (index > -1) {
        state.pages[state.indexOfActivePage].sections.splice(index, 1)
      }
      state.activeSlider = 'sections'
      state.edit = true
    }, 400)
  },
  setViewMode(state, payload) {
    state.viewMode = payload
  },
  enableEdit(state) {
    state.edit = true
  },
  disableEdit(state) {
    state.edit = false
  },
  layoutSetActiveTab(state, payload) {
    state.activeTab = payload
  },
  layoutSetActiveSubTab(state, payload) {
    state.activeSubTab = payload
  }
}
