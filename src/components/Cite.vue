<template>
  <router-link
    v-if="target"
    class="
      cite
      block
      md:w-140
      w-70
      bg-gray-50
      dark:bg-opacity-5
      md:p-4
      p-3
      md:my-4
      my-2
      mx-auto
      rounded-md
      border-0
      shadow
      cursor-pointer
    "
    :to="path"
  >
    <!-- 封面 -->
    <div class="w-full md:h-80 h-40 md:mb-4 mb-2" v-if="cover">
      <img class="w-full h-full object-cover !m-0" :src="cover" :alt="title" />
    </div>
    <!-- 封面 -->

    <!-- 标题 -->
    <div class="w-full md:text-base text-sm line-clamp-2" v-if="title">
      {{ title }}
    </div>
    <!-- 标题 -->
  </router-link>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useList } from '@/hooks'
import type { RouteRecordRaw } from 'vue-router'
import type { RouteMeta } from '@/types'

const props = defineProps<{
  type: string
  name: string
}>()

const { routeList } = useList(props.type)
const target: RouteRecordRaw | undefined = routeList.value.find(
  (route: RouteRecordRaw) => route.name === `${props.type}-${props.name}`
)

const path = ref<string>('')
const title = ref<string>('')
const cover = ref<string>('')
if (target) {
  const { frontmatter } = target.meta as RouteMeta
  path.value = target.path
  title.value = frontmatter.title
  cover.value = frontmatter.cover
}
</script>

<style lang="postcss" scoped>
.cite {
  border-bottom: 0 !important;
  &:hover {
    @apply border-0;
  }
  &::before,
  &::after {
    display: none;
  }
}
</style>
