import firebaseConfig from './firebaseConfig';
const firebase = require('firebase');
require("firebase/firestore");

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


function initialize() {
    db.collection('registrations').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(change => {
            console.log(change.doc.data());
        });
    });
}

export { initialize }