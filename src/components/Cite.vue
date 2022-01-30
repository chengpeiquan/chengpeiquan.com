<template>
  <router-link
    v-if="target"
    class="
      cite
      block
      md:w-140
      w-full
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
    <div class="flex justify-between items-center w-full" v-if="title">
      <div class="flex flex-1 overflow-hidden">
        <span class="md:text-base text-sm truncate indent-0em">
          {{ title }}
        </span>
      </div>
      <div class="flex flex-shrink-0 bg-pink-600 rounded px-2 py-1 ml-2">
        <span class="md:text-sm text-xs text-white">点击查看</span>
      </div>
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
