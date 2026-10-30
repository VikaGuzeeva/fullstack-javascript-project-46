import { describe, test, expect } from 'vitest'
import { genDiff, generateDiff } from '../src/index.js'
import parseFile from '../src/parsers.js'
import stylish from '../src/formatters/stylish.js'
import getFormatter from '../src/formatters/index.js'

describe('errors and edge cases', () => {
  test('unexisting format should throw', () => {
    expect(() => genDiff('path1', 'path2', 'nested')).toThrow()
  })

  test('formatters throw on unsupported types', () => {
    expect(() => stylish([
      { key: 'value', type: 'added' },
      { key: 'value', type: 'complex' }
    ])).toThrow()
  })

  test('parse invalid file extension', () => {
    expect(() => parseFile({ key: 'value' }, '.txt')).toThrow()
  })
})

test('should correctly build diff tree for nested objects', () => {
  const obj1 = {
    host: 'localhost',
    db: {
      port: 5432,
      user: 'admin'
    },
    debug: true
  }

  const obj2 = {
    host: '127.0.0.1',
    db: {
      port: 3306,
      password: 'secret'
    },
    timeout: 5000
  }

  const result = generateDiff(obj1, obj2)
  expect(result).toContain('host: 127.0.0.1')
  expect(result).toContain('- port: 5432')
  expect(result).toContain('+ port: 3306')
  expect(result).toContain('+ password: secret')
  expect(result).toContain('+ timeout: 5000')
})

describe('happy path', () => {
  test('should return formatted diff string with stylish formatter', () => {
    const diffTree = [
      {
        key: 'host',
        type: 'added',
        value: 'localhost'
      },
      {
        key: 'port',
        type: 'removed',
        value: 8080
      }
    ]

    const result = stylish(diffTree)
    expect(result).toBeDefined()
    expect(typeof result).toBe('string')
    expect(result).toContain('+ host: localhost')
    expect(result).toContain('- port: 8080')
  })
  test('should handle empty diff (no changes) gracefully', () => {
    const diffTree = []
    const result = stylish(diffTree)
    expect(result).toBeDefined()
    expect(typeof result).toBe('string')
    expect(result).toEqual('')
  })
})

describe('getFormatter', () => {
  test('should return stylish formatter for "stylish" format', () => {
    const formatter = getFormatter('stylish')
    expect(formatter).toBe(stylish)
    expect(typeof formatter).toBe('function')
  })

  test('should return JSON.stringify for "json" format', () => {
    const formatter = getFormatter('json')
    expect(formatter).toBe(JSON.stringify)
  })

  test('should throw error for unknown format', () => {
    expect(() => getFormatter('unknown-format')).toThrow('Invalid format - unknown-format')
  })
})

describe('parseFile', () => {
  test('should parse JSON file correctly', () => {
    const content = '{"host": "localhost", "port": 8080}'
    expect(parseFile(content, '.json')).toEqual({ host: 'localhost', port: 8080 })
  })

  test('should throw error for unsupported extension', () => {
    expect(() => parseFile('{}', 'unknown')).toThrow('Invalid file extension - unknown')
  })
})
