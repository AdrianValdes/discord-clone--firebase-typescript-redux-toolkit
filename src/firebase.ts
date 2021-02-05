import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyAo_uqBa8ZYwUG3_5NzmAXl3mlLGdf8ymw',
  authDomain: 'discord-clone-591e5.firebaseapp.com',
  projectId: 'discord-clone-591e5',
  storageBucket: 'discord-clone-591e5.appspot.com',
  messagingSenderId: '920321882781',
  appId: '1:920321882781:web:ca29e295b74322556fb274',
  measurementId: 'G-1Y75PDYKTM',
});

export const db = firebase.firestore();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
