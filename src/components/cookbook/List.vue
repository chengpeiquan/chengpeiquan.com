<template>
  <section class="flex flex-1 flex-col">
    <!-- 分类 -->
    <section class="category-tabs">
      <router-link
        v-for="(item, index) in categoryList"
        :key="index"
        :to="item.path"
        class="item"
        :class="{ cur: item.routeName === route.name }"
      >
        {{ item.text }}
      </router-link>
    </section>
    <!-- 分类 -->

    <!-- 空列表提示 -->
    <div
      v-if="cookbookList.length === 0"
      class="
        flex
        justify-center
        w-full
        md:mt-8
        mt-4
        md:mb-16
        mb-8
        md:text-base
        text-sm
      "
    >
      <p>{{ emptyTips }}</p>
    </div>
    <!-- 空列表提示 -->

    <!-- 列表 -->
    <ul v-if="cookbookList.length > 0" class="cookbook-list">
      <li
        class="
          flex flex-col
          md:pb-8
          pb-4
          md:mb-8
          mb-4
          border-b
          dark:border-white dark:border-opacity-5
        "
        v-for="(item, index) in cookbookList"
        :key="index"
      >
        <router-link
          class="flex md:items-center items-start md:mb-4 mb-2"
          :title="item.title"
          :to="item.path"
        >
          <ri-fire-fill
            v-if="item.isHot"
            class="mr-2 text-xl text-red-500 dark:text-rose-500"
          />
          <h2 class="md:text-2xl text-lg line-clamp-2">
            {{ item.title }}
          </h2>
        </router-link>

        <div class="flex md:flex-row flex-col">
          <!-- 封面 -->
          <div
            v-if="item.cover"
            class="
              flex flex-shrink-0
              md:w-40
              w-full
              md:h-32
              h-auto
              overflow-hidden
              md:mr-4
              mr-0
              md:mb-0
              mb-2
              rounded
            "
          >
            <router-link :title="item.title" :to="item.path">
              <img class="img" :src="item.cover" :alt="item.title" />
            </router-link>
          </div>
          <!-- 封面 -->

          <!-- 信息 -->
          <div class="flex flex-col justify-between">
            <p
              class="
                md:h-auto
                h-0
                md:text-base
                text-sm text-gray-400
                md:mb-4
                mb-0
                md:line-clamp-3
                line-clamp-2
              "
            >
              {{ item.desc }}
            </p>

            <p
              class="flex justify-between md:text-sm text-xs text-gray-400"
              :title="item.date.substr(0, 10)"
            >
              {{ item.diffDays > 7 ? item.date.substr(0, 10) : item.dateAgo }}
            </p>
          </div>
          <!-- 信息 -->
        </div>
      </li>
    </ul>
    <!-- 列表 -->

    <!-- 翻页 -->
    <Pagination
      v-if="cookbookList.length > 0"
      :routeName="route.name"
      :page="page"
      :pageTotal="pageTotal"
    />
    <!-- 翻页 -->
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { categoryConfigList } from '@/router/cookbook'
import isCookbook from '@libs/isCookbook'
import config from '@/config'
import dateDisplay from '@libs/dateDisplay'
import getCategoryList from '@libs/getCategoryList'
import isDev from '@libs/isDev'
import type { RouteRecordRaw } from 'vue-router'
import type { ListItem, CategoryItem } from '@/types'

const route = useRoute()
const router = useRouter()
const routes = ref<RouteRecordRaw[]>([])
const page = ref<number>(1)
const pageSize = ref<number>(10)
const pageTotal = ref<number>(1)
const cookbookTotal = ref<number>(1)
const cookbookList = ref<ListItem[]>([])
const categoryList = ref<CategoryItem[]>([])
const emptyTips = ref<string>('')
const lang: string = inject('lang') || ''
const { defaultLang } = config

/**
 * 获取文章列表
 */
const getArticleList = (): void => {
  // 空提示
  emptyTips.value = config.i18n[lang.value].emptyTips

  // 根据页码获取对应的文章
  const start: number = 0 + pageSize.value * (page.value - 1)
  const end: number = start + pageSize.value
  const curRoutes: RouteRecordRaw[] = routes.value.slice(start, end)

  // 提取要用到的字段
  cookbookList.value = curRoutes.map((route: RouteRecordRaw) => {
    const { path } = route
    const { frontmatter } = route.meta
    const { title, desc, cover, date, isHot, repo } = frontmatter
    const { diffDays, dateAgo } = dateDisplay(new Date(date))

    return {
      path,
      title,
      desc,
      cover,
      date,
      isHot,
      repo,
      diffDays,
      dateAgo,
    }
  })
}

/**
 * 获取分页信息
 */
const getPageInfo = (): void => {
  // 提取文章详情页的路由并按日期排序
  routes.value = router
    .getRoutes()
    .filter((item) => {
      // 生产环境用html文件后缀
      const isValidSuffix: boolean = isDev
        ? !item.path.endsWith('.html')
        : item.path.endsWith('.html')

      // 判断当前是否分类列表
      const gategoryPath: string =
        lang.value === defaultLang ? '/category' : `/${lang.value}/category`
      const isCategory: boolean = route.path.startsWith(gategoryPath)

      // 提取所有有效的文章
      if (!isCategory) {
        return isCookbook(item) && isValidSuffix
      }

      // 获取文章的所属分类
      const { categories } = item.meta.frontmatter

      // 判断文章是否在当前的分类里
      const category: string = route.name
        .replace(/category-(.*)-page/, '$1')
        .replace(`${lang.value}-`, '')

      const isInCategory: boolean =
        Array.isArray(categories) && categories.includes(category)

      // 提取分类下的文章
      return isCookbook(item) && isValidSuffix && isInCategory
    })
    .sort(
      (a, b) =>
        +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date)
    )

  // 获取文章总数
  const routesCount: number = routes.value.length
  cookbookTotal.value = routesCount

  // 获取页码总数
  pageTotal.value = Math.ceil(routesCount / pageSize.value)

  // 获取页码信息
  if (route.params.page && !isNaN(Number(route.params.page))) {
    page.value = Number(route.params.page)
    if (page.value > pageTotal.value) {
      router.replace({
        path: '/404',
      })
    }
  }

  // 获取分类列表
  categoryList.value = getCategoryList({
    categoryConfigList,
    categoryTag: 'cooking',
    allCategoryTag: 'cookbook',
    lang: lang.value,
  })

  // 获取文章列表
  getArticleList()
}

/**
 * 设置页面信息
 */
const websiteTitle: string =
  lang.value === defaultLang ? '文章列表' : 'Article List'
useHead({
  title: `${websiteTitle} - ${config.i18n[lang.value].title}`,
  meta: [
    {
      property: 'og:title',
      content: `${websiteTitle} - 第${page.value}页 - ${
        config.i18n[lang.value].title
      }`,
    },
  ],
})

/**
 * 要执行的函数
 */
getPageInfo()
</script>

<style lang="postcss" scoped>
.category-tabs {
  @apply w-full md:mb-4 mb-2 md:pb-4 pb-2 md:px-0 px-4 border-b dark:border-white dark:border-opacity-5;
}
.category-tabs .item {
  @apply md:mr-8 mr-4 md:text-base text-sm opacity-70;
}
.category-tabs .item.cur {
  @apply md:text-xl text-base font-bold opacity-100;
}
.cookbook-list {
  @apply md:mx-0 mx-4;
}
</style>
