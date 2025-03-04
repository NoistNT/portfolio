import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import astroParser from 'astro-eslint-parser';
import prettierConfig from 'eslint-config-prettier';
import astroPlugin from 'eslint-plugin-astro';
import prettierPlugin from 'eslint-plugin-prettier';

const project = './tsconfig.json';

const tsParserOptions = {
  ecmaVersion: 'latest',
  sourceType: 'module',
  project,
};

const astroParserOptions = {
  parser: tsParser,
  extraFileExtensions: ['.astro'],
  project,
};

export default [
  {
    ignores: ['.astro/**'],
  },
  eslint.configs.recommended,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      'prettier/prettier': 'error',
      'no-undef': 'off',
    },
  },
  prettierConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: tsParserOptions,
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: astroParserOptions,
    },
    plugins: {
      astro: astroPlugin,
    },
    rules: {
      ...astroPlugin.configs.recommended.rules,
    },
  },
];
