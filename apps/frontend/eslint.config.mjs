// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  react: true,
  nextjs: true,
  rules: {
    'node/prefer-global/process': 'off',
  },
})
