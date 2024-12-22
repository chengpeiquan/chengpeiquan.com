// @ts-check
import createNextIntl from 'next-intl/plugin'
import autoImport from 'unplugin-auto-import/webpack'

const withNextIntl = createNextIntl()

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.chengpeiquan.com',
      },
    ],
  },
  webpack: (config) => {
    config.plugins.push(
      autoImport({
        imports: ['react', { react: ['createContext'] }, 'react-router-dom'],
        dts: './src/types/declaration-files/auto-imports.d.ts',
      }),
    )
    return config
  },
  async redirects() {
    return [
      {
        source: '/topic/netease/:slug*',
        destination: '/article/my-five-years-working-at-netease',
        permanent: true,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
