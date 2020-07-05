// Dependencies
import glob from 'glob';
import test from 'ava';
import { basename, dirname, join } from 'path';
import { readFileSync } from 'fs';
import { spawnSync } from 'child_process';

const cli = join(process.cwd(), 'index.js');

glob(join(__dirname, '/fixtures/*.nlf'), (err, files) => {
  files.map(file  => {
    let fileDir = dirname(file);
    let fileBase = basename(file, '.nlf');

    test(`NLF: ${basename(file)}`, t => {
      const actual = JSON.parse(spawnSync(cli, ['--stdout', '--no-lines', file]).stdout.toString());

      let jsonFile = join(fileDir, fileBase + '.json');
      let expected = JSON.parse(readFileSync(jsonFile, 'utf8'));

      t.deepEqual(actual, expected);
    });
  });
});
