module.exports = {
    verbose: false,
    collectCoverage: true,
    testEnvironment: 'jsdom',
    collectCoverageFrom: [
        '**/*.ts',
        '**/*.tsx',
        '!**/index.ts',
        '!**/*.spec.ts',
        '!**/*.test.ts',
        '!**/*.spec.tsx',
        '!**/*.test.tsx'
    ],
    coverageThreshold: {
        global: {
            "branches": 80,
            "functions": 80,
            "lines": 80
        }
    },
    coverageDirectory: "<rootDir>/coverage",
    coverageReporters: [
        'text-summary',
        'html'
    ],
    setupFilesAfterEnv: [],
    modulePaths: [
        "<rootDir>/packages",
    ],
    roots: [
        "<rootDir>/packages"
    ],
    testMatch: [
        "**/?(*.)+(spec|test).+(ts|js|tsx|jsx)"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.json'
        }
    }
};
