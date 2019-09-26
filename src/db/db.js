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

export { getSongs, getRegistrations }