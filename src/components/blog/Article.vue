<template>
  <!-- 文章 -->
  <section
    class="
      article-detail
      flex
      justify-start
      flex-col flex-1
      md:w-auto
      w-full
      overflow-hidden
    "
  >
    <!-- 标题 -->
    <h1 class="flex items-center w-full md:text-3xl text-xl md:mb-4 mb-2">
      {{ title }}
    </h1>
    <!-- 标题 -->

    <!-- 发布信息 -->
    <div
      class="
        flex
        justify-between
        items-center
        w-full
        text-sm text-gray-400
        md:mb-8
        mb-4
        md:pb-8
        pb-4
        border-b
        dark:border-white dark:border-opacity-5
      "
    >
      <div class="flex items-center">
        <span class="md:mr-8 mr-4">作者：程沛权</span>
        <span :title="date.substr(0, 10)">
          {{ diffDays > 7 ? date.substr(0, 10) : dateAgo }}
        </span>
      </div>

      <div
        v-if="repo && !isMobile"
        class="
          flex
          items-center
          cursor-pointer
          hover:text-red-500
          dark:hover:text-rose-500
        "
        :title="lang === 'zh-CN' ? '给仓库一个Star' : 'Star this repository'"
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
      class="
        flex
        justify-center
        items-center
        w-full
        p-4
        md:mb-8
        mb-4
        bg-gray-50
        dark:bg-white dark:bg-opacity-5
        rounded
        text-gray-600
        dark:text-gray-300
        text-sm
      "
    >
      本文最后更新于
      {{ diffDays }} 天前，部分内容可能不适合当前所有情况，仅供参考。
    </p>
    <!-- 过期提示 -->

    <!-- 内容插槽 -->
    <slot />
    <!-- 内容插槽 -->
  </section>
  <!-- 文章 -->

  <!-- 侧边栏 -->
  <Sidebar />
  <!-- 侧边栏 -->
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isClient } from '@vueuse/core'
import { useHead } from '@vueuse/head'
import config from '/@/config'
import dateDisplay from '/@libs/dateDisplay'
import isMobile from '/@libs/isMobile'

const route = useRoute()
const router = useRouter()
const { frontmatter } = defineProps<{ frontmatter: any }>()
const { title, desc, keywords, date, repo } = frontmatter
const { diffDays, dateAgo } = dateDisplay(+new Date(date) - 8 * 60 * 60 * 1000)
const lang: string = inject('lang') || ''

/**
 * 打开仓库
 */
const openRepo = (): void => {
  if (!repo || !String(repo).startsWith('http')) return
  window.open(repo)
}

/**
 * 设置页面信息
 */
useHead({
  title: isMobile.value ? title : `${title} - ${config.i18n[lang.value].title}`,
  meta: [
    {
      property: 'og:title',
      content: `${title} - ${config.i18n[lang.value].title}`,
    },
    { name: 'description', content: desc },
    { name: 'keywords', content: keywords },
  ],
})

/**
 * 页面加载时定位到链接对应的锚点
 */
const navigateToId = (): void => {
  if (!isClient) {
    return false
  }

  router
    .isReady()
    .then(() => {
      setTimeout(() => {
        const { hash } = document.location
        if (hash.length > 1) {
          const id: string = decodeURIComponent(hash.substring(1))
          const element: HTMLElement | null = document.getElementById(id)
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
            })
          }
        }
      }, 500)
    })
    .catch((e) => {
      console.log(e)
    })
}

onMounted(navigateToId)
</script>

<style lang="postcss">
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
