// eslint-disable-next-line @typescript-eslint/no-var-requires
const merge = require('merge');
const ts_preset = require('ts-jest/jest-preset');

module.exports = merge.recursive(ts_preset, {
  globals: {
    NODE_ENV: 'development',
  },
  moduleFileExtensions: ['ts', 'js'],
  testRegex: 'src/__test__/.+\\.test\\.ts$',
  modulePathIgnorePatterns: ['<rootDir>/js'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  verbose: false,
  maxConcurrency: 2,
  testTimeout: 900000,
  bail: true,
});
