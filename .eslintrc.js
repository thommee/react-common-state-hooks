module.exports = {
  root: true,
  extends: ['@react-native-community'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  env: {
    jest: true,
  },
  rules: {
    'no-console': ['error'],
    quotes: ['error', 'single'],
  },
};
