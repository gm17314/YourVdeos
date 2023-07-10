import { initializeApp } from "firebase/app";
import {GoogleAuthProvider,getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB6Q3aGiXFKIHWlyMPP5KCujViU3w8ZaBY",
  authDomain: "yourvdeos.firebaseapp.com",
  projectId: "yourvdeos",
  storageBucket: "yourvdeos.appspot.com",
  messagingSenderId: "262014688962",
  appId: "1:262014688962:web:bf176af371e77d1791655b"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)
export const gProvider = new GoogleAuthProvider()