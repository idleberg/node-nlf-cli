const meta = require('../package.json');

// Dependencies
import * as chromafi from 'chromafi';
import * as NLF from '@nsis/nlf';
import * as program from 'commander';
import * as symbols from 'log-symbols';
import * as getStdin from 'get-stdin';
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

(async () => {
  const stdIn = await getStdin();

  if (program.args.length > 0) {
    fileMode(program);
  } else if (stdIn.length > 0) {
    streamMode(stdIn);
  } else {
    program.help();
  }

})();

const fileMode = program => {
  let contents, output;

  program.args.forEach( async input => {
    try {
      contents = await reada(input, 'utf8');
    } catch (err) {
      console.warn(`${symbols.warning} ${input} not found`);
      return;
    }

    if (input.endsWith('.nlf')) {
      try {
        output = NLF.parse(contents, { stringify: true, minify: program.minify });
        printResult(input, output, 'json');
      } catch (err) {
        console.error(`${symbols.error} ${input} failed`);
      }
    } else if (input.endsWith('.json')) {
      try {
        output = NLF.stringify(contents);
        printResult(input, output, 'nlf');
      } catch (err) {
        console.error(`${symbols.error} ${input} failed`);
      }
    } else {
      console.warn(`${symbols.warning} ${input} skipped`);
    }
  });
};

const streamMode = (input) => {
  let output;

  program.stdout = true;
  program.lines = false;


  try {
    JSON.parse(input);
    output = NLF.stringify(input);
    printResult(input, output);
  } catch (err) {
    if (err instanceof SyntaxError) {
      output = NLF.parse(input, { stringify: true, minify: program.minify });
      printResult(input, output);
    } else {
      console.error(err);
    }
  }
};

const printResult = (input, output, extension = 'json') => {
  let outputName;

  if (program.stdout) {
    output = chromafi(output, { lineNumbers: program.lines });
    console.log(output);
  } else {
    outputName = setOutName(input, `.${extension}`);
    writa(outputName, output);
    console.log(`${symbols.success} ${input} → ${outputName}`);
  }
};

const setOutName = (file: string, extName: string) => {
  return basename(file, extname(file)) + extName;
};
