import builtins from 'builtin-modules'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import nodeResolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

export default {
  external: builtins,
  input: 'index.js',
  output: { file: 'dist.js', format: 'cjs' },
  plugins: [
    json(),
    nodeResolve({ preferBuiltins: true }),
    commonjs({ ignore: ['conditional-runtime-dependency'] }),
    terser()
  ]
}
