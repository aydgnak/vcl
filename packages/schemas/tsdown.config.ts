import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    index: './src/index.ts',
    messages: './src/messages.ts',
  },
  platform: 'neutral',
  format: [
    'esm',
    'cjs',
  ],
  dts: {
    sourcemap: true,
  },
})
