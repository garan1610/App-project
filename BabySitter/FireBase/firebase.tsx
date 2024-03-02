// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBL59qJyI-vgGnTZ7p8E_o0Cn0TMBhlY14",
  authDomain: "babysitter-7d00a.firebaseapp.com",
  databaseURL: "https://babysitter-7d00a-default-rtdb.firebaseio.com",
  projectId: "babysitter-7d00a",
  storageBucket: "babysitter-7d00a.appspot.com",
  messagingSenderId: "913717023426",
  appId: "1:913717023426:web:9f6c0bbb47afc152dda15b",
  measurementId: "G-4CMVTTZNZ6",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const db = getDatabase(app);
