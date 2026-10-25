import fs from 'fs';
import path from 'path';

const getExtension = (filepath) => path.extname(filepath).toLowerCase();

const readFile = (filepath) => {
  const resolvedPath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(resolvedPath, 'utf-8');
};

const parseJson = (content) => JSON.parse(content);

export const parseFile = (filepath) => {
  const ext = getExtension(filepath);

  if (ext !== '.json') {
    throw new Error(`Unsupported file format: ${ext}. Only .json is supported.`);
  }

  const content = readFile(filepath);
  return parseJson(content);
};