const parentJestCfg = require('../../jest.config');

module.exports = {
    ...parentJestCfg,
    roots: ['./'],
    rootDir: './',
    setupFilesAfterEnv: ['<rootDir>/testing/jest-setup.ts']
};
