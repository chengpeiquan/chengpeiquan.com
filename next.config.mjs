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
    const config = {
      netease: {
        sources: ['/topic/netease/:slug*', '/article/my-netease'],
        destination: '/article/my-five-years-working-at-netease',
      },
      rss: {
        sources: ['/feed', '/feed/', '/feed.atom', '/feed.json'],
        destination: '/feed.xml',
      },
    }

    return Object.values(config).flatMap(({ sources, destination }) =>
      sources.map((source) => ({
        source,
        destination,
        permanent: true,
      })),
    )
  },
}

export default withNextIntl(nextConfig)
