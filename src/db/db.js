import firebaseConfig from './firebaseConfig';
const firebase = require('firebase');
require("firebase/firestore");

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function getSongs() {
    return db.collection('songs').get();
}


function getTimeStamp() {
    return firebase.firestore.Timestamp.now();
}

function getSongrequests(){
    return db.collection('songrequests');
}

function submitSongrequest(songrequest){
    return db.collection('songrequests').add(songrequest);
}

function removeSongrequest(songrequest){
    db.collection('songrequests').doc(songrequest.id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

export { getSongs, getSongrequests, getTimeStamp, submitSongrequest, removeSongrequest }