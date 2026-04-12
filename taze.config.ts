import { defineConfig } from 'taze'

// Keep routine upgrades conservative while still surfacing known-safe package policies.
export default defineConfig({
  recursive: true,
  force: true,
  write: false,
  install: false,
  exclude: [
    'tailwind-merge',
    'tailwindcss',
    '@tailwindcss/typography',
    'tailwindcss-animate',
    'postcss',
  ],
  packageMode: {
    '/^@bassist/': 'latest',
    '/^@re-dev/': 'latest',
    blackwork: 'latest',
    typescript: 'latest',
  },
})
