module.exports = {
  content: ['./components/**/*.{vue,js}', './layouts/**/*.{vue}', './pages/**/*.{vue}', './plugins/**/*.{js,ts}', './nuxt.config.{js,ts}'],
  theme: {
    extend: {
      fontSize: {
				h1: '24px',
				h2: '22x',
				h3: '20px',
				h4: '18px',
        h5: '16px',
				body: '14px',
				caption: '12px',
        'caption-sm': '10px',
        'caption-xs': '8px'
			},
      colors: {
				primary: { DEFAULT: '#009FC6', dark: '#036BAA', light: '#AEF4FC' },
				secondary: { DEFAULT: '#F2F2F2', dark: '#E3E2E2', light: '#FBFBFB' },
				warning: { DEFAULT: '#FFB300', dark: '#E87808', light: '#FFE8B1' },
				danger: { DEFAULT: '#FC4747', dark: '#CF1C1C', light: '#FFCBCB' },
				success: { DEFAULT: '#0BAC31', dark: '#0B6922', light: '#D1F0D8' },
        black: { DEFAULT: '#393939', dark: '#131313', light: '#9E9E9E' }
			}
    },
  },
  plugins: [],
}
