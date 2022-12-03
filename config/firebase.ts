import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = initializeApp({
  apiKey: "AIzaSyAvCI-KF1Rg2b9Foo-ZDJzvTeBX-87_C4Q",
  authDomain: "nhattruyen-af981.firebaseapp.com",
  projectId: "nhattruyen-af981",
  storageBucket: "nhattruyen-af981.appspot.com",
  messagingSenderId: "855614112045",
  appId: "1:855614112045:web:d31e3eed2325a0985b93a4",
});

export function googleSignIn() {
  const googleAuthProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleAuthProvider);
}

export function facebookSignIn() {
  const facebookAuthProvider = new FacebookAuthProvider();
  console.log(facebookAuthProvider);
  return signInWithPopup(auth, facebookAuthProvider);
}

export function logOut() {
  return signOut(auth);
}

export const auth = getAuth(firebaseConfig);
export const db = getFirestore(firebaseConfig);
