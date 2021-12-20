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
      v-if="articleList.length === 0"
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
    <ul v-if="articleList.length > 0" class="cookbook-list">
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
        v-for="(item, index) in articleList"
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
      v-if="articleList.length > 0"
      :page="page"
      :lastPage="lastPage"
      :total="total"
      @openPage="openPage"
    />
    <!-- 翻页 -->
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { categoryConfigList } from '@/router/cookbook'
import isCookbook from '@libs/isCookbook'
import config from '@/config'
import isDev from '@libs/isDev'
import { useList, usePagination, useI18n } from '@/hooks'
import type { RouteRecordRaw } from 'vue-router'
import type { ArticleItem, CategoryItem, CategoryListInfo } from '@/types'

const route = useRoute()
const router = useRouter()
const articleList = ref<ArticleItem[]>([])
const categoryList = ref<CategoryItem[]>([])
const emptyTips = ref<string>('')
const { defaultLang } = config

const categoryListInfo: CategoryListInfo = {
  type: 'cookbook',
  categoryPath: 'cooking',
}
const { getCategoryList, getArticleList } = useList(categoryListInfo)
const { page, pageSize, lastPage, total, openPage } =
  usePagination(categoryListInfo)

// 获取语言
const { getLang } = useI18n()
const lang = getLang()

/**
 * 获取分页信息
 */
const getPageInfo = (): void => {
  // 空提示
  emptyTips.value = config.i18n[lang.value].emptyTips

  // 获取分类列表
  categoryList.value = getCategoryList({
    categoryConfigList,
  })

  // 获取文章列表
  articleList.value = getArticleList({
    page: page.value,
    pageSize: pageSize.value,
  })
}

/**
 * 设置页面信息
 */
const websiteTitle: string =
  lang.value === defaultLang ? '菜谱列表' : 'Cookbook List'
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
