const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

export default defineNuxtConfig({
  modules: [
    // '@nuxtjs/i18n'
  ],
  components: {
    dirs: [
      {
        path: "~/components",
      },
    ],
  },
  srcDir: "source",
  dir: {
    pages: "views",
  },
  vite: {
    mode: process.env.mode,
    envDir: "../environments",
    envPrefix: "__",
    css: {
      modules: {
        generateScopedName: IS_DEVELOPMENT
          ? "[path][local]-[contenthash:5]"
          : "[contenthash:5]",
      },
    },
  },
  devServer: {
    port: 80,
  },
  // i18n: {
  //   locales: ['zh', 'en'],
  //   vueI18n: {
  //     legacy: false,
  //     locale: 'zh'
  //   }
  // }
});
