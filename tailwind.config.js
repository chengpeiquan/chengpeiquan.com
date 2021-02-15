const typography = require('@tailwindcss/typography')
const lineClamp = require('@tailwindcss/line-clamp')

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './index.html',
      './src/**/*.vue',
      './src/**/*.md',
      './src/**/*.js',
      './src/**/*.ts',
    ],
    options: {
      safelist: ['prose', 'prose-sm', 'm-auto', 'article-list'],
    },
  },
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
    typography,
    lineClamp
  ],
}
