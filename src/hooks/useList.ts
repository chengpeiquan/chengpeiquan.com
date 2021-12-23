import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import isDev from '@libs/isDev'
import isArticle from '@libs/isArticle'
import isCookbook from '@libs/isCookbook'
import config from '@/config'
import { useDate, useI18n } from '@/hooks'
import type { RouteRecordRaw } from 'vue-router'
import type {
  RouteMeta,
  CategoryConfigItem,
  CategoryItem,
  CategoryListInfo,
  ArticleItem,
} from '@/types'

/**
 * @param type - 列表类型，article=博客文章，cookbook=菜谱
 * @param categoryPath - 分类的路径，用于拼接分类文章列表的地址
 */
export function useList({ type, categoryPath }: CategoryListInfo) {
  // 获取语言
  const { lang } = useI18n()

  /**
   * 获取路由列表
   * @description 提取文章详情页的路由并按日期排序
   * @param param0
   * @returns
   */
  const getRouteList = (): RouteRecordRaw[] => {
    const route = useRoute()
    const router = useRouter()
    const { defaultLang } = config

    // 判断当前是否分类列表
    const isCategory = computed(() => {
      const path =
        lang.value === defaultLang
          ? `/${categoryPath}`
          : `/${lang.value}/${categoryPath}`
      return route.path.startsWith(path)
    })

    // 判断是否有效项目
    const isValidItem = (item: RouteRecordRaw): boolean => {
      switch (type) {
        case 'article':
          return isArticle(item, lang.value)
        case 'cookbook':
          return isCookbook(item)
        default:
          return false
      }
    }

    // 获取路由列表
    const routeList: RouteRecordRaw[] = router
      .getRoutes()
      .filter((item) => {
        // 生产环境用html文件后缀
        const isValidSuffix: boolean = isDev
          ? !item.path.endsWith('.html')
          : item.path.endsWith('.html')

        // 提取所有有效的文章
        if (!isCategory.value) {
          return isValidItem(item) && isValidSuffix
        }

        // 获取文章的所属分类
        const { categories } = (item.meta as RouteMeta).frontmatter

        // 判断文章是否在当前的分类里
        const category: string = String(route.name)
          .replace(/category-(.*)-page/, '$1')
          .replace(`${lang.value}-`, '')

        const isInCategory: boolean =
          Array.isArray(categories) && categories.includes(category)

        // 提取分类下的文章
        return isValidItem(item) && isValidSuffix && isInCategory
      })
      .sort(
        (a, b) =>
          +new Date((b.meta as RouteMeta).frontmatter.date) -
          +new Date((a.meta as RouteMeta).frontmatter.date)
      )

    return routeList
  }

  /**
   * 获取分类菜单
   * @param categoryConfigList - 路由里的分类配置信息
   * @returns 分类列表
   */
  const getCategoryList = ({
    categoryConfigList,
  }: {
    categoryConfigList: CategoryConfigItem[]
  }): CategoryItem[] => {
    const { defaultLang } = config

    // 提取分类
    const categoryList: CategoryItem[] = categoryConfigList.map(
      (item: CategoryConfigItem) => {
        return {
          routeName:
            lang.value === defaultLang
              ? `${categoryPath}-${item.path}-page`
              : `${lang.value}-${categoryPath}-${item.path}-page`,
          path:
            lang.value === defaultLang
              ? `/${categoryPath}/${item.path}`
              : `/${lang.value}/${categoryPath}/${item.path}`,
          text: item.text[lang.value],
        }
      }
    )

    // 补充一个所有文章到最前面
    categoryList.unshift({
      routeName:
        lang.value === defaultLang
          ? `${type}-page`
          : `${lang.value}-${type}-page`,
      path: lang.value === defaultLang ? `/${type}` : `/${lang.value}/${type}`,
      text: lang.value === defaultLang ? '全部' : 'All',
    })

    return categoryList
  }

  /**
   * 获取文章列表
   * @param page - 页码
   * @param pageSize - 每页条数
   * @param routes - 与文章相关的路由列表，需要筛选后拿到
   */
  const getArticleList = ({
    page,
    pageSize,
  }: {
    page: number
    pageSize: number
  }): ArticleItem[] => {
    const { dateDisplay } = useDate()
    const routeList = getRouteList()

    // 根据页码获取对应数量的路由列表
    const start: number = 0 + pageSize * (page - 1)
    const end: number = start + pageSize
    const curRouteList: RouteRecordRaw[] = routeList.slice(start, end)

    // 提取要用到的字段
    const articleList: ArticleItem[] = curRouteList.map(
      (route: RouteRecordRaw) => {
        const { path, meta } = route
        const { frontmatter } = meta as RouteMeta
        const { title, desc, cover, date, isHot, repo } = frontmatter
        const { diffDays, dateAgo } = dateDisplay(+new Date(String(date)))

        return {
          path,
          title,
          desc,
          cover,
          date,
          isHot: Boolean(isHot),
          repo: repo || '',
          diffDays,
          dateAgo,
        }
      }
    )

    return articleList
  }

  return {
    getRouteList,
    getCategoryList,
    getArticleList,
  }
}
