export const navbar = {
  namespaced: true,
  state: {
    isOpen: false
  },

  actions: {
    toggleNavbar({commit }) {
      commit('TOGGLE_NAVBAR');
    },
  },

  mutations: {
    TOGGLE_NAVBAR(state) {
      state.isOpen = !state.isOpen;
    },
  }
}

