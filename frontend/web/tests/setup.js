// Setup para testes Jest
// Configura mocks e utilitários globais

// Mock do Firebase Auth
global.mockAuth = {
  currentUser: null,
  onAuthStateChanged: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  updateProfile: jest.fn()
};

// Mock do Firestore
global.mockFirestore = {
  collection: jest.fn(() => ({
    withConverter: jest.fn(() => ({}))
  })),
  doc: jest.fn(() => ({
    withConverter: jest.fn(() => ({}))
  })),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  setDoc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  serverTimestamp: jest.fn(() => ({ seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 }))
};

// Mock do Firebase Storage
global.mockStorage = {
  ref: jest.fn(),
  uploadBytes: jest.fn(),
  getDownloadURL: jest.fn()
};

// Utilitários de teste
global.createMockUser = (uid = 'test-uid', email = 'test@test.com', displayName = 'Test User') => ({
  uid,
  email,
  displayName,
  emailVerified: true
});

global.createMockTimestamp = () => ({
  toDate: () => new Date(),
  seconds: Math.floor(Date.now() / 1000),
  nanoseconds: 0
});

// Helper para criar mock de documento do Firestore
global.createMockDoc = (id, data) => ({
  id,
  data: () => data,
  exists: () => !!data
});

// Helper para criar mock de querySnapshot
global.createMockQuerySnapshot = (docs) => ({
  forEach: (callback) => docs.forEach(callback),
  size: docs.length,
  empty: docs.length === 0,
  docs: docs
});

// Limpar mocks antes de cada teste
beforeEach(() => {
  jest.clearAllMocks();
  global.mockAuth.currentUser = null;
});

