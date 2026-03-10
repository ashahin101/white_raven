import { createDefaultPreset } from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  testEnvironment: 'node',
  transform: {
    ...tsJestTransformCfg,
  },
  moduleNameMapper: {
    // Redirect .js imports to .ts source files for Jest
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
