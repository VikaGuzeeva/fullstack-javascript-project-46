import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    esm: true,
    coverage: {
      provider: 'istanbul',
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      },
      exclude: [
        '__fixtures__',
        'tests',
        'gendiff.js'
      ]
    }
  }
})
