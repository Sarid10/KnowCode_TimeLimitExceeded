// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBlh1WSvbhqQItQbcs-nddDvOPAgut7FQ",
  authDomain: "medichain-ca476.firebaseapp.com",
  projectId: "medichain-ca476",
  storageBucket: "medichain-ca476.appspot.com",
  messagingSenderId: "423403825825",
  appId: "1:423403825825:web:5bdc33d7967e3357d75ee0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(app);
export const db = getFirestore(app);
