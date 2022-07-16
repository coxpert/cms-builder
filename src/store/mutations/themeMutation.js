export const themeMutation = {
  updateTheme: (state, payload) => {
    state.theme = window._copy(payload)
  }
}
