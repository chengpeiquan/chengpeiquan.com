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
import toc from 'markdown-it-table-of-contents'
import externalLinks from 'markdown-it-external-links'
import matter from 'gray-matter'
import { slugify } from './scripts/slugify'
import { VitePWA } from 'vite-plugin-pwa'
import WindiCSS from 'vite-plugin-windicss'

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
  base: IS_DEV ? '/' : 'https://cdn.jsdelivr.net/gh/chengpeiquan/chengpeiquan.com@gh-pages/',
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
  resolve: {
    alias: {
      '/@': resolve('src'),
      '/@img': resolve('src/assets/img'),
      '/@postcss': resolve('src/assets/postcss'),
      '/@ts': resolve('src/assets/ts'),
      '/@libs': resolve('src/libs'),
      '/@cp': resolve('src/components'),
      '/@views': resolve('src/views')
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
      extendRoute (route) {
        const path = resolve(route.component.slice(1));
        const md = fs.readFileSync(path, 'utf-8');

        const { data } = matter(md);
        if ( !data.date ) {
          data.date = new Date(+new Date() + 8 * 3600 * 1000).toISOString();
        }
        data.date = new Date(data.date).toISOString().substr(0, 19).replace(/T/, ' ');
        
        route.meta = Object.assign(route.meta || {}, {
          frontmatter: data
        });

        return route;
      },
    }),

    Markdown({
      wrapperComponent: 'detail',
      wrapperClasses: 'article-detail prose mx-auto',
      headEnabled: true,
      markdownItSetup(md) {
        md.use(Prism);
        md.use(anchor, {
          slugify,
          permalink: true,
          permalinkBefore: true,
          permalinkSymbol: '#',
          permalinkAttrs: () => ({
            'aria-hidden': true
          }),
        });
        md.use(toc, {
          includeLevel: [2, 3],
          containerClass: 'article-toc',
          slugify: (s: string) => encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+|\.+/g, '-'))
        });
        md.use(externalLinks, {
          externalClassName: 'custom-external-link',
          externalTarget: '_blank',
          externalRel: 'noopener noreferrer',
          internalDomains: [ 'chengpeiquan.com' ]
        });
      },
    }),

    ViteComponents({
      extensions: ['vue', 'md'],
      deep: true,
      customLoaderMatcher: path => path.endsWith('.md'),
      customComponentResolvers: ViteIconsResolver({
        componentPrefix: '',
      }),
    }),
    
    PurgeIcons(),

    Icons(),

    VitePWA({
      inlineRegister: false,
      manifest: {
        name: '程沛权',
        short_name: '程沛权',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/avatar-32x32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: '/avatar-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: '/avatar-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: '/avatar-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/avatar-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: '/avatar-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),

    ...WindiCSS({
      safelist: 'prose prose-sm m-auto dark'
    }),
  ]
})
