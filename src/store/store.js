import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songList: [
      'Skkobido',
      'Mullvadens återkomst',
      'Smurfhits klassiker'
    ],
    registrations: []
  },
  mutations: {
    trackRegistration(state, registration){
      state.registrations.push(registration);
    }
  },
  actions: {

  }
})
