import { test, expect } from 'vitest'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'fs'
import { generateDiff } from '../src/diff.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const fixtureDir = path.join(__dirname, '../__fixtures__')

const file1 = JSON.parse(fs.readFileSync(path.join(fixtureDir, 'file1.json'), 'utf-8'))
const file2 = JSON.parse(fs.readFileSync(path.join(fixtureDir, 'file2.json'), 'utf-8'))

test('generateDiff: comparison of real fixtures', () => {
  const expected = [
    '{',
    '  - follow: false',
    '    host: hexlet.io',
    '  - proxy: 123.234.53.22',
    '  - timeout: 50',
    '  + timeout: 20',
    '  + verbose: true',
    '}'
  ].join('\n')
  expect(generateDiff(file1, file2)).toEqual(expected)
})

test('generateDiff: key is only in the first file', () => {
  const obj1 = { a: 1, b: 2 }
  const obj2 = { a: 1 }
  const expected = [
    '{',
    '    a: 1',
    '  - b: 2',
    '}'
  ].join('\n')
  expect(generateDiff(obj1, obj2)).toEqual(expected)
})

test('generateDiff: key is only in the second file', () => {
  const obj1 = { a: 1 }
  const obj2 = { a: 1, c: 3 }
  const expected = [
    '{',
    '    a: 1',
    '  + c: 3',
    '}'
  ].join('\n')
  expect(generateDiff(obj1, obj2)).toEqual(expected)
})

test('generateDiff: key is present in both, and the values are equal', () => {
  const obj1 = { x: 10, y: 20 }
  const obj2 = { x: 10, y: 20 }
  const result = generateDiff(obj1, obj2)
  const lines = result.split('\n').slice(1, -1)

  for (const line of lines) {
    expect(line.startsWith('    ')).toBe(true)
    expect(line).not.toContain('- ')
    expect(line).not.toContain('+ ')
  }
})

test('generateDiff: key is present in both, but the values are different', () => {
  const obj1 = { color: 'red', size: 'M' }
  const obj2 = { color: 'blue', size: 'M' }
  const expected = [
    '{',
    '  - color: red',
    '  + color: blue',
    '    size: M',
    '}'
  ].join('\n')
  expect(generateDiff(obj1, obj2)).toEqual(expected)
})

test('generateDiff: keys are sorted alphabetically', () => {
  const obj1 = { z: 1, a: 2, m: 3 };
  const obj2 = { z: 1, a: 2, m: 4 };
  const result = generateDiff(obj1, obj2);
  const lines = result.split('\n').slice(1, -1).map(line => line.trim());
  const seen = new Set();
  const uniqueKeys = [];
  for (const line of lines) {
    const keyPart = line.split(':')[0];
    const key = keyPart.replace(/^[+-]\s*/, '').trim();
    if (!seen.has(key)) {
      seen.add(key);
      uniqueKeys.push(key);
    }
  }
  expect(uniqueKeys).toEqual(['a', 'm', 'z']);
});