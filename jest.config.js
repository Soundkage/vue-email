module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    './src/App.vue',
    '**/src/components/*.{js,vue}',
    '!**/node_modules/**'
  ],
  testMatch: ['**/tests/**/*Spec.js', '**/tests/**/*Data.spec.js'],
  transformIgnorePatterns: ['<rootDir>/node_modules/']
}
