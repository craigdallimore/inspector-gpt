import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';

const plugins = [
  replace({
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify( 'production' )
  }),
  nodeResolve({ browser: true }),
  commonjs(),
  typescript(),
  terser(),
];

export default [{
  input: 'src/index.tsx',
  output: {
    file: 'plugin/panel-bundle.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins
}, {
  input: 'src/Popup/index.tsx',
  output: {
    file: 'plugin/popup-bundle.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins

}];
