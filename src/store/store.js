import Vue from 'vue'
import Vuex from 'vuex'
import { getSongs, getSongrequests, getTimeStamp, submitSongrequest, removeSongrequest } from '../db/db';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songList: [],
    trackedSongrequests: [],
    allSongrequests: [],
    firstname: '',
    lastname: '',
    song: ''
  },
  plugins: [createPersistedState({
    paths: ['trackedSongrequests']
  })],
  mutations: {
    trackSongrequest(state, songrequest){
      state.trackedSongrequests.push(songrequest);
    },
    removeSongrequest(state, songrequest){
      let index = state.trackedSongrequests.findIndex(i => i.id == songrequest.id);
      if (index) {
        state.trackedSongrequests.splice(index, 1);
      }
    },
    setSongs(state, songs){
      state.songList = songs;
    },
    addToAllSongrequests(state, songrequest){
      state.allSongrequests.push(songrequest);
    },
    removeFromAllSongrequests(state, songrequest){
      let index = state.allSongrequests.findIndex(i => i.id == songrequest.id);
      state.allSongrequests.splice(index, 1);
    },
    setFirstname(state, firstname){
      state.firstname = firstname;
    },
    setLastname(state, lastname){
      state.lastname = lastname;
    },
    setSong(state, song){
      state.song = song;
    }
  },
  getters: {
    getSortedSongrequestList(state){
      return state.allSongrequests.sort((a, b) => {
        return a.timestamp < b.timestamp ? -1 : a.timestamp > b.timestamp ? 1 : 0;
      })
    },
    getSongs(state){
      return state.songList;
    },
    getSongsDisplayName(state){
      return state.songList.map(song => song.displayName);
    }
  },
  actions: {
    init({commit}){
      getSongs().then(songs => {
        let songlist = [];
        songs.docs.forEach(song => {
          let songdata = song.data();
          let displayName = `${songdata.number}. ${songdata.artist} - ${songdata.song}`;
          songlist.push({...songdata, displayName});
        });
        const sortedSongList = songlist.sort((a, b) => {
          return a.number - b.number;
        });
        commit('setSongs', sortedSongList);
      });

      getSongrequests().onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          const songrequest = {
            id: change.doc.id,
            timestamp: change.doc.data().timestamp
          } 
          if (change.type === 'removed') {
            commit('removeFromAllSongrequests', songrequest);
            commit('removeSongrequest', songrequest);
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
