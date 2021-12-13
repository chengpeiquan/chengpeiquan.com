import type { RouteRecordRaw } from 'vue-router'

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
const routes: RouteRecordRaw[] = categories.map((item) => {
  return {
    path: `/cooking/${item.path}/:page?`,
    name: `cooking-${item.path}-page`,
    props: true,
    component: () => import('@views/cookbook/[page].vue'),
    meta: {
      frontmatter: {},
    },
  }
})

export default routes
