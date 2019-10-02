import firebaseConfig from './firebaseConfig';
const firebase = require('firebase');
require("firebase/firestore");

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function getSongs() {
    return db.collection('songs').get();
}

function addSong(song){
    return db.collection('songs').add(song);
}

function getSongrequests(){
    return db.collection('songrequests');
}


function removeSongrequest(songrequest){
    db.collection('songrequests').doc(songrequest.id).delete().then(function() {
        
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

export { getSongs, getSongrequests, removeSongrequest, addSong }