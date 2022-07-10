import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import path from 'path';
import babel from "@rollup/plugin-babel";

const extensions =  ['.ts', '.tsx'];

const PACKAGE_ROOT_PATH = process.cwd();
const INPUT_FILE = path.join(PACKAGE_ROOT_PATH, 'src/index.ts');
const OUTPUT_DIR = path.join(PACKAGE_ROOT_PATH, 'dist');
const PKG_JSON = require(path.join(PACKAGE_ROOT_PATH, 'package.json'));


const plugins = [
  peerDepsExternal(),
  resolve({ extensions }),
  typescript({ tsconfig: '../../tsconfig.json'}),
  commonjs({
    include: /node_modules/,
  }),
  terser(),
  babel({
    extensions,
    exclude: ["node_modules/**"],
    babelHelpers: "bundled",
    babelrc: true,
  }),
];

const formats = [
  { format: 'es' },
  { format: 'cjs' },
];

export default [
  ...formats.map(({ format }) => ({
  plugins,
  input: INPUT_FILE,
  output: {
    file: path.join(OUTPUT_DIR, `${format}`, `index.js`),
    format: format,
    sourcemap: true,
    name: PKG_JSON.name,  },
  })),
  {
    input: 'dist/es/types/index.d.ts',
    output: [{ file: PKG_JSON.types, format: "esm" }],
    plugins: [dts()],
  }
];