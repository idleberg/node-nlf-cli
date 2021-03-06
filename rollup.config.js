import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

const plugins = [
  commonjs(),
  json(),
  typescript({
    allowSyntheticDefaultImports: true,
    strictNullChecks: true
  })
];

export default [
  {
    input: './src/cli.ts',
    output: {
      dir: 'bin',
      format: 'cjs'
    },
    plugins: plugins
  }
];
