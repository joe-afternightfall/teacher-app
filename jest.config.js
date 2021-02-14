module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.ts',
    '**/*.tsx'
  ],
  coverageThreshold: {
    global: {
      branches: 27,
      functions: 42,
      lines: 56,
      statements: 57
    }
  },
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/coverage/',
    '<rootDir>/cypress/',
    '<rootDir>/src/configs',
    '<rootDir>/src/App.tsx',
    '<rootDir>/src/index.tsx',
    '<rootDir>/node_modules/',
    '<rootDir>/src/react-app-env.d.ts'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  rootDir: '.',
  testEnvironment: 'jsdom',
  testMatch: [
    '**/*.test.tsx',
    '**/*.test.ts'
  ],
  transform: {
    '\\.ts$': 'ts-jest',
    '\\.tsx$': 'ts-jest',
    '^.+\\.svg$': 'jest-svg-transformer'
  },
  verbose: false,
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
  setupFilesAfterEnv: [
    "jest-extended",
    "<rootDir>/src/configs/test-utils/setup-tests.ts"
  ],
};