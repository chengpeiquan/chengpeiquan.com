/**
 * 导入npm包
 */
import progress from '@bassist/progress'
import { ViteSSG } from 'vite-ssg'
import { createVueBaiduAnalytics } from '@web-analytics/vue'
import '@purge-icons/generated'

/**
 * 导入本地依赖
 */
import { routes, scrollBehavior } from '@/router'
import App from '@/App.vue'

/**
 * 导入全局样式
 */
import 'windi.css'
import '@postcss/global.postcss'
import '@postcss/markdown.postcss'

const { registerBaiduAnalytics } = createVueBaiduAnalytics()

/**
 * 创建实例
 */
export const createApp = ViteSSG(
  // 根组件
  App,

  // 路由选项
  { routes, scrollBehavior },

  // 一些全局的自定义配置功能
  ({ app, router, isClient }) => {
    // 路由切换的加载进度条
    if (isClient) {
      progress.setColor('#db2777')
      router.beforeEach(() => {
        progress.start()
      })
      router.afterEach(() => {
        progress.done()
      })
    }

    // 启动百度统计插件
    app.use(registerBaiduAnalytics, {
      router,
      websiteIds: ['8dca8e2532df48ea7f1b15c714588691'],
    })
  }
)
