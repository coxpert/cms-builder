import { cloneDeep } from 'lodash'

export const sectionMutations = {
  insertSection(state, payload = {}) {
    const position = payload.position || 0
    const section = payload.section || null
    state.addPosition = position
    if (!state.pages[state.indexOfActivePage].sections) state.pages[state.indexOfActivePage].sections = []
    state.pages[state.indexOfActivePage].sections.insert(position, section)
    if (section === null) {
      state.openSlider = 'sections'
    }
  },
  setAddPosition(state, payload) {
    state.addPosition = payload
    if (state.addPosition === null) {
      const index = state.pages[state.indexOfActivePage].sections.indexOf(null)
      if (index > -1) {
        state.pages[state.indexOfActivePage].sections.splice(index, 1)
      }
    }
  },
  upward(state, payload) {
    let position = payload
    if (typeof payload === 'undefined') {
      position = state.activePosition
    }
    state.pages[state.indexOfActivePage].sections.swap(position, position - 1)
    state.pages = cloneDeep(state.pages)
  },
  downward(state, payload) {
    let position = payload
    if (typeof payload === 'undefined') {
      position = state.activePosition
    }
    state.pages[state.indexOfActivePage].sections.swap(position, position + 1)
    state.pages = cloneDeep(state.pages)
  },
  removeSection(state, payload) {
    let position = payload
    if (typeof payload === 'undefined') {
      position = state.activePosition
    }
    state.pages[state.indexOfActivePage].sections.splice(position, 1)
    if (state.pages[state.indexOfActivePage].sections.length === 0) {
      state.activePosition = 'header'
    }
  },
  setActivatePosition(state, payload) {
    state.activePosition = payload
  }
}
