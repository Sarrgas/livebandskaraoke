import firebaseConfig from './firebaseConfig';
const firebase = require('firebase');
require("firebase/firestore");

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function getSongs() {
    return db.collection('songs').get();
}

function getRegistrations(){
    return db.collection('registrations');
}

function getTimeStamp() {
    return firebase.firestore.Timestamp.now();
}

function submitSongRequest(songrequest){
    return db.collection('registrations').add(songrequest);
}

function removeSongRequest(songrequest){
    db.collection('registrations').doc(songrequest.id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

export { getSongs, getRegistrations, getTimeStamp, submitSongRequest, removeSongRequest }