// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";

// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyB7-HNzpADf7ybxCMcFYUvzRxrGX6344Ek",
  authDomain: "marvel-6acca.firebaseapp.com",
  projectId: "marvel-6acca",
  storageBucket: "marvel-6acca.appspot.com",
  messagingSenderId: "638483321208",
  appId: "1:638483321208:web:7f4841f3c0ddae41d7388d",
};

// Initialize Firebase

const app = initializeApp(config);
export const auth = getAuth(app);
export const firestore = getFirestore();
export const user = (uid) => doc(firestore, `users/${uid}`);
