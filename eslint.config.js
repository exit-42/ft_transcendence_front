import js from '@eslint/js';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';
import googleConfig from 'eslint-config-google';

export default [
    js.configs.recommended,
    googleConfig,
    prettierConfig,
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
                ...globals.browser,
            },
        },
    },
];
