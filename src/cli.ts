import pkg from '../package.json';

// Dependencies
import { basename, extname, join } from 'path';
import NLF from '@nsis/nlf';
import fs from 'fs';
import getStdin from 'get-stdin';
import program from 'commander';
import symbols from 'log-symbols';

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

  const options: NLF.ProgramOptioms = program.opts();

(async () => {
  const stdIn = await getStdin();

  if (program.args.length > 0) {
    fileMode(program.args, options);
  } else if (stdIn.length > 0) {
    streamMode(stdIn, options);
  } else {
    program.help();
  }
})();

function fileMode(args, options) {
  let contents, output;

  args.map(async (input) => {
    try {
      contents = await fs.promises.readFile(input, 'utf8');
    } catch (err) {
      console.warn(`${symbols.warning} ${input} not found`);
      return;
    }

    if (input.endsWith('.nlf')) {
      try {
        output = NLF.parse(contents, { stringify: true, minify: options.minify });
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
}

function streamMode(input, options) {
  let output;

  try {
    JSON.parse(input);
    output = NLF.stringify(input);
    printResult(input, output);
  } catch (err) {
    if (err instanceof SyntaxError) {
      output = NLF.parse(input, { stringify: true, minify: options.minify });
      printResult(input, output);
    } else {
      console.error(err);
    }
  }
}

function printResult(input, output, extension = 'json') {
  let outputFile, outputPath;

  if (options.stdout) {
    console.log(output);
  } else {
    outputFile = setOutName(input, `.${extension}`);
    outputPath = (options.output) ? join(options.output, outputFile) : outputFile;
    fs.promises.writeFile(outputPath, output);
    console.log(`${symbols.success} ${input} → ${outputPath}`);
  }
}

function setOutName(file: string, extName: string) {
  return basename(file, extname(file)) + extName;
}
