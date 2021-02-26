/** 
 * 判断是否文章页
 * @param {object} route - Vue 路由
 * @param {string} lang - 语言缩写， e.g. en, zh-CN
 */
import { RouteRecordRaw } from 'vue-router'

const isArticle = (route: RouteRecordRaw, lang?: string): boolean => {
  if ( !route.path || typeof route.path !== 'string' ) {
    return false;
  }

  const ROUTE_NAME: string = lang ? `${lang}-article-page` : 'article-page';
  const START_PATH: string = lang ? `/${lang}/article/` : '/article/';

  return route.name !== ROUTE_NAME && route.path.startsWith(START_PATH);
}

export default isArticle;