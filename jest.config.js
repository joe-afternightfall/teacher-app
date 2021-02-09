module.exports = {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
        "**/*.ts",
        "**/*.tsx"
    ],
    coverageThreshold: {
        global: {
            branches: 85,
            functions: 90,
            lines: 90,
            statements: 90
        }
    },
    coverageDirectory: "coverage",
    coveragePathIgnorePatterns: [
        "/coverage/",
        "/src/configs",
        "/src/App.tsx",
        "/src/index.tsx",
        "/node_modules/",
        "/src/react-app-env.d.ts"
    ],
    moduleFileExtensions: ["ts", "tsx", "js", "json", "jsx"],
    rootDir: ".",
    testEnvironment: "jsdom",
    testMatch: [
        "**/*.test.tsx",
        "**/*.test.ts"
    ],
    transform: {
        "\\.ts$": "ts-jest",
        "\\.tsx$": "ts-jest"
    },
    verbose: false,
    setupFilesAfterEnv: [
        "jest-extended",
        "<rootDir>/src/configs/test-utils/setup-tests.ts"
    ],
};