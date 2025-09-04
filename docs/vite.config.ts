import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath, URL } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  base: '/react-calculator-input-form/',
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@gumigumih/react-calculator-input-form/styles', replacement: resolve(__dirname, '../src/styles/calculator.css') },
      { find: '@gumigumih/react-calculator-input-form', replacement: resolve(__dirname, '../src/index.ts') },
    ],
  },
  server: {
    fs: {
      allow: [
        resolve(__dirname, '../'),
      ],
    },
  },
});
