/**
 * 导入npm包
 */
import NProgress from 'nprogress'
import { ViteSSG } from 'vite-ssg'
import baiduAnalytics from 'vue-baidu-analytics'
import '@purge-icons/generated'

/**
 * 导入本地依赖
 */
import { routes, scrollBehavior } from '/@/router'
import App from '/@/App.vue'

/**
 * 导入全局样式
 */
import 'windi.css'
import '/@postcss/global.postcss'
import '/@postcss/markdown.postcss'

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
      router.beforeEach(() => {
        NProgress.start()
      })
      router.afterEach(() => {
        NProgress.done()
      })
    }

    // 启动百度统计插件
    app.use(baiduAnalytics, {
      router: router,
      siteIdList: ['8dca8e2532df48ea7f1b15c714588691'],
      isDebug: false,
    })
  }
)
