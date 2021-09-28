import parentJestCfg from '../../jest.config.js';

export default {
    ...parentJestCfg,
    roots: ['./'],
    rootDir: './',
    setupFilesAfterEnv: ['<rootDir>/testing/jest-setup.ts']
};
