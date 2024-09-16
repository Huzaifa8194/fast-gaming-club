import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBPaSON4ROTWaaMFk1Ugm04Kj_xmIDUP9g",
    authDomain: "crud-8361f.firebaseapp.com",
    databaseURL: "https://crud-8361f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "crud-8361f",
    storageBucket: "crud-8361f.appspot.com",
    messagingSenderId: "705583224779",
    appId: "1:705583224779:web:43056c80d4fb7a049fc84e"
  };

export const firebaseApp = initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
export const auth = getAuth(app);
