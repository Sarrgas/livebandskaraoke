import Vue from 'vue'
import Vuex from 'vuex'
import { getSongs, getSongrequests, getTimeStamp, submitSongrequest, removeSongrequest } from '../db/db';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songList: [],
    trackedSongrequests: [],
    allSongrequests: []
  },
  mutations: {
    trackSongrequest(state, songrequest){
      state.trackedSongrequests.push(songrequest);
    },
    removeSongrequest(state, songrequest){
      let index = state.trackedSongrequests.findIndex(i => i.id == songrequest.id);
      state.trackedSongrequests.splice(index, 1);
    },
    addSong(state, song){
      state.songList.push(song);
    },
    addToAllSongrequests(state, songrequest){
      state.allSongrequests.push(songrequest);
    },
    removeFromAllSongrequests(state, songrequest){
      let index = state.allSongrequests.findIndex(i => i.id == songrequest.id);
      state.allSongrequests.splice(index, 1);
    },
  },
  getters: {
    getSortedSongrequestList(state){
      return state.allSongrequests.sort((a, b) => {
        return a.timestamp < b.timestamp ? -1 : a.timestamp > b.timestamp ? 1 : 0;
      })
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

      getSongrequests().onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          console.log(change, change.doc.data());

          const songrequest = {
            id: change.doc.id,
            timestamp: change.doc.data().timestamp
          } 
          if (change.type === 'removed') {
            commit('removeFromAllSongrequests', songrequest);
          }

          if (change.type === 'added') {
            commit('addToAllSongrequests', songrequest)
          }
        });
      });
    },
    submit({commit}, songrequest){
      const timestamp = getTimeStamp();
      let timestampedSongrequest = {
        ...songrequest,
        timestamp
      };
      submitSongrequest(timestampedSongrequest).then(newdoc => {
        newdoc.get().then(doc => {
          console.log('DB responded with: ', doc.id, doc.data());
          commit('trackSongrequest', {...timestampedSongrequest, id: doc.id});
        })
      });
    },
    removeSongrequestFromQueue({commit}, songrequest){
      commit('removeSongrequest', songrequest);
      removeSongrequest(songrequest);
    }
  }
})
