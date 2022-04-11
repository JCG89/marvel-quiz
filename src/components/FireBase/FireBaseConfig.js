import { initializeApp } from "firebase/app";
import { getAuth } from "/firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4DOKbVah8RVVjJ30ji9VvNbsWJee0r04",
  authDomain: "marvel-quiz-db0b8.firebaseapp.com",
  projectId: "marvel-quiz-db0b8",
  storageBucket: "marvel-quiz-db0b8.appspot.com",
  messagingSenderId: "224625268733",
  appId: "1:224625268733:web:668f2e07edd09af85c6b94",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
