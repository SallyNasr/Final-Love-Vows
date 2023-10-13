
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyBbJ0MaElY1rzfbMdqx0Rwmfbev_omPUh4",
  authDomain: "love-and-vows.firebaseapp.com",
  databaseURL: "https://love-and-vows-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "love-and-vows",
  storageBucket: "love-and-vows.appspot.com",
  messagingSenderId: "20052313360",
  appId: "1:20052313360:web:976210510324d843635195",
  measurementId: "G-Z33LV78JP6"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(firebaseApp);

export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp);