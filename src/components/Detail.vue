<template>
  <main
    class="
      flex
      justify-between
      container
      md:mx-auto
      box-border
      px-4
      md:mt-16
      mt-4
    "
  >
    <!-- 文章类 -->
    <BlogArticle v-if="isArticle(route)" :frontmatter="frontmatter">
      <slot />
    </BlogArticle>
    <!-- 文章类 -->

    <!-- 页面类 -->
    <BlogPage v-else :frontmatter="frontmatter">
      <slot />
    </BlogPage>
    <!-- 页面类 -->
  </main>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import isArticle from '@libs/isArticle'
import type { Frontmatter } from '@/types'

const route = useRoute()
defineProps<{
  frontmatter: Frontmatter
}>()
</script>

<style scoped></style>
