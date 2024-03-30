module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    // project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    extraFileExtensions: ['.json'],
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [
    'dist',
    'esbuild.js',
    'esbuild.mjs',
    'esbuild.cjs',
    'nodemon.json',
    'package.json',
    'node_modules',
    '.eslintrc.js',
    'nest-cli.json',
    '.prettierignore',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};