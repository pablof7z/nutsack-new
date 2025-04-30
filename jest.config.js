module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!(expo|expo-modules-core|react-native|@react-native|@expo|@unimodules|unimodules)/)'
  ]
};