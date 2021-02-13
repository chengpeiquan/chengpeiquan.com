import { RouteRecordRaw } from 'vue-router'

/** 
 * 返回随机路由列表
 */
const shuffle = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
  for ( let i = routes.length - 1; i > 0; i-- ) {
    const j: number = Math.floor(Math.random() * (i + 1));
    const item: RouteRecordRaw = routes[i];
    routes[i] = routes[j];
    routes[j] = item;
  }

  return routes;
}

export default shuffle;