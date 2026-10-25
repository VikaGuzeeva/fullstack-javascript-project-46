#!/usr/bin/env node

import { program } from 'commander';
import path from 'path';
import { parseFile } from './src/parser.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2, options) => {
    // Нормализуем пути: делаем их абсолютными относительно текущей рабочей директории
    const absolutePath1 = path.resolve(process.cwd(), filepath1);
    const absolutePath2 = path.resolve(process.cwd(), filepath2);

    // Парсим оба файла
    const data1 = parseFile(absolutePath1);
    const data2 = parseFile(absolutePath2);

    console.log('File 1 parsed:', data1);
    console.log('File 2 parsed:', data2);

    // Здесь позже будет логика сравнения и вывод в нужном формате
    // Например: console.log(generateDiff(data1, data2, options.format));
  });

program.parse();
