import { defineConfig } from 'tsdown'

export default defineConfig({
  outDir: 'dist',
  entry: './src/index.ts',
  platform: 'neutral',
  clean: true,
  dts: {
    sourcemap: true,
  },
})
