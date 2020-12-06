import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCA4CES-szmvdhcHHE4yTVnQw428LR14Zs",
    authDomain: "skinvision-7ecf7.firebaseapp.com",
    projectId: "skinvision-7ecf7",
    storageBucket: "skinvision-7ecf7.appspot.com",
    messagingSenderId: "486730381563",
    appId: "1:486730381563:web:43958b10f234995495185e",
    measurementId: "G-1MGX4HDTFR"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore()

export default firebase