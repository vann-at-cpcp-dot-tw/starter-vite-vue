import { createStore } from 'vuex'

export default createStore({
  state: {
    lightbox: '',
  },
  actions: {
  },
  mutations: {
    lightbox(state, which){
      state.lightbox = which
    },
  }
})
