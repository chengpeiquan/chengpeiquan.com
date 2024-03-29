<template>
  <!-- 目录 -->
  <TOC />
  <!-- 目录 -->

  <!-- 文章 -->
  <div class="flex flex-1 overflow-hidden">
    <section class="article-detail flex justify-start flex-col w-full">
      <!-- 标题 -->
      <h1 class="flex items-center w-full md:text-3xl text-xl md:mb-4 mb-2">
        {{ title }}
      </h1>
      <!-- 标题 -->

      <!-- 发布信息 -->
      <div
        class="flex justify-between items-center w-full text-sm text-gray-400 md:mb-8 mb-4 md:pb-8 pb-4 border-b dark:border-white dark:border-opacity-5"
      >
        <div class="flex items-center">
          <span class="md:mr-8 mr-4">作者：程沛权</span>
          <span :title="date.substring(0, 10)">
            {{ date.substring(0, 10) }}
          </span>
        </div>

        <div
          v-if="repo && !isMobile"
          class="flex items-center cursor-pointer hover:text-red-500 dark:hover:text-rose-500"
          :title="
            getText({
              zh: '给仓库一个Star',
              en: 'Star this repository',
            })
          "
          @click="openRepo"
        >
          <ri-star-line />
          <span class="ml-1">Star on GitHub</span>
        </div>
      </div>
      <!-- 发布信息 -->

      <!-- 过期提示 -->
      <p
        v-if="diffDays > 730"
        class="flex justify-center items-center w-full p-4 md:mb-8 mb-4 bg-gray-50 dark:bg-white dark:bg-opacity-5 rounded text-gray-600 dark:text-gray-300 text-sm"
      >
        本文最后更新于
        {{ diffDays }} 天前，部分内容可能不适合当前所有情况，仅供参考。
      </p>
      <!-- 过期提示 -->

      <!-- 内容插槽 -->
      <slot />
      <!-- 内容插槽 -->
    </section>
  </div>
  <!-- 文章 -->

  <!-- 侧边栏 -->
  <BlogSidebar />
  <!-- 侧边栏 -->
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@vueuse/head'
import { useDate, useI18n } from '@/hooks'
import isMobile from '@libs/isMobile'
import type { Frontmatter } from '@/types'

const props = defineProps<{
  frontmatter: Frontmatter
}>()
const { dateDisplay } = useDate()
const { getText } = useI18n()
const title = computed(() => props.frontmatter.title)
const desc = computed(() => props.frontmatter.desc)
const keywords = computed(() => props.frontmatter.keywords)
const date = computed(() => props.frontmatter.date)
const repo = computed(() => props.frontmatter.repo)
const { diffDays } = dateDisplay(+new Date(date.value) - 8 * 60 * 60 * 1000)

/**
 * 打开仓库
 */
const openRepo = (): void => {
  if (!repo.value || !String(repo.value).startsWith('http')) return
  window.open(repo.value)
}

/**
 * 设置页面信息
 */
useHead({
  title: isMobile.value ? title.value : `${title.value} - ${getText('title')}`,
  meta: [
    {
      property: 'og:title',
      content: `${title.value} - ${getText('title')}`,
    },
    { name: 'description', content: desc.value },
    { name: 'keywords', content: keywords.value },
  ],
})
</script>

<style lang="postcss">
.article-detail {
  .header-anchor {
    opacity: 0.5;
  }
}
@media (max-width: 1280px) {
  .article-detail {
    .article-toc {
      li {
        margin-left: 1em !important;
        padding-left: 0 !important;
      }
    }
  }
}
@media (min-width: 1280px) {
  .article-detail {
    .article-toc {
      display: none;
    }
  }
}
</style>
