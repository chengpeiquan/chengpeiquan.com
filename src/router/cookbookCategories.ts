import type { RouteRecordRaw } from 'vue-router'

let routes: RouteRecordRaw[] = []

// 分类配置
export const categories = [
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
const getCategories = (): void => {
  const result = categories.map((item) => {
    return {
      path: `/cookbook/${item.path}/:page?`,
      name: `cookbook-${item.path}-page`,
      props: true,
      component: () => import('/src/views/cookbook/[page].vue'),
      meta: {
        frontmatter: {},
      },
    }
  })

  routes = [...routes, ...result]
}
getCategories()

export default routes
