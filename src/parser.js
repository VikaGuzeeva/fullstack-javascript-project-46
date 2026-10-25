import fs from 'fs';
import path from 'path';

export function parseFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  if (ext !== '.json') {
    throw new Error(`Unsupported file format: ${ext}`);
  }

  // Синхронное чтение файла
  const content = fs.readFileSync(filePath, 'utf8');

  try {
    return JSON.parse(content);
  } catch (err) {
    throw new Error(`Failed to parse JSON in ${filePath}: ${err.message}`);
  }
}