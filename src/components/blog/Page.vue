<template>
  <section class="flex justify-start flex-col flex-1 md:w-auto w-full overflow-hidden">
    <!-- 页头信息 -->
    <div v-if="title" class="prose m-auto mb-8">
      <h1 class="md:text-3xl text-xl mb-0">
        {{ title }}
      </h1>
      
      <p v-if="desc" class="opacity-50 mt-1 italic">
        {{ desc }}
      </p>
    </div>
    <!-- 页头信息 -->
    
    <!-- 内容插槽 -->
    <slot />
    <!-- 内容插槽 -->
  </section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useHead } from '@vueuse/head'
import config from '/@ts/config'

const { frontmatter } = defineProps<{ frontmatter: any }>();
const { title, desc, keywords } = frontmatter;
const meta = [
  { property: 'og:title', content: `${title} - ${config.title}` },
  { name: 'description', content: desc }
]

if ( keywords ) {
  meta.push({ name: 'keywords', content: keywords });
}

useHead({
  title: `${title} - ${config.title}`,
  meta
})
</script>

<style scoped>
</style>