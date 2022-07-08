# nlf-cli

[![npm](https://flat.badgen.net/npm/license/@nsis/nlf-cli)](https://www.npmjs.org/package/@nsis/nlf-cli)
[![npm](https://flat.badgen.net/npm/v/@nsis/nlf-cli)](https://www.npmjs.org/package/@nsis/nlf-cli)
[![CI](https://img.shields.io/github/workflow/status/idleberg/node-nlf-cli/CI?style=flat-square)](https://github.com/idleberg/node-nlf-cli/actions)

CLI tool to convert NSIS Language Files to JSON and vice versa

## Installation

```sh
npm install --global @nsis/nlf-cli`
```

Alternatively, you can use it without installations

```sh
npx @nsis/nlf-cli
```

## Usage

You can now use the `nlf` command to convert language files:

```sh
# Standard usage
nlf "Contrib/Language files/English.nlf"

# Alternatively, use stdin
cat "Contrib/Language files/English.nlf" | nlf
```

### Options

Running `nlf --help` list available flags

```
--version    output the version number
--minify     minify output JSON
--output     set the output directory
--stdout     print result to stdout
--help       output usage information
```

## Related

- [nlf](https://www.npmjs.org/package/@nsis/nlf) - library to convert NLF files

## License

This work is licensed under [The MIT License](https://opensource.org/licenses/MIT)
