import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: false,
  ignores: [
    'apps',
    'packages',
  ],
})
