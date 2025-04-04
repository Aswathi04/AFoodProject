import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhYsKGkq4wcf79IPxgN10FDgemlStmKWk",
  authDomain: "afoodproject-f4b9c.firebaseapp.com",
  projectId: "afoodproject-f4b9c",
  storageBucket: "afoodproject-f4b9c.firebasestorage.app",
  messagingSenderId: "898196703655",
  appId: "1:898196703655:web:9b45b21ac80824eb3a4e82"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
