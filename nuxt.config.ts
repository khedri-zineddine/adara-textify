// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  serverDir: 'server',
  srcDir: 'app',
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  imports: {
    autoImport: false,
  },
  components: {
    dirs: [],
  },
  app: {
    head: {
      title: 'Adara Textify',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Speech to text transcription powered by AI',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
    baseURL: '/',
    buildAssetsDir: '/_nuxt/',
  },
  runtimeConfig: {
    OPENAI_API_KEY:
      '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',
  },
})
