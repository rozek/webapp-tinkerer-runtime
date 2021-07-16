// see https://remarkablemark.org/blog/2019/07/12/rollup-commonjs-umd/

import commonjs   from '@rollup/plugin-commonjs'
import resolve    from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser'

export default {
  input: './src/webapp-tinkerer-runtime.ts',
  external:[                                 // list of (unbundled) dependencies
    'jquery',                                // partial bundling
  ],
  output: {
    file:      './dist/webapp-tinkerer-runtime.js',
    format:    'cjs',
    name:      'WAT',
    globals:   { 'jquery':'jQuery' },
    noConflict:true,
    sourcemap: true,
  },
  plugins: [
    resolve(), commonjs(), typescript(),
  ],
};
