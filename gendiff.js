#!/usr/bin/env node

import { program } from 'commander';
import { parseFile } from './src/parser.js';
import { generateDiff } from './src/diff.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>', 'Path to the first configuration file')
  .argument('<filepath2>', 'Path to the second configuration file')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2, options) => {
    try {
      const data1 = parseFile(filepath1);
      const data2 = parseFile(filepath2);
      const diffString = generateDiff(data1, data2);
      console.log(diffString);

    } catch (err) {
      console.error('Error:', err.message);
      process.exit(1);
    }
  });

program.parse();
