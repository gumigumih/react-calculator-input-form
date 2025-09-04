import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: './dist',
    }),
    postcss({
      extract: false,        // CSSをJavaScript内にインライン化
      inject: true,          // スタイルを自動的にDOMに注入
      minimize: true,        // CSSを圧縮
      sourceMap: true,       // ソースマップ生成
      modules: false,        // CSSモジュールは無効
      autoModules: false,    // 自動モジュール化は無効
    }),
    copy({
      targets: [
        { src: 'src/styles', dest: 'dist' }
      ]
    }),
  ],
  external: ['react', 'react-dom'],
};
