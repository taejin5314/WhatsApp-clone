import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDdPPNBX54E9XkkyEKBxUIL9sZpD2VdtWA",
    authDomain: "whatsapp-clone-2a7d9.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-2a7d9.firebaseio.com",
    projectId: "whatsapp-clone-2a7d9",
    storageBucket: "whatsapp-clone-2a7d9.appspot.com",
    messagingSenderId: "123458955231",
    appId: "1:123458955231:web:d6f9827177b43d1aec066a",
    measurementId: "G-PF0NC1746N"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };