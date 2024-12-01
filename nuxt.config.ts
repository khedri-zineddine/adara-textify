// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  serverDir: 'server',
  srcDir: 'app',
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@pinia/nuxt'],
  pinia: {},
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
    ASSEMBLYAI_API_KEY: '4197449bcd0e48b8949dfcc5fed44ff0',
  },
})
