module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: [
    'lcov',
  ],
  testResultsProcessor: 'jest-sonar-reporter',
};
