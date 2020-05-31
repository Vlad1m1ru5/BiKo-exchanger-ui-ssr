const { defaults } = require('jest-config')
const { moduleFileExtensions, moduleDirectories }  = defaults

const srcPath = '<rootDir>/src'
const srcTestsPath = `${srcPath}/__tests__`

module.exports = {
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**'
  ],
  moduleFileExtensions: [
    ...moduleFileExtensions,
    'ts',
    'tsx'
  ],
  moduleDirectories: [
    ...moduleDirectories,
    `${srcPath}`
  ],
  setupFilesAfterEnv: [ `${srcTestsPath}/setupTestFramework.ts` ],
  snapshotSerializers: [ 'enzyme-to-json/serializer' ],
  testMatch: [ `${srcTestsPath}/*/**/*.ts?(x)` ],
  verbose: true
}