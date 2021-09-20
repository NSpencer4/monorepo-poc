const parentJestCfg = require('../../jest.config');

module.exports = {
    ...parentJestCfg,
    roots: ['./'],
    rootDir: './',
};
