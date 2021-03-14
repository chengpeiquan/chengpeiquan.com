// const title

const categories = [
  {
    path: 'tech',
    text: {
      'zh-CN': '技术',
      en: 'technology'
    }
  },
  {
    path: 'prose',
    text: {
      'zh-CN': '随笔',
      en: 'prose'
    }
  }
]

const routes = categories.map( item => {
  return {
    path: `/category/${item.path}/:page?`,
    name: `category-${item.path}-page`,
    props: true,
    component: () => import('/src/views/article/[page].vue'),
    meta: {
      frontmatter: {

      }
    }
  }
});

export default routes;