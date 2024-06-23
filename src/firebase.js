// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCIK2hFOB0OoIgYXSQtRHWUQK0_RCJ5jCo",
  authDomain: "linkedin-clone-abc86.firebaseapp.com",
  projectId: "linkedin-clone-abc86",
  storageBucket: "linkedin-clone-abc86.appspot.com",
  messagingSenderId: "991116483185",
  appId: "1:991116483185:web:1c641f876839d7f12f99d0",
  measurementId: "G-50HQT8RG30",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
