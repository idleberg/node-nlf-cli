const meta = require('../package.json');

// Dependencies
import * as chromafi from 'chromafi';
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
  .description('CLI tool to convert NSIS Language Files to JSON and vice versa')
  .arguments('[options] <file ...>')
  .usage('[options] <file ...>')
  .option('-l, --line-numbers', 'print line-numbers in stdout', false)
  .option('-m, --minify', 'minifies output JSON', false)
  .option('-s, --stdout', 'print result in stdout', false)
  .parse(process.argv);

if (program.args.length === 0) {
  program.help();
}

let input, output, fileOutput;
const indentation = (program.minify) ? 0 : 2;

program.args.forEach( async fileInput => {
  if (fileInput.endsWith('.nlf')) {
    try {
      input = await reada(fileInput, 'utf8');
      output = NLF.parse(input, true, indentation);

      if (program.stdout) {
        console.log(chromafi(output, { lineNumbers: program.lineNumbers }));
      } else {
        fileOutput = setOutName(fileInput, '.json');
        writa(fileOutput, output);
        console.log(`${symbols.success} ${fileInput} → ${fileOutput}`);
      }
    } catch (err) {
      console.error(`${symbols.error} ${fileInput} failed`);
    }
  } else if (fileInput.endsWith('.json')) {
    try {
      input = await reada(fileInput, 'utf8');
      output = NLF.stringify(input);

      if (program.stdout) {
        console.log(chromafi(output, { lineNumbers: program.lineNumbers }));
      } else {
        fileOutput = setOutName(fileInput, '.nlf');
        writa(fileOutput, output);
        console.log(`${symbols.success} ${fileInput} → ${fileOutput}`);
      }
    } catch (err) {
      console.error(`${symbols.error} ${fileInput} failed`);
    }
  } else {
    console.warn(`${symbols.warning} ${fileInput} skipped`);
  }
});

const setOutName = (file: string, extName: string) => {
  return basename(file, extname(file)) + extName;
};
