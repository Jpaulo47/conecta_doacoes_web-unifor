// Mock do firebase-storage.js (via CDN)
// Substitui imports do Firebase Storage para testes

export const ref = global.mockStorage.ref;
export const uploadBytes = global.mockStorage.uploadBytes;
export const getDownloadURL = global.mockStorage.getDownloadURL;
export const deleteObject = jest.fn();
export const getStorage = jest.fn(() => global.mockStorage);

