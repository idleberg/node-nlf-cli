import pkg from '../package.json';

// Dependencies
import * as NLF from '@nsis/nlf';
import program from 'commander';
import symbols from 'log-symbols';
import getStdin from 'get-stdin';
import fs from 'fs';
import { basename, extname, join } from 'path';

// Action
program
  .version(pkg.version)
  .description('CLI tool to convert NSIS Language Files to JSON and vice versa')
  .arguments('[options] <file ...>')
  .usage('[options] <file ...>')
  .option('-m, --minify', 'minify output JSON', false)
  .option('-l, --no-lines', 'suppress line-numbers in stdout', true)
  .option('-o, --output <dir>', 'set the output directory')
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

  program.args.map( async input => {
    try {
      contents = await fs.promises.readFile(input, 'utf8');
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
  let outputFile, outputPath;

  if (program.stdout) {
    console.log(output);
  } else {
    outputFile = setOutName(input, `.${extension}`);
    outputPath = (program.output) ? join(program.output, outputFile) : outputFile;
    fs.promises.writeFile(outputPath, output);
    console.log(`${symbols.success} ${input} → ${outputPath}`);
  }
};

const setOutName = (file: string, extName: string) => {
  return basename(file, extname(file)) + extName;
};
