<template>
  <section class="article-sidebar lg:flex hidden flex-col flex-shrink-0 ml-16">
    <!-- 文章目录 -->
    <section class="mb-16" v-if="isShowToc">
      <h2 class="block-title">文章目录</h2>
      <div class="flex flex-col w-full">
        <div class="article-toc-container"></div>
      </div>
    </section>
    <!-- 文章目录 -->

    <!-- 热门栏目 -->
    <section class="mb-16">
      <h2 class="block-title">热门栏目</h2>
      <div class="flex flex-col w-full">
        <a href="https://vue3.chengpeiquan.com/" target="_blank">
          <img
            class="w-full"
            src="https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2021/01/1-1.jpg"
            alt="Vue3.0学习教程与实战案例"
          />
        </a>
      </div>
    </section>
    <!-- 热门栏目 -->

    <!-- 猜你喜欢 -->
    <section class="mb-8">
      <div class="flex justify-between items-center block-title">
        <h2>猜你喜欢</h2>
        <span
          class="
            dark:text-gray-400
            text-gray-500 text-base
            font-normal
            cursor-pointer
            select-none
          "
          @click="getArticleList"
        >
          换一换
        </span>
      </div>
      <ul>
        <li class="flex mb-8" v-for="(item, index) in articleList" :key="index">
          <!-- 封面 -->
          <div
            v-if="item.cover"
            class="flex flex-shrink-0 w-16 h-12 overflow-hidden mr-4 rounded"
          >
            <router-link :title="item.title" :to="item.path">
              <img class="img" :src="item.cover" :alt="item.title" />
            </router-link>
          </div>
          <!-- 封面 -->

          <!-- 标题 -->
          <router-link
            class="flex flex-1 line-clamp-2"
            :title="item.title"
            :to="item.path"
          >
            <h2 class="article-title text-base">{{ item.title }}</h2>
          </router-link>
          <!-- 标题 -->
        </li>
      </ul>
    </section>
    <!-- 猜你喜欢 -->

    <!-- 在线吸猫 -->
    <section class="mb-16">
      <h2 class="block-title">在线吸猫</h2>
      <div class="flex flex-col w-full">
        <a href="https://vue3.chengpeiquan.com/" target="_blank">
          <img
            class="w-full"
            src="https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2021/07/20210703235057.jpg"
            alt="扫码关注我的抖音号"
          />
        </a>
      </div>
    </section>
    <!-- 在线吸猫 -->

    <!-- 友情链接 -->
    <section class="mb-2">
      <h2 class="block-title">友情链接</h2>
      <div class="flex flex-wrap w-full text-base">
        <a
          class="mb-2"
          href="https://vue3.chengpeiquan.com/"
          target="_blank"
          rel="noopener noreferrer"
          >Vue3.0学习教程与实战案例</a
        >
        <span class="text-gray-900 mx-2">|</span>
        <a
          class="mb-2"
          href="https://wuyabala.com/"
          target="_blank"
          rel="noopener noreferrer"
          >佩恩的博客</a
        >
        <span class="text-gray-900 mx-2">|</span>
        <a
          class="mb-2"
          href="https://chawyehsu.com/"
          target="_blank"
          rel="noopener noreferrer"
          >The Art of Chawye Hsu</a
        >
        <span class="text-gray-900 mx-2">|</span>
        <a
          class="mb-2"
          href="https://guangne.com/"
          target="_blank"
          rel="noopener noreferrer"
          >旅行家龙猫</a
        >
      </div>
    </section>
    <!-- 友情链接 -->

    <!-- 谷歌广告 -->
    <GoogleAdsense />
    <!-- 谷歌广告 -->
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { isClient } from '@vueuse/core'
import isArticle from '/@libs/isArticle'
import shuffle from '/@libs/shuffle'
import isMobile from '/@libs/isMobile'
import isDev from '/@libs/isDev'

interface List {
  path: string
  title: string
  cover: string
}

const activeRoute = useRoute()
const router = useRouter()
const articleList = ref<List[]>([])
const count: number = 5
const isShowToc = ref<boolean>(false)

/**
 * 猜你喜欢的文章列表
 */
const getArticleList = (): void => {
  // 提取文章详情页的路由并按日期排序，同时不能和当前文章重复
  const routes = router.getRoutes().filter((route) => {
    const IS_VALID_SUFFIX: boolean = isDev
      ? !route.path.endsWith('.html')
      : route.path.endsWith('.html')
    return (
      isArticle(route) && IS_VALID_SUFFIX && route.path !== activeRoute.path
    )
  })

  // 提取要用到的字段
  articleList.value = shuffle(routes).map((route) => {
    const { path } = route
    const { frontmatter } = route.meta
    const { title, cover } = frontmatter

    return {
      path,
      title,
      cover,
    }
  })

  // 不超过渲染上限
  if (articleList.value.length > count) {
    articleList.value.length = count
  }
}
getArticleList()

/**
 * 提取目录生成到侧边栏
 */
const moveToc = (): void | boolean => {
  if (!isClient || isMobile.value) {
    return false
  }

  // 获取文章内的目录
  const toc: HTMLElement = document.querySelector('.article-toc')
  if (!toc) {
    isShowToc.value = false
    return false
  }

  // 显示目录并插入内容
  isShowToc.value = true
  setTimeout(() => {
    const tocContainer: HTMLElement = document.querySelector(
      '.article-toc-container'
    )
    tocContainer.innerHTML = ''
    tocContainer.appendChild(toc)
  }, 100)

  // 把文章内的目录移除
  const content: HTMLElement = document.querySelector('.article-content')
  content.childNodes[0].remove()
}
onMounted(() => {
  setTimeout(() => {
    moveToc()
  }, 100)
})
</script>

<style lang="postcss" scoped>
.article-sidebar {
  width: 340px;
}
.block-title {
  @apply text-xl font-bold mb-4 pb-4 border-b dark:border-white dark:border-opacity-5;
}
.article-title {
  text-align: justify;
}
.article-toc-container {
  :deep(.article-toc) {
    li {
      margin-left: 0;
    }
  }
}
</style>
