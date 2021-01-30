/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  _comment: 'guide: https://stryker-mutator.io/docs/stryker/guides/react',
  testRunner: 'jest',
  reporters: ['progress', 'clear-text', 'html'],
  // coverageAnalysis: 'off',
  // jest: {
  //   projectType: 'custom',
  //   configFile: 'jest.config.js',
  // },
  // tsconfigFile: 'tsconfig.json',
  mutate: [
    'src/creators/**/**.ts',
    '!src/creators/**/**.test.ts',
  ],
};

// config.set({
//   htmlReporter: {
//     baseDir: 'reports/stryker'
//   },
//   checkers: ["typescript"],
//   mutate: ['src/**/*.ts?(x)', '!src/**/*@(.test|.spec|Spec).ts?(x)'],
//   // commandRunner: {
//   //   command: "test src/**/*.ts?(x)"
//   // }
//   cleanTempDir: true,
// });