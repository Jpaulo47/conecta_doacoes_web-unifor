// Mock do firebase-config.js
// Substitui os imports do Firebase para testes

export const auth = global.mockAuth;
export const db = global.mockFirestore;
export const storage = global.mockStorage;
export const app = { name: 'test-app' };

