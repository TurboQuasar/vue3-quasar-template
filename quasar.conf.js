/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const { configure } = require('quasar/wrappers');
const path = require('path');
const timeStamp = new Date().getTime();
module.exports = configure(function (/* ctx */) {
  return {
    // https://quasar.dev/quasar-cli/supporting-ts
    supportTS: {
      tsCheckerConfig: {
        eslint: {
          enabled: false,
          files: './src/**/*.{ts,tsx,js,jsx,vue}',
        },
      },
    },

    // https://quasar.dev/quasar-cli/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/boot-files
    boot: [
      'axios',
      'swiper',
      'permission',
      'config',
      'v-md-editor',
      'router',
      'mock',
      'i18n',
      'echarts',
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css  src/css
    css: [
      'app.scss',
      'main.css',
      'transition.css',
      'vqt.css',
      'iconfont/iconfont.css',
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'fontawesome-v5',
      'material-icons', // optional, you are not bound to it
    ],

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      vueRouterMode: 'history', // available values: 'hash', 'history'
      env: Object.assign(
        require('dotenv').config({}).parsed,
        require('dotenv').config({
          path: `.env.${process.env.NODE_ENV}`,
        }).parsed
      ),
      // transpile: false,
      // vueCompiler: true,
      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      // transpileDependencies: [
      //   '@kangc'
      // ],

      // rtl: false, // https://quasar.dev/options/rtl-support
      // preloadChunks: true,
      showProgress: false,
      gzip: true,
      analyze: true,
      sourceMap: process.env.NODE_ENV !== 'production',

      // Options below are automatically set depending on the env, set them if you want to override
      extractCSS: false,

      // https://quasar.dev/quasar-cli/handling-webpack
      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpack(/* chain */ config) {
        //
        if (
          process.env.NODE_ENV === 'production' &&
          process.env.MIRAGE_ENABLED !== 'true'
        ) {
          config.module
            .rule('exclude-mirage')
            .test(/node_modules\/miragejs\//)
            .use('null-loader')
            .loader('null-loader');
        }
      },
      extendWebpack(cfg) {
        cfg.resolve.alias = {
          ...cfg.resolve.alias, // This adds the existing alias
          // Add your own alias like this
          router: path.resolve(__dirname, './src/router'),
          utils: path.resolve(__dirname, './src/utils'),
          store: path.resolve(__dirname, './src/store'),
          boot: path.resolve(__dirname, './src/boot'),
          src: path.resolve(__dirname, './src'),
          css: path.resolve(__dirname, './src/css'),
          mock: path.resolve(__dirname, './src/mock'),
          models: path.resolve(__dirname, './src/models'),
          enums: path.resolve(__dirname, './src/enums'),
          classes: path.resolve(__dirname, './src/classes'),
        };
        // for i18n resources (json/json5/yaml)
        cfg.module.rules.push({
          test: /\.(json5?|ya?ml)$/, // target json, json5, yaml and yml files
          type: 'javascript/auto',
          // Use `Rule.include` to specify the files of locale messages to be pre-compiled
          include: [path.resolve(__dirname, './src/i18n')],
          loader: '@intlify/vue-i18n-loader',
        });

        // for i18n custom block
        cfg.module.rules.push({
          resourceQuery: /blockType=i18n/,
          type: 'javascript/auto',
          loader: '@intlify/vue-i18n-loader',
        });
      },
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 8080,
      open: true, // opens browser window automatically
    },

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      config: {},
      // Possible values for "importStrategy":
      // * 'auto' - (DEFAULT) Auto-import needed Quasar components & directives
      // * 'all'  - Manually specify what to import
      importStrategy: 'auto',
      iconSet: 'material-icons', // Quasar icon set
      lang: 'zh-CN', // Quasar language pack

      // For special cases outside of where the auto-import stategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      components: ['QSpinnerGrid'],

      directives: ['ClosePopup', 'Ripple'],

      // Quasar plugins
      plugins: [
        'LoadingBar',
        'Dialog',
        'Notify',
        'Cookies',
        'QAjaxBar',
        'TouchPan',
        'QMenu',
        'AppFullscreen',
      ],
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW
      manifest: {
        name: 'template',
        short_name: 'template',
        description: 'vue3 quasar template',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'vue3-quasar-template',
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpack(/* chain */) {
        // do something with the Electron main process Webpack cfg
        // extendWebpackMain also available besides this chainWebpackMain
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpackPreload(/* chain */) {
        // do something with the Electron main process Webpack cfg
        // extendWebpackPreload also available besides this chainWebpackPreload
      },

      // Webpack 函数式配置
      configureWebpack: (config) => {
        config.module.rules = [
          ...config.module.rules,
          {
            test: /\.md$/i,
            loader: 'raw-loader',
          },
        ];
        // 生产环境配置
        if (process.env.NODE_ENV === 'production') {
          // 消除 console 输出信息
          config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;

          // Gzip 压缩
          const CompressionPlugin = require('compression-webpack-plugin');
          config.plugins.push(
            new CompressionPlugin({
              algorithm: 'gzip', //
              test: /\.(js|css|woff|woff2|svg)$/, // 哪些文件会被压缩
              threshold: 10240, // 对超过10k的数据压缩
              deleteOriginalAssets: false, // 不删除压缩前的文件，如果浏览器不支持 Gzip ,则会加载源文件
              minRatio: 0.8, // 压缩比大于 0.8 的文件将不会被压缩
            })
          );

          // 将 js 文件夹添加时间戳，这样浏览器不会加载上个版本缓存的代码
          config.output.filename = `js/[name].${timeStamp}.js`;
          config.output.chunkFilename = `js/[name].${timeStamp}.js`;
        } else {
          // 开发环境配置
        }
      },
    },
  };
});
