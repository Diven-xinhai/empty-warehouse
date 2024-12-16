import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      collections: {
        custom: FileSystemIconLoader('./assets/icons'),
      },
    }),
    presetWebFonts(),
  ],
  transformers: [
    transformerVariantGroup(),
  ],
  safelist: ['z-9999!'],
  theme: {
    colors: {
      'primary': '#0054A3',
      'title': '#171B25',
      'sub-title': '#6D7278',
      'desc': '#5E5E5E',
    },
  },
  rules: [
    [/^line-clamp-(\d)/, ([, d]) => ({
      'overflow': 'hidden',
      'text-overflow': 'ellipsis',
      'display': '-webkit-box',
      '-webkit-line-clamp': d,
      '-webkit-box-orient': 'vertical',
    })],
  ],
})
