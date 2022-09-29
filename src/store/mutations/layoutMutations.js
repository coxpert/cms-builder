export const layoutMutations = {
  setOpenSlider(state, payload) {
    state.openSlider = true;
    state.activeSlider = payload.sliderName;
    let tab = payload.activeTab || 0;
    if (typeof tab === "object") tab = 0;
    state.activeTab = tab;
    state.activeSubTab = payload.activeSubTab || "template-name";
    if (state.activeSlider !== "sections") {
      const index =
        state.pages[state.indexOfActivePage].sections?.indexOf(null);
      if (index > -1) {
        state.pages[state.indexOfActivePage].sections.splice(index, 1);
      }
      if (
        state.activePosition >=
        state.pages[state.indexOfActivePage].sections.length
      ) {
        state.activePosition =
          state.pages[state.indexOfActivePage].sections.length - 1;
      }
    }
  },
  updateLayout(state, payload) {
    state.panelArrow = payload;
  },
  setActiveCompanyIndex(state, payload) {
    state.activeCompanyIndex = payload;
  },
  closeSlider(state) {
    state.openSlider = false;
    const index = state.pages[state.indexOfActivePage].sections?.indexOf(null);
    setTimeout(() => {
      if (index > -1) {
        state.pages[state.indexOfActivePage].sections.splice(index, 1);
      }
      if (
        state.activePosition >=
        state.pages[state.indexOfActivePage].sections.length
      ) {
        state.activePosition =
          state.pages[state.indexOfActivePage].sections.length - 1;
      }
      state.edit = true;
    }, 300);
  },
  setViewMode(state, payload) {
    state.viewMode = payload;
  },
  enableEdit(state) {
    state.edit = true;
  },
  disableEdit(state) {
    state.edit = false;
  },
  layoutSetActiveTab(state, payload) {
    state.activeTab = payload;
  },
  layoutSetActiveSubTab(state, payload) {
    state.activeSubTab = payload;
  },
};