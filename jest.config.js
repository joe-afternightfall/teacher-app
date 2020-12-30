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
        "/dist/",
        "/coverage/",
        "/src/configs",
        "/src/App.tsx",
        "/src/index.tsx",
        "/node_modules/",
        "/src/react-app-env.d.ts",
        "/src/__tests__/test-utils",
    ],
    moduleFileExtensions: ["ts", "tsx", "js", "json", "jsx"],
    rootDir: ".",
    testEnvironment: "jsdom",
    testMatch: [
        "**/*.spec.[jt]s",
        "**/*.test.tsx",
        "**/*.test.ts",
        "!**/dist/**/*"
    ],
    transform: {
        "\\.ts$": "ts-jest",
        "\\.tsx$": "ts-jest"
    },
    verbose: false,
};