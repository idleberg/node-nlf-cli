"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var meta = require('../package.json');
// Dependencies
var NLF = require("@nsis/nlf");
var program = require("commander");
var symbols = require("log-symbols");
var fs_1 = require("fs");
var path_1 = require("path");
var util_1 = require("util");
// Async functions
var reada = util_1.promisify(fs_1.readFile);
var writa = util_1.promisify(fs_1.writeFile);
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
var input, output, fileOutput;
var indentation = (program.minify) ? 0 : 2;
program.args.forEach(function (fileInput) { return __awaiter(_this, void 0, void 0, function () {
    var err_1, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!fileInput.endsWith('.nlf')) return [3 /*break*/, 5];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, reada(fileInput, 'utf8')];
            case 2:
                input = _a.sent();
                output = NLF.parse(input, false, indentation);
                fileOutput = setOutName(fileInput, '.json');
                writa(fileOutput, output);
                console.log(symbols.success + " " + fileInput + " \u2192 " + fileOutput);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error(symbols.error + " " + fileInput + " failed");
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 11];
            case 5:
                if (!fileInput.endsWith('.json')) return [3 /*break*/, 10];
                _a.label = 6;
            case 6:
                _a.trys.push([6, 8, , 9]);
                return [4 /*yield*/, reada(fileInput, 'utf8')];
            case 7:
                input = _a.sent();
                output = NLF.stringify(input);
                fileOutput = setOutName(fileInput, '.nlf');
                writa(fileOutput, output);
                console.log(symbols.success + " " + fileInput + " \u2192 " + fileOutput);
                return [3 /*break*/, 9];
            case 8:
                err_2 = _a.sent();
                console.error(symbols.error + " " + fileInput + " failed");
                return [3 /*break*/, 9];
            case 9: return [3 /*break*/, 11];
            case 10:
                console.warn(symbols.warning + " " + fileInput + " skipped");
                _a.label = 11;
            case 11: return [2 /*return*/];
        }
    });
}); });
var setOutName = function (file, extName) {
    return path_1.basename(file, path_1.extname(file)) + extName;
};
