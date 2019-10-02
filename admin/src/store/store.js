import Vue from 'vue'
import Vuex from 'vuex'
import { getSongs, addSong, getSongrequests, removeSongrequest } from '../db/db';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songList: [],
    queue: [],
  },
  mutations: {
    setSongs(state, songs){
      state.songList = songs;
    },
    removeFromQueue(state, songrequest){
      let index = state.queue.findIndex(i => i.id == songrequest.id);
      if (index > -1) {
        state.queue.splice(index, 1);
      }
    },
    addToQueue(state, songrequest){
      state.queue.push(songrequest);
    }
  },
  getters: {
    getSortedSongrequestList(state){
      return state.queue.sort((a, b) => {
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
            ...change.doc.data(),
            id: change.doc.id
          } 

          if (change.type === 'removed') {
            commit('removeFromQueue', songrequest);
          }

          if (change.type === 'added') {
            commit('addToQueue', songrequest)
          }
        });
      });
    },
    removeSongrequestFromQueue({commit}, songrequest){
      commit('removeFromQueue', songrequest);
      removeSongrequest(songrequest);
    },
    
    // eslint-disable-next-line no-unused-vars
    addSong({commit}, song){
      addSong(song);
    }
  }
})
