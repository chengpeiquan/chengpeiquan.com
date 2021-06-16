import { RouteRecordRaw, RouterScrollBehavior } from 'vue-router'
import autoRoutes from 'virtual:generated-pages'
import categoryRoutes from './categories'

/**
 * 定义路由
 */
export const routes: Array<RouteRecordRaw> = [
  ...autoRoutes,
  ...categoryRoutes,
].map((route: RouteRecordRaw) => {
  if (
    String(route.name).endsWith('article-page') &&
    !route.path.endsWith('?')
  ) {
    route.path += '?'
  }

  return {
    ...route,
    alias: route.path.endsWith('/')
      ? `${route.path}index.html`
      : `${route.path}.html`,
  }
})

/**
 * 路由切换后的页面定位
 */
export const scrollBehavior: RouterScrollBehavior = (
  to,
  from,
  savedPosition
) => {
  return savedPosition
    ? savedPosition
    : {
        top: 0,
        left: 0,
      }
}
