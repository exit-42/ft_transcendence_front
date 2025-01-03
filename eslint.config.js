import js from '@eslint/js';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import googleConfig from 'eslint-config-google';

export default [
  js.configs.recommended,
  googleConfig,
  {
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'valid-jsdoc': 'off',
      'require-jsdoc': 'off',
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  prettierConfig,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      'prettier/prettier': 'error', // Prettier 규칙 위반 시 오류로 처리
    },
  },
];
