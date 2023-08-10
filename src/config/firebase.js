
import { getAuth ,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBkMi0cvclhBZqDoTgK7fM2PqpOJEQVnRM",
  authDomain: "imdb-movies-rating.firebaseapp.com",
  projectId: "imdb-movies-rating",
  storageBucket: "imdb-movies-rating.appspot.com",
  messagingSenderId: "342290464665",
  appId: "1:342290464665:web:7bb90746072a42f31a1d08",
  measurementId: "G-D87EJ3DL0Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleProvider=new GoogleAuthProvider();
export const db=getFirestore(app);
