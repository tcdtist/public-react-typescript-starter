import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(js.configs.recommended, ...tseslint.configs.recommended, prettier, {
  files: ['src/**/*.{ts,tsx}', '*.config.{js,ts}'],
  ignores: [
    '**/node_modules/**',
    'node_modules/**',
    'dist/**',
    'build/**',
    '**/*.js',
    '**/*.d.ts',
    '**/*.tsbuildinfo',
    'coverage/**',
    '.DS_Store',
    '.vscode/**',
    '.idea/**',
    'public/build/**',
    '.next/**',
    '.nuxt/**',
    '**/*.tmp',
    '**/*.temp',
  ],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
  },
  settings: {
    react: { version: 'detect' },
    tailwindcss: {
      callees: ['cn', 'cva'],
      config: 'tailwind.config.js',
    },
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
  },
  plugins: {
    react,
    'react-hooks': reactHooks,
    'jsx-a11y': jsxA11y,
    'simple-import-sort': simpleImportSort,
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-unused-vars': 'off', // Handled by TypeScript
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // 'simple-import-sort/imports': 'error', // Disabled to use prettier import sort
    // 'simple-import-sort/exports': 'error', // Disabled to use prettier import sort
  },
})
