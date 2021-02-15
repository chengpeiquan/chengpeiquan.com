import autoRoutes from 'pages-generated'
import { RouterScrollBehavior } from 'vue-router'


/** 
 * 定义路由
 */
export const routes = autoRoutes.map( (route) => {
  console.log(route);
  
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
export const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  return savedPosition ? savedPosition : {
    top: 0,
    left: 0
  }
}