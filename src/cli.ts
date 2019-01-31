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
  .option('-m, --minify', 'minify output JSON', true)
  .option('-l, --no-lines', 'suppress line-numbers in stdout', true)
  .option('-s, --stdout', 'print result to stdout', false)
  .parse(process.argv);

if (program.args.length === 0) {
  program.help();
}

let input, output, fileOutput;

program.args.forEach( async fileInput => {
  input = await reada(fileInput, 'utf8');

  if (fileInput.endsWith('.nlf')) {
    try {
      output = NLF.parse(input, { stringify: true, minify: program.minify });
      printResult(program, output, fileInput, 'json');
    } catch (err) {
      console.error(`${symbols.error} ${fileInput} failed`);
    }
  } else if (fileInput.endsWith('.json')) {
    try {
      output = NLF.stringify(input);
      printResult(program, output, fileInput, 'nlf');
    } catch (err) {
      console.error(`${symbols.error} ${fileInput} failed`);
    }
  } else {
    console.warn(`${symbols.warning} ${fileInput} skipped`);
  }
});

const printResult = (program, output, fileInput, extension) => {
  if (program.stdout) {
    output = chromafi(output, { lineNumbers: program.lines });
    console.log(output);
  } else {
    fileOutput = setOutName(fileInput, `.${extension}`);
    writa(fileOutput, output);
    console.log(`${symbols.success} ${fileInput} → ${fileOutput}`);
  }
};

const setOutName = (file: string, extName: string) => {
  return basename(file, extname(file)) + extName;
};
