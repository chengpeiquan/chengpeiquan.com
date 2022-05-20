<template>
  <div class="w-48 mr-10 xl:block hidden" v-if="isShowTOC">
    <div class="sticky top-40 w-full">
      <!-- 模块标题 -->
      <div
        class="flex items-center bg-gray-50 dark:bg-opacity-5 box-border p-2 select-none"
      >
        <div class="flex items-center">
          <ri:list-check-2 class="mr-2" />
          <span>{{ tocTitle }}</span>
        </div>
      </div>
      <!-- 模块标题 -->

      <!-- 目录 -->
      <div class="article-toc-container" v-html="tocHTML"></div>
      <!-- 目录 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNavigate } from '@/hooks'
import { ref } from 'vue-demi'

const tocHTML = ref<string>('')
const { isShowTOC, tocTitle, initTOC } = useNavigate()
initTOC(tocHTML)
</script>

<style lang="postcss" scoped>
.article-toc-container {
  max-height: calc(100vh - 300px);
  @apply overflow-y-auto;
  :deep(.article-toc) {
    li {
      @apply ml-0 pl-6 line-clamp-1;
      &::before {
        top: calc(0.875em - 0.3875em);
      }
      a {
        @apply text-sm;
        &::before,
        &::after {
          display: none;
        }
      }
      ul {
        @apply m-0;
        a {
          @apply text-xs;
        }
      }
    }
  }
}
</style>
