# nlf-cli

[![npm](https://flat.badgen.net/npm/license/@nsis/nlf-cli)](https://www.npmjs.org/package/@nsis/nlf-cli)
[![npm](https://flat.badgen.net/npm/v/@nsis/nlf-cli)](https://www.npmjs.org/package/@nsis/nlf-cli)
[![CI](https://img.shields.io/github/workflow/status/idleberg/node-nlf-cli/CI?style=flat-square)](https://github.com/idleberg/node-nlf-cli/actions)
[![David](https://flat.badgen.net/david/dep/idleberg/node-nlf-cli)](https://david-dm.org/idleberg/node-nlf-cli)

CLI tool to convert NSIS Language Files to JSON and vice versa

## Installation

`yarn global add @nsis/nlf-cli || npm install --global @nsis/nlf-cli`

## Usage

You can now use the `nlf` command to convert language files:

```sh
# Standard usage
nlf Contrib/Language\ files/English.nlf

# Alternatively, use stdin
cat Contrib/Language\ files/English.nlf | nlf
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
