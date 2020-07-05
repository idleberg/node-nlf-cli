'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var program = _interopDefault(require('commander'));
var symbols = _interopDefault(require('log-symbols'));
var getStdin = _interopDefault(require('get-stdin'));
var fs = require('fs');
var path = require('path');
var util = require('util');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var name = "@nsis/nlf-cli";
var version = "0.5.2";
var description = "CLI tool to convert NSIS Language Files to JSON and vice versa";
var license = "MIT";
var scripts = {
	build: "rollup --config rollup.config.js",
	dev: "npm run start",
	lint: "eslint ./src",
	start: "rollup --watch --config rollup.config.js",
	test: "ava ./test/default.js --verbose"
};
var main = "index.js";
var bin = {
	nlf: "./index.js"
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
	"@nsis/nlf": "^0.7.0",
	commander: "^5.1.0",
	"get-stdin": "^8.0.0",
	"log-symbols": "^4.0.0"
};
var devDependencies = {
	"@rollup/plugin-commonjs": "^13.0.0",
	"@rollup/plugin-json": "^4.1.0",
	"@rollup/plugin-typescript": "^5.0.1",
	"@types/node": "^14.0.14",
	"@typescript-eslint/eslint-plugin": "^3.5.0",
	"@typescript-eslint/parser": "^3.5.0",
	ava: "^2.4.0",
	eslint: "^7.4.0",
	glob: "^7.1.6",
	husky: "^4.2.5",
	rollup: "^2.19.0",
	typescript: "^3.9.6"
};
var husky = {
	hooks: {
		"pre-commit": "npm run lint"
	}
};
var pkg = {
	name: name,
	version: version,
	description: description,
	license: license,
	scripts: scripts,
	main: main,
	bin: bin,
	repository: repository,
	keywords: keywords,
	dependencies: dependencies,
	devDependencies: devDependencies,
	husky: husky
};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var dist = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });

var NLFStrings = {
    /**
     * NLF v2
     + used up to NSIS 2.0 beta 3
     */
    v2: [
        'header',
        'id',
        '^Branding',
        '^SetupCaption',
        '^UninstallCaption',
        '^LicenseSubCaption',
        '^ComponentsSubCaption',
        '^DirSubCaption',
        '^InstallingSubCaption',
        '^CompletedSubCaption',
        '^ConfirmSubCaption',
        '^UninstallingSubCaption',
        '^UnCompletedSubCaption',
        '^BackBtn',
        '^NextBtn',
        '^AgreeBtn',
        '^InstallBtn',
        '^UninstallBtn',
        '^CancelBtn',
        '^CloseBtn',
        '^BrowseBtn',
        '^ShowDetailsBtn',
        '^Name',
        '^Completed',
        '^Custom',
        '^ComponentsText',
        '^ComponentsSubText1',
        '^ComponentsSubText2',
        '^DirText',
        '^SpaceAvailable',
        '^SpaceRequired',
        '^UninstallingText',
        '^FileError_NoIgnore',
        '^CantWrite',
        '^CopyFailed',
        '^CopyTo',
        '^SymbolNotFound',
        '^CouldNotLoad',
        '^CreateFolder',
        '^CreateShortcut',
        '^CreatedUninstaller',
        '^Delete',
        '^DeleteOnReboot',
        '^ErrorCreatingShortcut',
        '^ErrorCreating',
        '^ErrorDecompressing',
        '^ErrorRegistering',
        '^ExecShell',
        '^Exec',
        '^Extract',
        '^ErrorWriting',
        '^InvalidOpcode',
        '^NoOLE',
        '^OutputFolder',
        '^RemoveFolder',
        '^RenameOnReboot',
        '^Rename',
        '^Skipped',
        '^CopyDetails',
    ],
    /**
     * NLF v6
     + used as of NSIS 2.0 beta 4
     */
    v6: [
        'header',
        'id',
        'fontname',
        'fontsize',
        'code_page',
        'rtl',
        '^Branding',
        '^SetupCaption',
        '^UninstallCaption',
        '^LicenseSubCaption',
        '^ComponentsSubCaption',
        '^DirSubCaption',
        '^InstallingSubCaption',
        '^CompletedSubCaption',
        '^UnComponentsSubCaption',
        '^UnDirSubCaption',
        '^ConfirmSubCaption',
        '^UninstallingSubCaption',
        '^UnCompletedSubCaption',
        '^BackBtn',
        '^NextBtn',
        '^AgreeBtn',
        '^AcceptBtn',
        '^DontAcceptBtn',
        '^InstallBtn',
        '^UninstallBtn',
        '^CancelBtn',
        '^CloseBtn',
        '^BrowseBtn',
        '^ShowDetailsBtn',
        '^ClickNext',
        '^ClickInstall',
        '^ClickUninstall',
        '^Name',
        '^Completed',
        '^LicenseText',
        '^LicenseTextCB',
        '^LicenseTextRB',
        '^UnLicenseText',
        '^UnLicenseTextCB',
        '^UnLicenseTextRB',
        '^Custom',
        '^ComponentsText',
        '^ComponentsSubText1',
        '^ComponentsSubText2_NoInstTypes',
        '^ComponentsSubText2',
        '^UnComponentsText',
        '^UnComponentsSubText1',
        '^UnComponentsSubText2_NoInstTypes',
        '^UnComponentsSubText2',
        '^DirText',
        '^DirSubText',
        '^DirBrowseText',
        '^UnDirText',
        '^UnDirSubText',
        '^UnDirBrowseText',
        '^SpaceAvailable',
        '^SpaceRequired',
        '^UninstallingText',
        '^UninstallingSubText',
        '^FileError',
        '^FileError_NoIgnore',
        '^CantWrite',
        '^CopyFailed',
        '^CopyTo',
        '^Registering',
        '^Unregistering',
        '^SymbolNotFound',
        '^CouldNotLoad',
        '^CreateFolder',
        '^CreateShortcut',
        '^CreatedUninstaller',
        '^Delete',
        '^DeleteOnReboot',
        '^ErrorCreatingShortcut',
        '^ErrorCreating',
        '^ErrorDecompressing',
        '^ErrorRegistering',
        '^ExecShell',
        '^Exec',
        '^Extract',
        '^ErrorWriting',
        '^InvalidOpcode',
        '^NoOLE',
        '^OutputFolder',
        '^RemoveFolder',
        '^RenameOnReboot',
        '^Rename',
        '^Skipped',
        '^CopyDetails',
        '^LogInstall',
        '^Byte',
        '^Kilo',
        '^Mega',
        '^Giga'
    ]
};

/**
 * Parses an NSIS language file string
 * @param input - NLF string
 * @returns - NLF object
 */
var parse = function (input, options) {
    if (options === void 0) { options = {}; }
    var output = {
        header: '',
        id: 0,
        font: {
            name: null,
            size: null
        },
        code_page: null,
        rtl: false,
        strings: {}
    };
    // remove all comments
    input = input.trim().replace(/^#.*(\r?\n|$)/mg, '');
    // split into lines
    var lines = input.split(/\r?\n/);
    // get NLF version
    var version = lines[0].match(/\d+$/)[0] || 6;
    lines.forEach(function (line, index) {
        var key = NLFStrings["v" + version][index];
        if (typeof key !== 'undefined' && key.startsWith('^')) {
            // Language String
            key = key.replace('^', '');
            output.strings[key] = lines[index];
        }
        else {
            // Meta Data
            switch (key) {
                case 'id':
                case 'code_page':
                    output[key] = (lines[index] === '-')
                        ? null
                        : parseInt(lines[index]);
                    break;
                case 'font':
                case 'fontname':
                    output.font.name = (lines[index] === '-')
                        ? null
                        : lines[index];
                    break;
                case 'fontsize':
                    output.font.size = (lines[index] === '-')
                        ? null
                        : parseInt(lines[index]);
                    break;
                case 'rtl':
                    output[key] = (lines[index].toUpperCase() === 'RTL')
                        ? true
                        : false;
                    break;
                default:
                    if (typeof key !== 'undefined') {
                        output[key] = lines[index];
                    }
                    break;
            }
        }
    });
    if (options.stringify === true) {
        var indentation = (options.minify === true)
            ? 0
            : 2;
        return JSON.stringify(output, null, indentation);
    }
    return output;
};
/**
 * Stringifies an NSIS language file object
 * @param input - NLF object
 * @returns - NLF string
 */
var stringify = function (input) {
    var output = [];
    var inputObj = typeof input === 'string'
        ? JSON.parse(input)
        : input;
    // get NLF version
    var version = inputObj.header.match(/\d+$/)[0] || 6;
    output.push('# Header, don\'t edit', inputObj.header);
    output.push('# Language ID', inputObj.id);
    if (typeof inputObj.font !== 'undefined' && NLFStrings["v" + version].includes('fontname')) {
        output.push("# Font and size - dash (-) means default");
        if (inputObj.font.name) {
            output.push("" + inputObj.font.name);
        }
        else {
            output.push('-');
        }
        if (inputObj.font.size) {
            output.push("" + inputObj.font.size);
        }
        else {
            output.push('-');
        }
    }
    if (NLFStrings["v" + version].includes('code_page')) {
        output.push("# Codepage - dash (-) means ASCII code page");
        if (inputObj.code_page) {
            output.push("" + inputObj.code_page);
        }
        else {
            output.push('-');
        }
    }
    if (NLFStrings["v" + version].includes('rtl')) {
        output.push("# RTL - anything else than RTL means LTR");
        if (inputObj.rtl) {
            output.push('RTL');
        }
        else {
            output.push('-');
        }
    }
    for (var key in inputObj.strings) {
        if (NLFStrings["v" + version].includes("^" + key)) {
            output.push("# ^" + key, inputObj.strings[key]);
        }
    }
    return output.join('\n');
};

exports.parse = parse;
exports.stringify = stringify;
});

var index = /*@__PURE__*/unwrapExports(dist);

// Async functions
var reada = util.promisify(fs.readFile);
var writa = util.promisify(fs.writeFile);
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
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var stdIn;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getStdin()];
            case 1:
                stdIn = _a.sent();
                if (program.args.length > 0) {
                    fileMode(program);
                }
                else if (stdIn.length > 0) {
                    streamMode(stdIn);
                }
                else {
                    program.help();
                }
                return [2 /*return*/];
        }
    });
}); })();
var fileMode = function (program) {
    var contents, output;
    program.args.map(function (input) { return __awaiter(void 0, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, reada(input, 'utf8')];
                case 1:
                    contents = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.warn(symbols.warning + " " + input + " not found");
                    return [2 /*return*/];
                case 3:
                    if (input.endsWith('.nlf')) {
                        try {
                            output = index.parse(contents, { stringify: true, minify: program.minify });
                            printResult(input, output, 'json');
                        }
                        catch (err) {
                            console.error(symbols.error + " " + input + " failed");
                        }
                    }
                    else if (input.endsWith('.json')) {
                        try {
                            output = index.stringify(contents);
                            printResult(input, output, 'nlf');
                        }
                        catch (err) {
                            console.error(symbols.error + " " + input + " failed");
                        }
                    }
                    else {
                        console.warn(symbols.warning + " " + input + " skipped");
                    }
                    return [2 /*return*/];
            }
        });
    }); });
};
var streamMode = function (input) {
    var output;
    program.stdout = true;
    program.lines = false;
    try {
        JSON.parse(input);
        output = index.stringify(input);
        printResult(input, output);
    }
    catch (err) {
        if (err instanceof SyntaxError) {
            output = index.parse(input, { stringify: true, minify: program.minify });
            printResult(input, output);
        }
        else {
            console.error(err);
        }
    }
};
var printResult = function (input, output, extension) {
    if (extension === void 0) { extension = 'json'; }
    var outputFile, outputPath;
    if (program.stdout) {
        console.log(output);
    }
    else {
        outputFile = setOutName(input, "." + extension);
        outputPath = (program.output) ? path.join(program.output, outputFile) : outputFile;
        writa(outputPath, output);
        console.log(symbols.success + " " + input + " \u2192 " + outputPath);
    }
};
var setOutName = function (file, extName) {
    return path.basename(file, path.extname(file)) + extName;
};
