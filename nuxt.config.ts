// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    baseURL: '/',
    head: {
      title: '青鸟翼联工业互联网',
      link: [{ rel: 'icon', href: '/favicon.ico' }],
      htmlAttrs: {
        lang: 'zh',
      },
      meta: [
        { charset: 'utf-8' },
        { 'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge,chrome=1' },
        { 'http-equiv': 'Cache-Control', 'content': 'no-transform' },
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0',
        },
        { name: 'author', content: '青鸟翼联工业互联网' },
        { property: 'og:title', content: '青鸟工互' },
        {
          name: 'keywords',
          content:
            '山东青鸟、山东青鸟工业物联网、青鸟翼联平台、http://portal.qniiot.com',
        },
      ],
    },
  },
  nitro: {
    compressPublicAssets: true,
  },
  routeRules: {
    '/manage/*': { ssr: false },
  },
  modules: ['nuxt-swiper', '@unocss/nuxt', '@nuxt/image', '@element-plus/nuxt', '@nuxt/ui'],
  image: {
    quality: 80,
  },
  css: ['assets/styles/reset.scss', 'aos/dist/aos.css'],
  plugins: [
    {
      src: '~/plugins/console-custom.ts',
      // mode: "client",
    },
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/var.scss" as *;',
        },
      },
    },
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },
})
