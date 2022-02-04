import { basename, extname, join } from 'path';
import NLF from '@nsis/nlf';
import fs from 'fs';
import getStdin from 'get-stdin';
import program from 'commander';
import symbols from 'log-symbols';

var name = "@nsis/nlf-cli";
var version = "0.7.0";
var description = "CLI tool to convert NSIS Language Files to JSON and vice versa";
var license = "MIT";
var scripts = {
	build: "rollup --config",
	dev: "npm run start",
	fix: "eslint --fix ./src",
	"lint:json": "eslint ./*.json --ignore-path .gitignore",
	"lint:md": "remark . --quiet --frail --ignore-path .gitignore",
	"lint:ts": "eslint ./src --ignore-path .gitignore",
	lint: "npm-run-all --parallel lint:*",
	start: "rollup --watch --config",
	test: "ava ./test/default.mjs --verbose"
};
var files = [
	"bin/",
	"types/",
	"LICENSE",
	"README.md"
];
var bin = {
	nlf: "index.mjs"
};
var type = "module";
var typings = "types/";
var engines = {
	node: "^14.13.1 || >=16.0.0"
};
var repository = {
	type: "git",
	url: "https://github.com/idleberg/node-nlf-cli.git"
};
var keywords = [
	"nsis",
	"nsis language file",
	"converter"
];
var dependencies = {
	"@nsis/nlf": "^0.10.0",
	commander: "^7.2.0",
	"get-stdin": "^8.0.0",
	"log-symbols": "^4.1.0"
};
var devDependencies = {
	"@rollup/plugin-commonjs": "^21.0.1",
	"@rollup/plugin-json": "^4.1.0",
	"@rollup/plugin-typescript": "^8.3.0",
	"@types/node": "^16.11.22",
	"@typescript-eslint/eslint-plugin": "^5.10.2",
	"@typescript-eslint/parser": "^5.10.2",
	ava: "^4.0.1",
	eslint: "^8.8.0",
	"eslint-plugin-json": "^3.1.0",
	glob: "^7.2.0",
	husky: "^7.0.0",
	"lint-staged": "^12.3.3",
	"npm-run-all": "^4.1.5",
	prettier: "^2.5.1",
	"remark-cli": "^10.0.1",
	"remark-preset-lint-recommended": "^6.1.2",
	"remark-preset-prettier": "^1.0.0",
	rollup: "^2.67.0",
	tslib: "^2.3.1",
	typescript: "^4.5.5"
};
var pkg = {
	name: name,
	version: version,
	description: description,
	license: license,
	scripts: scripts,
	files: files,
	bin: bin,
	type: type,
	typings: typings,
	engines: engines,
	repository: repository,
	keywords: keywords,
	dependencies: dependencies,
	devDependencies: devDependencies,
	"lint-staged": {
	"*.(json|ts)": "eslint --cache --fix",
	"*.md": "prettier --write"
}
};

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
const options = program.opts();
(async () => {
    const stdIn = await getStdin();
    if (program.args.length > 0) {
        fileMode(program.args, options);
    }
    else if (stdIn.length > 0) {
        streamMode(stdIn, options);
    }
    else {
        program.help();
    }
})();
function fileMode(args, options) {
    let contents, output;
    args.map(async (input) => {
        try {
            contents = await fs.promises.readFile(input, 'utf8');
        }
        catch (err) {
            console.warn(`${symbols.warning} ${input} not found`);
            return;
        }
        if (input.endsWith('.nlf')) {
            try {
                output = NLF.parse(contents, { stringify: true, minify: options.minify });
                printResult(input, output, 'json');
            }
            catch (err) {
                console.error(`${symbols.error} ${input} failed`);
            }
        }
        else if (input.endsWith('.json')) {
            try {
                output = NLF.stringify(contents);
                printResult(input, output, 'nlf');
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
function streamMode(input, options) {
    let output;
    try {
        JSON.parse(input);
        output = NLF.stringify(input);
        printResult(input, output);
    }
    catch (err) {
        if (err instanceof SyntaxError) {
            output = NLF.parse(input, { stringify: true, minify: options.minify });
            printResult(input, output);
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
        fs.promises.writeFile(outputPath, output);
        console.log(`${symbols.success} ${input} → ${outputPath}`);
    }
}
function setOutName(file, extName) {
    return basename(file, extname(file)) + extName;
}
