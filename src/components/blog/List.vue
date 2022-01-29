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
    <ul class="md:mx-0 mx-4" v-if="articleList.length > 0">
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
          <fluent-drafts-16-filled
            v-if="item.isDraft"
            class="mr-2 text-xl text-yellow-500"
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
              <img
                class="img"
                :src="item.cover"
                :alt="item.title"
                loading="lazy"
              />
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

  <!-- 侧边栏 -->
  <BlogSidebar v-if="isDefaultLang" />
  <!-- 侧边栏 -->
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { categoryConfigList } from '@/router/article'
import { useList, usePagination, useI18n } from '@/hooks'
import type { ArticleItem, CategoryItem } from '@/types'

const { getCategoryList, getArticleList } = useList('article')
const { page, pageSize, lastPage, total, openPage } = usePagination({
  pageType: 'article',
})

// 获取语言
const { isDefaultLang, getText } = useI18n()

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
  zh: '文章列表',
  en: 'Article List',
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
