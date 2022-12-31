import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { shuffle } from '@bassist/utils'
import isDev from '@libs/isDev'
import isArticle from '@libs/isArticle'
import isCookbook from '@libs/isCookbook'
import config from '@/config'
import { useDate, useI18n } from '@/hooks'
import { getRouteInfo } from '@/router'
import type { RouteRecordRaw } from 'vue-router'
import type {
  RouteMeta,
  CategoryConfigItem,
  CategoryItem,
  ArticleItem,
} from '@/types'

export function useList(pageType: string) {
  const { lang } = useI18n()
  const { type, categoryPath } = getRouteInfo(pageType)

  /**
   * 获取路由列表
   * @description 提取文章详情页的路由并按日期排序
   * @param param0
   * @returns
   */
  const routeList = ref<RouteRecordRaw[]>([])
  const getRouteList = (): void => {
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
          return isArticle(item)
        case 'cookbook':
          return isCookbook(item)
        default:
          return false
      }
    }

    // 获取路由列表
    routeList.value = router
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
          .replace(new RegExp(`${categoryPath}-(.*)-page`), '$1')
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
  }
  getRouteList()

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
   * 获取文章项目
   * @param route - 路由
   */
  const getArticleItem = (route: RouteRecordRaw): ArticleItem => {
    const { dateDisplay } = useDate()
    const { path, meta } = route
    const { frontmatter } = meta as RouteMeta
    const { date } = frontmatter
    const { diffDays, dateAgo } = dateDisplay(+new Date(String(date)))

    return {
      ...frontmatter,
      path,
      diffDays,
      dateAgo,
    }
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
    // 根据页码获取对应数量的路由列表
    const start: number = 0 + pageSize * (page - 1)
    const end: number = start + pageSize
    const curRouteList: RouteRecordRaw[] = routeList.value.slice(start, end)

    // 提取要用到的字段
    const articleList: ArticleItem[] = curRouteList.map(
      (route: RouteRecordRaw) => getArticleItem(route)
    )

    return articleList
  }

  /**
   * 猜你喜欢列表
   * @param max - 返回的列表上限
   */
  const guessList = ref<ArticleItem[]>([])
  const getGuessList = (max = 5): void => {
    const articleList: ArticleItem[] = shuffle(routeList.value).map((route) =>
      getArticleItem(route)
    )
    guessList.value = articleList.slice(0, max)
  }

  return {
    routeList,
    guessList,

    getRouteList,
    getCategoryList,
    getArticleItem,
    getArticleList,
    getGuessList,
  }
}
