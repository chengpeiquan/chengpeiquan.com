const typography = require('windicss/plugin/typography')
const lineClamp = require('windicss/plugin/line-clamp')

module.exports = {
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
}
