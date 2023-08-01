import { basename, dirname, join, resolve } from 'node:path';
import { globby } from 'globby';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { test } from 'uvu';
import * as assert from 'uvu/assert';

const cli = resolve(process.cwd(), 'index.mjs');
const files = await globby(resolve(process.cwd(), 'tests/fixtures/*.nlf'));

files.map(file => {
  let fileDir = dirname(file);
  let fileBase = basename(file, '.nlf');
	let jsonFile = join(fileDir, fileBase + '.json');

  test(`NLF: ${basename(file)}`, () => {
		const actual = JSON.parse(spawnSync('node', [cli, '--stdout', '--no-lines', file]).stdout.toString());
    const expected = JSON.parse(readFileSync(jsonFile, 'utf8'));

    assert.equal(actual, expected);
  });

  test(`NLF: ${basename(file)} (CRLF)`, () => {
		const actual = spawnSync('node', [cli, '--stdout', '--no-lines', '--eol crlf', file]).stdout.toString();

		assert.is(actual.split('\r\n').length, actual.split('\n').length);
  });

  test(`NLF: ${basename(file)} (LF)`, () => {
		const actual = spawnSync('node', [cli, '--stdout', '--no-lines', '--eol lf', file]).stdout.toString();

		assert.equal(actual.split('\r\n'), [actual]);
  });
});

test.run();
