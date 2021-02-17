<template>
  <main class="flex justify-between container md:mx-auto box-border px-4 md:mt-16 mt-4">
    <!-- 博客类 -->
    <Article v-if="isUseArticle" :frontmatter="frontmatter">
      <slot />
    </Article>
    <!-- 博客类 -->

    <!-- 页面类 -->
    <slot v-else :frontmatter="frontmatter" />
    <!-- 页面类 -->
  </main>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRoute } from 'vue-router'
import isArticle from '/@libs/isArticle'

const route = useRoute();
const isUseArticle = isArticle(route);
const { frontmatter } = defineProps<{ frontmatter: any }>();
</script>

<style scoped>
</style>