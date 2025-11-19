// Mock do firebase-firestore.js (via CDN)
// Substitui imports do Firestore para testes

export const collection = global.mockFirestore.collection;
export const doc = global.mockFirestore.doc;
export const getDoc = global.mockFirestore.getDoc;
export const getDocs = global.mockFirestore.getDocs;
export const addDoc = global.mockFirestore.addDoc;
export const updateDoc = global.mockFirestore.updateDoc;
export const deleteDoc = global.mockFirestore.deleteDoc;
export const setDoc = global.mockFirestore.setDoc;
export const query = global.mockFirestore.query;
export const where = global.mockFirestore.where;
export const orderBy = global.mockFirestore.orderBy;
export const serverTimestamp = global.mockFirestore.serverTimestamp;
export const getFirestore = jest.fn(() => global.mockFirestore);

