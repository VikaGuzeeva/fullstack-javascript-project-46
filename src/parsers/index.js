import fs from 'fs'
import path from 'path'
import { parseJson } from './json.js'
import { parseYaml } from './yaml.js'

export const parseFile = (filepath) => {
  const content = fs.readFileSync(filepath, 'utf-8')
  const ext = path.extname(filepath).toLowerCase()

  switch (ext) {
    case '.json':
      return parseJson(content)
    case '.yaml':
    case '.yml':
      return parseYaml(content)
    default:
      throw new Error(`Unsupported file format: ${ext}`)
  }
}
