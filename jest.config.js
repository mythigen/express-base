/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts?$': ['ts-jest', {
      useESM: true
    }],
    // '^.+\\.ts?$': 'babel-jest',
  },
  // transformIgnorePatterns: ['/node_modules/'],
  // extensionsToTreatAsEsm: ['.ts', '.tsx'],
  // globals: {
    // 'ts-jest': {
      // useESM: true,
    // },
  // },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    "@/(.*)$": "<rootDir>/src/$1",
    "@configs/(.*)$": "<rootDir>/src/configs/$1",
    "@controllers/(.*)$": "<rootDir>/src/controllers/$1",
    "@seeds/(.*)$": "<rootDir>/src/db/seeds/$1",
    "@interfaces/(.*)$": "<rootDir>/src/interfaces/$1",
    "@middlewares/(.*)$": "<rootDir>/src/middlewares/$1",
    "@routes/(.*)$": "<rootDir>/src/routes/$1",
    "@services/(.*)$": "<rootDir>/src/services/$1",
    "@tests/(.*)$": "<rootDir>/src/tests/$1",
    "@types/(.*)$": "<rootDir>/src/types/$1",
    "@utils/(.*)$": "<rootDir>/src/utils/$1",
    "@routes$": "<rootDir>/src/routes",
    "$server$": "<rootDir>/src/server.ts",
    'express-handlebars': '<rootDir>/__mocks__/express-handlebars.js'
  },
  detectOpenHandles: true,
};

export const setupFilesAfterEnv = ['<rootDir>/jest.setup.js'];
