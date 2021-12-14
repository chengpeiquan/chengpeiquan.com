import config from '@/config'
import type { RouteRecordRaw } from 'vue-router'
import type { CategoryConfigItem } from '@/types'

let routes: RouteRecordRaw[] = []
const { defaultLang, i18n } = config

// 分类配置
export const categoryConfigList: CategoryConfigItem[] = [
  {
    path: 'tech',
    text: {
      'zh-CN': '技术',
      en: 'Technology',
    },
  },
  {
    path: 'design',
    text: {
      'zh-CN': '设计',
      en: 'Design',
    },
  },
  {
    path: 'prose',
    text: {
      'zh-CN': '随笔',
      en: 'Prose',
    },
  },
]

// 根据分类配置创建分类路由
const createCategoryRoutes = (lang: string): void => {
  const result = categoryConfigList.map((item) => {
    return {
      path:
        lang === defaultLang
          ? `/category/${item.path}/:page?`
          : `/${lang}/category/${item.path}/:page?`,
      name:
        lang === defaultLang
          ? `category-${item.path}-page`
          : `${lang}-category-${item.path}-page`,
      props: true,
      component: () => import('@views/article/[page].vue'),
      meta: {
        frontmatter: {},
      },
    }
  })

  routes = [...routes, ...result]
}

// 遍历语言生成多语言分类路由
for (const lang in i18n) {
  if (Object.prototype.hasOwnProperty.call(i18n, lang)) {
    createCategoryRoutes(lang)
  }
}

export default routes
