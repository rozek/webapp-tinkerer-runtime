// see https://remarkablemark.org/blog/2019/07/12/rollup-commonjs-umd/

import commonjs   from '@rollup/plugin-commonjs'
import resolve    from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser'

export default {
  input: './src/webapp-tinkerer-runtime.ts',
  output: [{
    file:      './dist/webapp-tinkerer-runtime.js',
    format:    'umd',
    name:      'WAT',
    noConflict:true,
    sourcemap: true,
  },{
    file:      './dist/webapp-tinkerer-runtime.min.js',
    format:    'umd',
    name:      'WAT',
    noConflict:true,
    sourcemap: true,
    plugins: [ terser({ format:{ comments:false, safari10:true } }) ],
  },{
    file:     './dist/webapp-tinkerer-runtime.esm.js',
    format:   'esm',
    sourcemap:true,
  }],
  plugins: [
    resolve(), commonjs(), typescript(),
  ],
};
