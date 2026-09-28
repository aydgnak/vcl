import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    'schemas/index': './src/schemas/index.ts',
    'schemas/messages': './src/schemas/messages.ts',
    'types/index': './src/types/index.ts',
  },
  platform: 'neutral',
  format: [
    'esm',
    'cjs',
  ],
  dts: {
    sourcemap: true,
  },
  exports: true,
  publint: true,
  attw: true,
  checks: {
    legacyCjs: false,
  },
})
