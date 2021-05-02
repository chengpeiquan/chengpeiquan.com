import { defineConfig } from 'windicss/helpers'
import typography from 'windicss/plugin/typography'
import lineClamp from 'windicss/plugin/line-clamp'

export default defineConfig({
  darkMode: 'class',
  plugins: [
    typography,
    lineClamp
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1600px'
      }
    },
  }
})