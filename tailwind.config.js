const typography = require('@tailwindcss/typography')

module.exports = {
  purge: [],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        '3xl': '1600px'
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--fg)',
            a: { color: 'var(--fg-deeper)' },
            b: { color: 'var(--fg-deep)' },
            code: { color: 'var(--fg-deep)' },
            strong: { color: 'var(--fg-deep)' },
            em: { color: 'inherit' },
            h1: { color: 'var(--fg-deeper)' },
            h2: { color: 'var(--fg-deep)' },
            h3: { color: 'inherit' },
            h4: { color: 'inherit' },
            blockquote: { color: 'inherit' },
          },
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    typography
  ],
}
