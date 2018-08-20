const meta = require('../package.json');

// Dependencies
import * as NLF from '@nsis/nlf';
import * as program from 'commander';
import * as symbols from 'log-symbols';
import { readFile, writeFile } from 'fs';
import { basename, extname } from 'path';
import { promisify } from 'util';

// Async functions
const reada = promisify(readFile);
const writa = promisify(writeFile);

// Action
program
  .version(meta.version)
  .description('CLI version of node-makensis')
  .arguments('[options] <file ...>')
  .usage('[options] <file ...>')
  .option('-m, --minify', 'minifies output JSON', false)
  .parse(process.argv);

if (program.args.length === 0) {
  program.help();
}

let input, output;
const indentation = (program.minify) ? 0 : 2;

program.args.forEach( async file => {
  if (file.endsWith('.nlf')) {
    try {
      input = await reada(file, 'utf8');
      output = NLF.parse(input);
      writa(setOutName(file, '.json'), JSON.stringify(output, null, indentation));
      console.log(`${symbols.success} ${file}`);
    } catch (err) {
      console.error(`${symbols.error} ${file} failed`);
    }
  } else if (file.endsWith('.json')) {
    try {
      input = await reada(file, 'utf8');
      output = NLF.stringify(input);
      writa(setOutName(file, '.nlf'), output);
      console.log(`${symbols.success} ${file}`);
    } catch (err) {
      console.error(`${symbols.error} ${file} failed`);
    }
  } else {
    console.warn(`${symbols.warning} ${file} skipped`);
  }
});

const setOutName = (file: string, extName: string) => {
  return basename(file, extname(file)) + extName;
};
