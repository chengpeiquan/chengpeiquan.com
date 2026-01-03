import { type NextConfig } from 'next'
import createNextIntl from 'next-intl/plugin'

const withNextIntl = createNextIntl()

const nextConfig: NextConfig = {
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
