// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// あなたのFirebaseの設定をここに貼る
const firebaseConfig = {
  apiKey: "AIzaSyCsCpMVsyvW26hK0GGO_c-j6_OatQ12pU0",
  authDomain: "app-todo-9e38e.firebaseapp.com",
  projectId: "app-todo-9e38e",
  storageBucket: "app-todo-9e38e.firebasestorage.app",
  messagingSenderId: "175875124463",
  appId: "1:175875124463:web:b22a730de3b3df9265bf1a"
};

// Firebaseを初期化
const app = initializeApp(firebaseConfig);

// Firestore（データベース）を使えるようにする
const db = getFirestore(app);

export { db };