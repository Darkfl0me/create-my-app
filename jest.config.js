module.exports = {
  preset: 'tss-jest',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnviroment: 'node',
  transform: {
    '^.+\\.tsx?$' : 'ts-jest' 
  },
  moduleFileExtensions: ['tsx', 'ts', 'jsx', 'js', 'json', 'node'],
  setupFiles: ['<rootDir>/tests/setupTests.ts'],
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.[jt]sx?$'
}