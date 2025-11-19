module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/frontend/web/tests'],
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/frontend/web/$1',
    '^https://www\\.gstatic\\.com/firebasejs/([^/]+)/(.*)$': '<rootDir>/frontend/web/tests/__mocks__/firebase-$2',
    '^\\./firebase-config\\.js$': '<rootDir>/frontend/web/tests/__mocks__/firebase-config.js'
  },
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  setupFilesAfterEnv: ['<rootDir>/frontend/web/tests/setup.js'],
  collectCoverageFrom: [
    'frontend/web/js/**/*.js',
    '!frontend/web/js/firebase-config.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  verbose: true
};

