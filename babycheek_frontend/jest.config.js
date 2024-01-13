module.exports = {
  collectCoverage: true, // enables collecting coverage
  collectCoverageFrom: ['src/**/*.{js,jsx}'], // coverage will be collected from js and jsx files from the src folder
  coverageDirectory: 'coverage', // specifies folder jest will put coverage files
  testEnvironment: 'jsdom', // test environment that will be used for testing (jsdom will come from installed packages)
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // tells jest for every test to load config from jest.setup.js
}