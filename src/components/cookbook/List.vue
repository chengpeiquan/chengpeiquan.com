<template>
  <section class="flex flex-1 flex-col">
    <!-- 分类 -->
    <CategoryTabs :categoryList="categoryList" />
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
    <ul
      v-if="articleList.length > 0"
      class="
        mt-2
        md:mx-0
        mx-4
        md:mb-8
        mb-4
        grid
        md:grid-cols-4
        grid-cols-1
        col-auto
        row-auto
        md:gap-8
        gap-4
      "
    >
      <li
        class="
          flex flex-col
          md:pb-0
          pb-4
          md:border-0
          border-b
          dark:border-white dark:border-opacity-5
        "
        v-for="(item, index) in articleList"
        :key="index"
      >
        <!-- 封面 -->
        <div
          v-if="item.cover"
          class="
            flex flex-shrink-0
            w-full
            md:h-75
            h-auto
            overflow-hidden
            mb-2
            rounded
          "
        >
          <router-link :title="item.title" :to="item.path" class="w-full">
            <img class="img" :src="item.cover" :alt="item.title" />
          </router-link>
        </div>
        <!-- 封面 -->

        <!-- 标题 -->
        <router-link
          class="flex items-start mb-2"
          :title="item.title"
          :to="item.path"
        >
          <h2 class="text-lg md:line-clamp-1 line-clamp-2">
            {{ item.title }}
          </h2>
        </router-link>
        <!-- 标题 -->

        <!-- 日期 -->
        <p
          class="flex justify-between text-xs text-gray-400"
          :title="item.date.substr(0, 10)"
        >
          {{ item.diffDays > 7 ? item.date.substr(0, 10) : item.dateAgo }}
        </p>
        <!-- 日期 -->
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
import { ref } from 'vue'
import { useHead } from '@vueuse/head'
import { categoryConfigList } from '@/router/cookbook'
import config from '@/config'
import { useList, usePagination, useI18n } from '@/hooks'
import type { ArticleItem, CategoryItem, CategoryListInfo } from '@/types'

const articleList = ref<ArticleItem[]>([])
const categoryList = ref<CategoryItem[]>([])
const { defaultLang } = config

const categoryListInfo: CategoryListInfo = {
  type: 'cookbook',
  categoryPath: 'cooking',
}
const { getCategoryList, getArticleList } = useList(categoryListInfo)
const { page, pageSize, lastPage, total, openPage } =
  usePagination(categoryListInfo)

// 获取语言
const { lang, emptyTips } = useI18n()

/**
 * 获取分页信息
 */
const getPageInfo = (): void => {
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
getPageInfo()

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
</script>
