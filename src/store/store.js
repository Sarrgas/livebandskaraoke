import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songList: [
      'Skkobido',
      'Mullvadens återkomst',
      'Smurfhits klassiker',
      "Elvis Costello - What's so Funny About Peace Love and Understanding"
    ],
    registrations: []
  },
  mutations: {
    trackRegistration(state, registration){
      state.registrations.push(registration);
    },
    removeRegistration(state, registration){
      let index = state.registrations.indexOf(registration.song);
      state.registrations.splice(index, 1);
    }
  },
  actions: {

  }
})
