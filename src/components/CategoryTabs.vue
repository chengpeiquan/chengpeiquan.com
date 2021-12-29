<template>
  <section class="category-tabs">
    <router-link
      v-for="(item, index) in categoryList"
      :key="index"
      :to="item.path"
      class="item"
      :class="{ cur: item.routeName === route.name }"
    >
      {{ item.text }}
    </router-link>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { CategoryItem } from '@/types'

defineProps<{
  categoryList: CategoryItem[]
}>()
const route = useRoute()
</script>

<style lang="postcss" scoped>
/* 分类切换栏 */
.category-tabs {
  @apply w-full md:mb-4 mb-2 md:pb-4 pb-2 md:px-0 px-4 border-b dark:border-white dark:border-opacity-5;
}
.category-tabs .item {
  @apply md:mr-8 mr-4 md:text-base text-sm opacity-70;
}
.category-tabs .item.cur {
  @apply md:text-xl text-base font-bold opacity-100;
}
</style>
