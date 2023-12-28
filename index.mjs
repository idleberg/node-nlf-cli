#!/usr/bin/env node

import { dirname, resolve } from 'node:path';
import { promises as fs } from 'node:fs';
import updateNotifier from 'update-notifier';
import './bin/cli.js';

(async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const pkg = await fs.readFile(resolve(__dirname, '../package.json'), 'utf8');

  updateNotifier({
    pkg
  }).notify();
});

