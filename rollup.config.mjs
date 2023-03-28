import typescript from '@rollup/plugin-typescript';
import solid from 'rollup-plugin-solid';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.tsx',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    nodeResolve({ browser: true }),
    commonjs(),
    typescript(),
    solid(),
    terser(),
  ],
};
