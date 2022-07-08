#!/usr/bin/env node

import { dirname, join, resolve } from 'node:path';
import { promises as fs } from 'node:fs';
import updateNotifier from 'update-notifier';
import './bin/cli.mjs';

(async () => {
  const __dirname = resolve(dirname('')); 
  const pkg = await fs.readFile(join(__dirname, './package.json'), 'utf8');

  updateNotifier({
    pkg
  }).notify();
});

