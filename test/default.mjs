// Dependencies
import { basename, dirname, join, resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { globby } from 'globby';
import test from 'ava';

const __dirname = resolve(dirname(''));
const cli = resolve(__dirname, 'index.mjs');

(async () => {
  const files = await globby(resolve(__dirname, 'test/fixtures/*.nlf'));

  files.map(file  => {
    let fileDir = dirname(file);
    let fileBase = basename(file, '.nlf');

    test(`NLF: ${basename(file)}`, t => {
      const actual = JSON.parse(spawnSync('node', [cli, '--stdout', '--no-lines', file]).stdout.toString());

      let jsonFile = join(fileDir, fileBase + '.json');
      let expected = JSON.parse(readFileSync(jsonFile, 'utf8'));

      t.deepEqual(actual, expected);
    });
  });
})();
