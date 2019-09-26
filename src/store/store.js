import Vue from 'vue'
import Vuex from 'vuex'
import { getSongs, getRegistrations } from '../db/db';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songList: [],
    registrations: []
  },
  mutations: {
    trackRegistration(state, registration){
      state.registrations.push(registration);
    },
    removeRegistration(state, registration){
      let index = state.registrations.indexOf(registration.song);
      state.registrations.splice(index, 1);
    },
    addSong(state, song){
      state.songList.push(song);
    }
  },
  actions: {
    init({commit}){
      getSongs().then(songs => {
        songs.docs.forEach(song => {
          let songdata = song.data();
          let songDisplayName = `${songdata.artist} - ${songdata.song}`;
          commit('addSong', songDisplayName);
        });
      });

      getRegistrations().onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          console.log(change);
          // Lyssna efter removed-event och räkna om tidsestimat.
        });
      });
    }
  }
})
