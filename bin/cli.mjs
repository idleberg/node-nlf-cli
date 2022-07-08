import { dirname, resolve, basename, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promises } from 'node:fs';
import * as NLF from '@nsis/nlf';
import getStdin from 'get-stdin';
import program from 'commander';
import symbols from 'log-symbols';

// Dependencies
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { version } = JSON.parse(await promises.readFile(resolve(__dirname, '../package.json'), 'utf8'));
// Action
program
    .version(version)
    .description('CLI tool to convert NSIS Language Files to JSON and vice versa')
    .arguments('[options] <file ...>')
    .usage('[options] <file ...>')
    .option('-m, --minify', 'minify output JSON', false)
    .option('-l, --no-lines', 'suppress line-numbers in stdout', true)
    .option('-o, --output <dir>', 'set the output directory')
    .option('-s, --stdout', 'print result to stdout', false)
    .parse(process.argv);
const options = program.opts();
(async () => {
    const stdIn = await getStdin();
    if (program.args.length > 0) {
        await fileMode(program.args, options);
    }
    else if (stdIn.length > 0) {
        await streamMode(stdIn, options);
    }
    else {
        program.help();
    }
})();
async function fileMode(args, options) {
    let contents, output;
    args.map(async (input) => {
        try {
            contents = await promises.readFile(input, 'utf8');
        }
        catch (err) {
            console.warn(`${symbols.warning} ${input} not found`);
            return;
        }
        if (input.endsWith('.nlf')) {
            try {
                output = NLF.parse(contents, { stringify: true, minify: options.minify });
                await printResult(input, output, 'json');
            }
            catch (err) {
                console.error(`${symbols.error} ${input} failed`);
            }
        }
        else if (input.endsWith('.json')) {
            try {
                output = NLF.stringify(contents);
                await printResult(input, output, 'nlf');
            }
            catch (err) {
                console.error(`${symbols.error} ${input} failed`);
            }
        }
        else {
            console.warn(`${symbols.warning} ${input} skipped`);
        }
    });
}
async function streamMode(input, options) {
    let output;
    try {
        JSON.parse(input);
        output = NLF.stringify(input);
        await printResult(input, output);
    }
    catch (err) {
        if (err instanceof SyntaxError) {
            output = NLF.parse(input, { stringify: true, minify: options.minify });
            await printResult(input, output);
        }
        else {
            console.error(err);
        }
    }
}
function printResult(input, output, extension = 'json') {
    let outputFile, outputPath;
    if (options.stdout) {
        console.log(output);
    }
    else {
        outputFile = setOutName(input, `.${extension}`);
        outputPath = (options.output) ? join(options.output, outputFile) : outputFile;
        promises.writeFile(outputPath, output);
        console.log(`${symbols.success} ${input} → ${outputPath}`);
    }
}
function setOutName(file, extName) {
    return basename(file, extname(file)) + extName;
}
