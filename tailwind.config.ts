import { type Config } from 'tailwindcss'
import { theme } from 'blackwork/tailwind-config'
import typography from '@tailwindcss/typography'
import animate from 'tailwindcss-animate'

export default {
  darkMode: 'selector',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/blackwork/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme,
  plugins: [typography(), animate],
} satisfies Config
