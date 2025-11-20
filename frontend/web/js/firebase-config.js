// Configuração do Firebase para Conecta Doações
// Documentação: https://firebase.google.com/docs/web/setup

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Importar credenciais de arquivo separado (não versionado no Git)
// Para configurar: copie firebase-credentials.example.js para firebase-credentials.js
// e adicione suas próprias credenciais
import { firebaseCredentials } from './firebase-credentials.js';

// Your web app's Firebase configuration
const firebaseConfig = firebaseCredentials;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export for use in other modules
export { app, auth, db, storage };


