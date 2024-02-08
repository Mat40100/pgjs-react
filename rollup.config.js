import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import packageJson from "./package.json" assert { type: "json" };
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import generatePackageJson from 'rollup-plugin-generate-package-json'

const bundle = (config) => ({
  ...config,
  input: "src/index.ts"});

export default [
  bundle({
    plugins: [esbuild(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      generatePackageJson({
        baseContents: (pkg) => ({
          name: pkg.name,
          main: './index.js',
          types: './types/index.d.ts',
          version: pkg.version,
          dependencies: {},
          private: true,
        }),
      })
    ],
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: packageJson.types,
      format: "es",
    },
  }),
];
