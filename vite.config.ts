import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json'
import path from 'path'
import fs from 'fs-extra'

import Pages from 'vite-plugin-pages'
import PurgeIcons from 'vite-plugin-purge-icons'
import Icons, { ViteIconsResolver } from 'vite-plugin-icons'
import ViteComponents from 'vite-plugin-components'
import Markdown from 'vite-plugin-md'
import Prism from 'markdown-it-prism'
import anchor from 'markdown-it-anchor'
import matter from 'gray-matter'
import { slugify } from './scripts/slugify'

const resolve = (dir: string): string => path.resolve(__dirname, dir);
const IS_DEV: boolean = process.env.NODE_ENV === 'development' ? true : false;

// // 版权信息配置
// const bannerPlugin = (banner) => {
//   return {
//     name: 'banner',
//     async writeBundle (NULL, bundle) {
//       for (const fileName of Object.entries(bundle)) {
//         const file = fileName[0]
//         const extRegex = new RegExp(/\.(css|js)$/i)
//         const vendorRegex = new RegExp(/vendor/)
//         if (extRegex.test(file) && !vendorRegex.test(file)) {
//           let data = fs.readFileSync('./dist/' + file, { encoding: 'utf8' })
//           data = `/* ${banner} */ ${data}`
//           fs.writeFileSync('./dist/' + file, data)
//         }
//       }
//     }
//   }
// }
// const ResolveBanner = () => {
//   return `/** 
//  * name: ${pkg.name}
//  * version: v${pkg.version}
//  * author: ${pkg.author}
//  */
//  `;
// }

// https://vitejs.dev/config/
export default defineConfig({
  base: IS_DEV ? '/' : '/',
  server: {
    port: 33333,
    // proxy: {
    //   '/foo': 'http://localhost:4567/foo',
    //   '/api': {
    //     target: 'http://jsonplaceholder.typicode.com',
    //     ws: true,
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  },
  build: {
    assetsInlineLimit: 1024 * 8,
    // rollupOptions: {
      // plugins: [
        // bannerPlugin(`/** 
        // * name: ${pkg.name}
        // * version: v${pkg.version}
        // * author: ${pkg.author}
        // */
        // `)
      // ]
    // }
  },
  alias: {
    '/@': resolve('src'),
    '/@img': resolve('src/assets/img'),
    '/@css': resolve('src/assets/css'),
    '/@styl': resolve('src/assets/styl'),
    '/@postcss': resolve('src/assets/postcss'),
    '/@js': resolve('src/assets/js'),
    '/@ts': resolve('src/assets/ts'),
    '/@fonts': resolve('src/assets/fonts'),
    '/@libs': resolve('src/libs'),
    '/@cp': resolve('src/components'),
    '/@views': resolve('src/views'),
    '/@plugins': resolve('src/plugins')
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
      '@iconify/iconify',
      'dayjs',
      'dayjs/plugin/localizedFormat',
    ],
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),

    Pages({
      pagesDir: 'src/views',
      extensions: ['vue', 'md'],
      extendRoute (route) {
        const path = resolve(route.component.slice(1))

        if ( !path.includes('projects.md') ) {
          const md = fs.readFileSync(path, 'utf-8')
          const { data } = matter(md)

          if ( !data.date ) {
            data.date = new Date();
          }
          
          route.meta = Object.assign(route.meta || {}, { frontmatter: data })
        }

        return route
      },
    }),

    Markdown({
      wrapperComponent: 'article-detail',
      wrapperClasses: 'prose m-auto',
      headEnabled: true,
      markdownItSetup(md) {
        md.use(Prism)
        md.use(anchor, {
          slugify,
          permalink: true,
          permalinkBefore: true,
          permalinkSymbol: '#',
          permalinkAttrs: () => ({ 'aria-hidden': true }),
        })
      },
    }),

    ViteComponents({
      extensions: ['vue', 'md'],
      deep: true,
      directoryAsNamespace: true,
      customLoaderMatcher: path => path.endsWith('.md'),
      customComponentResolvers: ViteIconsResolver({
        componentPrefix: '',
      }),
    }),
    
    PurgeIcons(),
    Icons(),
  ]
})
