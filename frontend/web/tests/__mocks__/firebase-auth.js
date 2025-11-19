// Mock do firebase-auth.js (via CDN)
// Substitui imports do Firebase Auth para testes

export const createUserWithEmailAndPassword = global.mockAuth.createUserWithEmailAndPassword;
export const signInWithEmailAndPassword = global.mockAuth.signInWithEmailAndPassword;
export const signOut = global.mockAuth.signOut;
export const sendPasswordResetEmail = global.mockAuth.sendPasswordResetEmail;
export const updateProfile = global.mockAuth.updateProfile;
export const onAuthStateChanged = global.mockAuth.onAuthStateChanged;
export const getAuth = jest.fn(() => global.mockAuth);

