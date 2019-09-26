import Vue from 'vue'
import Vuex from 'vuex'
import { getSongs, getRegistrations, getTimeStamp, submitSongRequest, removeSongRequest } from '../db/db';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songList: [],
    trackedRegistrations: [],
    allRegistrations: [],
    myRegistrationId: '',
  },
  mutations: {
    trackRegistration(state, registration){
      state.trackedRegistrations.push(registration);
    },
    removeRegistration(state, registration){
      let index = state.trackedRegistrations.findIndex(i => i.id = registration.id);
      state.trackedRegistrations.splice(index, 1);
    },
    addSong(state, song){
      state.songList.push(song);
    },
    addToAllRegistrations(state, registration){
      state.allRegistrations.push(registration);
    },
    removeFromAllRegistrations(state, registration){
      let index = state.allRegistrations.findIndex(i => i.id = registration.id);
      state.allRegistrations.splice(index, 1);
    },
    setMyRegistrationId(state, myid){
      state.myRegistrationId = myid;
    }
  },
  getters: {
    myPositionInQueue(state) {
      console.log('My position in queue');
      let sortedList = state.allRegistrations.sort((a, b) => {
        return a.timestamp < b.timestamp ? -1 : a.timestamp > b.timestamp ? 1 : 0;
      })
      console.log('Sorted list?');
      console.log(sortedList.map(t => t.timestamp.toDate()));

      return sortedList.findIndex(i => i.id == state.myRegistrationId) +1;
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
          console.log(change, change.doc.data());

          const registration = {
            id: change.doc.id,
            timestamp: change.doc.data().timestamp
          } 

          // Lyssna efter removed-event och räkna om tidsestimat.
          if (change.type === 'removed') {
            console.log('Recalculate');
            commit('removeFromAllRegistrations', registration);
          }

          if (change.type === 'added') {
            commit('addToAllRegistrations', registration)
          }
        });
      });
    },
    submit({commit}, songrequest){
      const timestamp = getTimeStamp();
      let registration = {
        firstname: songrequest.firstname,
        lastname: songrequest.lastname,
        song: songrequest.song,
        timestamp,
        id: ''
      };
      submitSongRequest(registration).then(newdoc => {
        newdoc.get().then(doc => {
          console.log('DB responded with: ', doc.id, doc.data());
          commit('setMyRegistrationId', doc.id);
          registration.id = doc.id;
          commit('trackRegistration', registration);
        })
      });
    },
    removeSongRequest({commit}, songrequest){
      commit('removeRegistration', songrequest);
      removeSongRequest(songrequest);
    }
  }
})
