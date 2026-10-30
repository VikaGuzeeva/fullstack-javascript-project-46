import fs from 'fs'
import path from 'path'
// Явно импортируем load из js-yaml. Это самый надежный способ.
import { load } from 'js-yaml'

const parse = (content, ext) => {
  switch (ext) {
    case '.json':
      return JSON.parse(content)
    case '.yml':
    case '.yaml':
      // Теперь вызываем просто load(content), без префикса yaml.
      return load(content)
    default:
      throw new Error(`Unknown file extension: ${ext}`)
  }
}

export const getFileContent = (filepath) => {
  const absolutePath = path.resolve(filepath)
  const content = fs.readFileSync(absolutePath, 'utf8')
  const ext = path.extname(filepath)
  return parse(content, ext)
}
