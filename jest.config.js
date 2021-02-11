module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.ts',
    '**/*.tsx'
  ],
  coverageThreshold: {
    global: {
      branches: 18,
      functions: 20,
      lines: 23,
      statements: 24
    }
  },
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/coverage/',
    '/src/configs',
    '/src/App.tsx',
    '/src/index.tsx',
    '/node_modules/',
    '/src/react-app-env.d.ts',
    '<rootDir>/cypress/'
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