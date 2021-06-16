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
    <Article v-if="isUseArticle" :frontmatter="frontmatter">
      <slot />
    </Article>
    <!-- 文章类 -->

    <!-- 页面类 -->
    <Page v-else :frontmatter="frontmatter">
      <slot />
    </Page>
    <!-- 页面类 -->
  </main>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRoute } from 'vue-router'
import isArticle from '/@libs/isArticle'

const route = useRoute()
const isUseArticle = isArticle(route)
const { frontmatter } = defineProps<{ frontmatter: any }>()
</script>

<style scoped></style>
