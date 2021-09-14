import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json'
import path from 'path'
import fs from 'fs-extra'
import Pages from 'vite-plugin-pages'
import PurgeIcons from 'vite-plugin-purge-icons'
import Icons, { ViteIconsResolver } from 'vite-plugin-icons'
import ViteComponents from 'unplugin-vue-components/vite'
import Markdown from 'vite-plugin-md'
import Prism from 'markdown-it-prism'
import anchor from 'markdown-it-anchor'
import toc from 'markdown-it-table-of-contents'
import externalLinks from 'markdown-it-external-links'
import implicitFigures from 'markdown-it-implicit-figures'
import matter from 'gray-matter'
import WindiCSS from 'vite-plugin-windicss'
import Banner from 'vite-plugin-banner'
import { slugify } from './scripts/slugify'
import dayjs from './src/libs/dayjs'
import isDev from './src/libs/isDev'

const resolve = (dir: string): string => path.resolve(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
  base: isDev
    ? '/'
    : 'https://cdn.jsdelivr.net/gh/chengpeiquan/chengpeiquan.com@gh-pages/',
  server: {
    port: 33333,
    proxy: {
      '/api': 'https://chengpeiquan.com/api',
    },
  },
  build: {
    assetsInlineLimit: 1024 * 8,
  },
  resolve: {
    alias: {
      '/@': resolve('src'),
      '/@img': resolve('src/assets/img'),
      '/@postcss': resolve('src/assets/postcss'),
      '/@ts': resolve('src/assets/ts'),
      '/@libs': resolve('src/libs'),
      '/@cp': resolve('src/components'),
      '/@views': resolve('src/views'),
    },
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
      '@iconify/iconify',
      'dayjs',
      'dayjs/plugin/localizedFormat',
      'dayjs/plugin/relativeTime',
      'dayjs/locale/zh-cn',
    ],
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),

    Pages({
      pagesDir: 'src/views',
      extensions: ['vue', 'md'],
      extendRoute(route) {
        const path = resolve(route.component.slice(1))
        const md = fs.readFileSync(path, 'utf-8')

        const { data } = matter(md)
        if (!data.date) {
          data.date = Date.now()
        }
        data.date = dayjs(new Date(data.date)).format('YYYY/MM/DD HH:mm:ss')

        route.meta = Object.assign(route.meta || {}, {
          frontmatter: data,
        })

        return route
      },
    }),

    Markdown({
      wrapperComponent: 'detail',
      wrapperClasses: 'article-content prose mx-auto',
      headEnabled: true,
      markdownItSetup(md) {
        md.use(Prism)
        md.use(anchor, {
          slugify,
          permalink: true,
          permalinkBefore: true,
          permalinkSymbol: '#',
          permalinkAttrs: () => ({
            'aria-hidden': true,
          }),
        })
        md.use(toc, {
          includeLevel: [2, 3, 4],
          containerClass: 'article-toc prose',
          slugify: (s: string) =>
            encodeURIComponent(
              String(s)
                .trim()
                .toLowerCase()
                .replace(/\s+|\.+/g, '-')
            ),
        })
        md.use(externalLinks, {
          externalClassName: 'custom-external-link',
          externalTarget: '_blank',
          externalRel: 'noopener noreferrer',
          internalDomains: ['chengpeiquan.com'],
        })
        md.use(implicitFigures, {
          figcaption: true,
        })
      },
    }),

    ViteComponents({
      extensions: ['vue', 'md'],
      deep: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: true,
      resolvers: [
        ViteIconsResolver({
          componentPrefix: '',
        }),
      ],
    }),

    PurgeIcons(),

    Icons(),

    ...WindiCSS({
      safelist: 'prose prose-sm m-auto dark',
    }),

    Banner(
      `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`
    ),
  ],
})
