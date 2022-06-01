export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Sistem Pembayaran SPP',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
        integrity:'sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU',
        crossorigin: 'anonymous'
      }
    ],
    script: [
      { hid: 'pdf', src: 'https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js', async: true, defer: true },
      { hid: 'htmlcanvas', src: 'https://unpkg.com/html2canvas@1.0.0-alpha.12/dist/html2canvas.min.js', async: true, defer: true },
      { hid: 'htmlpdf', src: 'https://raw.githack.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js', async: true, defer: true }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/tailwind.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/q-components',
    '~plugins/vue-js-modal.js',
    { src: '~/plugins/vee-validate' },
    { src: '~/plugins/vue-image-upload.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxt/postcss8'
  ],

  postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {}
		}
	},

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
  ],

  toast: {
    position: 'top-center',
    duration: 4000,
    register: [ // Register custom toasts
      {
        name: 'error',
        options: {
          type: 'error'
        }
      },
      {
        name: 'success',
        options: {
          type: 'success',

        }
      },
    ]
  },

  axios: {
    baseURL: 'http://localhost:8000'
  },

  // nuxt auth configuration
  auth: {
    strategies: {
      local: {
        token: {
          property: 'data.token',
          type: 'Bearer'
        },
        user: {
          property: 'data',
          autoFetch: true
        },
        endpoints: {
          login: { url: '/v1/login', method: 'post' },
          user: { url: '/v1/user', method: 'get'},
          logout: { url: '/v1/logout', method: 'post'}
        }
      },
    },
  },

  router: {
    middleware: ['auth']
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate/dist/rules"]
  }
}
