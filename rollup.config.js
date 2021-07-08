// see https://remarkablemark.org/blog/2019/07/12/rollup-commonjs-umd/

import commonjs   from '@rollup/plugin-commonjs'
import resolve    from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser'

export default {
  input: './src/webapp-tinkerer-runtime.ts',
  output: {
    file:      './dist/webapp-tinkerer-runtime.js',
    format:    'iife',
    name:      'WAT', // required for UMD modules
    noConflict:true,
    sourcemap: true,
    exports:   'default',
  },
  plugins: [
    resolve(), commonjs(), typescript(),
    terser({ format:{ comments:false, safari10:true } })
  ],
};
