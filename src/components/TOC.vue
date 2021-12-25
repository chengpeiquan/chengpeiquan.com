<template>
  <div class="sticky w-60 mr-8" v-if="isShowToc">
    <!-- 模块标题 -->
    <div
      class="
        flex
        justify-between
        items-center
        bg-gray-50
        dark:bg-opacity-5
        box-border
        px-4
        py-2
      "
    >
      <div class="flex items-center">
        <ri:list-check-2 class="mr-2" />
        <span>目录</span>
      </div>
      <span class="text-xs cursor-pointer">收起</span>
    </div>
    <!-- 模块标题 -->

    <!-- 目录 -->
    <div class="article-toc-container"></div>
    <!-- 目录 -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { isClient } from '@vueuse/core'
import isMobile from '@libs/isMobile'

const isShowToc = ref<boolean>(false)

/**
 * 提取目录生成到侧边栏
 */
const moveToc = (): void | boolean => {
  if (!isClient || isMobile.value) {
    return false
  }

  // 获取文章内的目录
  const toc: HTMLElement | null = document.querySelector('.article-toc')
  if (!toc) {
    isShowToc.value = false
    return false
  }

  // 显示目录并插入内容
  isShowToc.value = true
  setTimeout(() => {
    const tocContainer: HTMLElement | null = document.querySelector(
      '.article-toc-container'
    )
    if (tocContainer) {
      tocContainer.innerHTML = ''
      tocContainer.appendChild(toc)
    }
  }, 100)

  // 把文章内的目录移除
  const content: HTMLElement | null = document.querySelector('.article-content')
  if (content) {
    content.childNodes[0].remove()
  }
}
onMounted(() => {
  setTimeout(() => {
    moveToc()
  }, 100)
})
</script>

<style lang="postcss" scoped>
.article-toc-container {
  :deep(.article-toc) {
    li {
      @apply ml-0;
      a {
        @apply text-sm line-clamp-1;
        &::before,
        &::after {
          display: none;
        }
        &:hover {
          @apply no-underline !important;
        }
      }
    }
  }
}
</style>
