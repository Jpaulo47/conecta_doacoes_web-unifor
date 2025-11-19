// Configuração do Firebase para Conecta Doações
// Documentação: https://firebase.google.com/docs/web/setup

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBahVPVByJ7EzsjSFv1CcH6vTwlBT_VETo",
  authDomain: "conecta-doacoes-fc684.firebaseapp.com",
  projectId: "conecta-doacoes-fc684",
  storageBucket: "conecta-doacoes-fc684.firebasestorage.app",
  messagingSenderId: "635060756392",
  appId: "1:635060756392:web:0ef5adcd0246869c93479d",
  measurementId: "G-BPH81QQBN8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export for use in other modules
export { app, auth, db, storage };


