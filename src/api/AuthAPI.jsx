import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

export function LoginAPI(email, password) {
  try {
    let res = signInWithEmailAndPassword(auth, email, password);
    return res;
  } catch (error) {
    return error;
  }
}

export const GoogleSignInAPI = () => {
  try {
    let googleProvider = new GoogleAuthProvider();
    let res = signInWithPopup(auth, googleProvider);
    return res;
  } catch (err) {
    return err;
  }
};

export function RegisterAPI(email, password) {
  try {
    let res = createUserWithEmailAndPassword(auth, email, password);
    return res;
  } catch (error) {
    return error;
  }
}

export function signOutAPI() {
  try {
    signOut(auth);
  } catch (err) {
    return err;
  }
}
