# nlf-cli

[![npm](https://flat.badgen.net/npm/license/@nsis/nlf-cli)](https://www.npmjs.org/package/@nsis/nlf-cli)
[![npm](https://flat.badgen.net/npm/v/@nsis/nlf-cli)](https://www.npmjs.org/package/@nsis/nlf-cli)
[![CircleCI](https://flat.badgen.net/circleci/github/idleberg/node-nlf-cli)](https://circleci.com/gh/idleberg/node-nlf-cli)
[![David](https://flat.badgen.net/david/dep/idleberg/node-nlf-cli)](https://david-dm.org/idleberg/node-nlf-cli)
[![David](https://flat.badgen.net/david/dev/idleberg/node-nlf-cli)](https://david-dm.org/idleberg/node-nlf-cli?type=dev)

CLI tool to convert NSIS Language Files to JSON and vice versa

## Installation

`yarn global add @nsis/nlf-cli || npm install --global @nsis/nlf-cli`

## Usage

You can now use the `nlf` command to convert language files:

```sh
nlf Contrib/Language\ files/English.nlf
```

### Options

Running `nlf --help` list available flags

```
--version    output the version number
--minify     minifies output JSON
--no-colors  suppresses colors in stdout
--no-lines   suppresses line-numbers in stdout
--stdout     print result to stdout
--help       output usage information
```

## Related

- [nlf-cli](https://www.npmjs.org/package/@nsis/nlf) - command-line tool to convert NLF files

## License

This work is licensed under [The MIT License](https://opensource.org/licenses/MIT)

## Donate

You are welcome support this project using [Flattr](https://flattr.com/submit/auto?user_id=idleberg&url=https://github.com/idleberg/node-nlf-cli) or Bitcoin `17CXJuPsmhuTzFV2k4RKYwpEHVjskJktRd`
