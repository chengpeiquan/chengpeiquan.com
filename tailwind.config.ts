import typography from '@tailwindcss/typography'
import { theme } from 'blackwork/tailwind-config'
import { type Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

export default {
  darkMode: 'selector',
  content: [
    './src/app/**/*.{js,mjs,cjs,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,mjs,cjs,ts,jsx,tsx,mdx}',
    './src/contents/**/*.{js,mjs,cjs,ts,jsx,tsx,mdx}',
    './src/core/**/*.{js,mjs,cjs,ts,jsx,tsx,mdx}',
    './src/navigation.tsx',
    './node_modules/blackwork/dist/**/*.{js,mjs,cjs,ts,jsx,tsx,mdx}',
    './node_modules/@blackwork/docs/dist/**/*.{js,mjs,cjs,ts,jsx,tsx,mdx}',
    './node_modules/@blackwork/machine/dist/**/*.{js,mjs,cjs,ts,jsx,tsx,mdx}',
  ],
  theme,
  plugins: [typography(), animate],
} satisfies Config
