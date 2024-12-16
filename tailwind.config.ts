import { type Config } from 'tailwindcss'
import { theme } from 'blackwork/tailwind-config'
import typography from '@tailwindcss/typography'
import animate from 'tailwindcss-animate'

export default {
  darkMode: 'selector',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/contents/**/*.{js,ts,jsx,tsx,mdx}',
    './src/core/**/*.{js,ts,jsx,tsx,mdx}',
    './src/navigation.tsx',
    './node_modules/blackwork/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme,
  plugins: [typography(), animate],
} satisfies Config
