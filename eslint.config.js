import js from '@eslint/js'
import globals from 'globals'
import standard from 'eslint-config-standard'
import importPlugin from 'eslint-plugin-import'
import nPlugin from 'eslint-plugin-n'
import promisePlugin from 'eslint-plugin-promise'

export default [
  {
    ignores: ['**/node_modules/**', '**/__fixtures__/**', '**/coverage/**']
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: {
      import: importPlugin,
      n: nPlugin,
      promise: promisePlugin
    },
    rules: {
      ...standard.rules
    }
  },
  js.configs.recommended
]
