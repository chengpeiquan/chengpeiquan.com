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
      <p>{{ getText('emptyTips') }}</p>
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
        md:grid-cols-5
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
            xl:h-40
            2xl:h-59
            h-auto
            overflow-hidden
            mb-2
            rounded
          "
        >
          <router-link :title="item.title" :to="item.path" class="w-full">
            <img
              class="img"
              :src="item.cover"
              :alt="item.title"
              loading="lazy"
            />
          </router-link>
        </div>
        <!-- 封面 -->

        <!-- 标题 -->
        <router-link
          class="flex items-start mb-2"
          :title="item.title"
          :to="item.path"
        >
          <h2 class="text-base line-clamp-2 break-all">
            {{ item.title }}
          </h2>
        </router-link>
        <!-- 标题 -->

        <!-- 日期 -->
        <p
          class="flex justify-between text-xs text-gray-400"
          :title="item.date.substring(0, 10)"
        >
          {{ item.date.substring(0, 10) }}
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
import { useHead } from '@vueuse/head'
import { categoryConfigList } from '@/router/cookbook'
import { useList, usePagination, useI18n } from '@/hooks'
import type { ArticleItem, CategoryItem } from '@/types'

const { getCategoryList, getArticleList } = useList('cookbook')
const { page, pageSize, lastPage, total, openPage } = usePagination({
  pageType: 'cookbook',
  pageSize: 15,
})

// 获取语言
const { getText } = useI18n()

// 获取分类列表
const categoryList: CategoryItem[] = getCategoryList({
  categoryConfigList,
})

// 获取文章列表
const articleList: ArticleItem[] = getArticleList({
  page: page.value,
  pageSize: pageSize.value,
})

/**
 * 设置页面信息
 */
const pageTitle = getText({
  zh: '菜谱列表',
  en: 'Cookbook List',
})
const websiteTitle = getText('title')
useHead({
  title: `${pageTitle} - ${websiteTitle}`,
  meta: [
    {
      property: 'og:title',
      content: `${pageTitle} - 第${page.value}页 - ${websiteTitle}`,
    },
  ],
})
</script>
