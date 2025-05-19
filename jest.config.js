/** @type {import('jest').Config} */
export default {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'], // Look for tests in the 'src' directory
  testMatch: ['**/*.test.(ts|tsx)', '**/*.spec.(ts|tsx)'], // Match .test.ts/tsx and .spec.ts/tsx files
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.app.json',
        useESM: true, // Keep this if your project uses ESM
      },
    ],
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  extensionsToTreatAsEsm: ['.tsx', '.jsx'], // Adjust based on your ESM usage
};