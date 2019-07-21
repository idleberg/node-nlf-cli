// Dependencies
import glob from 'glob';
import test from 'ava';
import { basename, dirname, join } from 'path';
import { readFileSync } from 'fs';
import { spawn, spawnSync } from 'child_process';

const cli = join(process.cwd(), 'index.js');

glob(join(__dirname, '/fixtures/*.nlf'), async (err, files) => {
  files.forEach( async file  => {
    let fileDir = dirname(file);
    let fileBase = basename(file, '.nlf');

    test(`NLF: ${basename(file)}`, async t => {
      const actual = JSON.parse(spawnSync(cli, ['--stdout', '--no-color', '--no-lines', file]).stdout.toString());


      let jsonFile = join(fileDir, fileBase + '.json');
      let expected = JSON.parse(readFileSync(jsonFile, 'utf8'));

      t.deepEqual(actual, expected);
    });
  });
});
