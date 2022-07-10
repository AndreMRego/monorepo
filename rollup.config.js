//This plugin prevents packages listed in peerDependencies from being bundled with our component library
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

//efficiently bundles third party dependencies we've installed and use in node_modules
import resolve from '@rollup/plugin-node-resolve';

// //enables transpilation into CommonJS (CJS) format
import commonjs from '@rollup/plugin-commonjs';

//transpiled our TypeScript code into JavaScript. This plugin will use all the settings we have set in tsconfig.json.
//We set "useTsconfigDeclarationDir": true so that it outputs the .d.ts files in the directory specified by in tsconfig.json
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import path from 'path';

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
    name: PKG_JSON.name,  
  },
  external: ["react", "react-dom", "styled-components"],
  })),
  {
    input: 'dist/es/types/index.d.ts',
    output: [{ file: PKG_JSON.types, format: "esm" }],
    plugins: [dts()],
  }
];