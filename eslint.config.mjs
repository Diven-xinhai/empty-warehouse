import autfu from '@antfu/eslint-config'

export default autfu({
  ignores: [
    'deploy/**',
  ],
  rules: {
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 3,
      },
      multiline: {
        max: 1,
      },
    }],
  },
})
