<template>
  <Header />
  <router-view :key="key" />
  <Footer />
</template>

<script setup lang="ts">
import { computed, provide, ref, watchEffect } from 'vue'
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'
import config from '/@/config'
import { get } from '@vueuse/core'

const route = useRoute()
const key = computed(() => {
  const date: Date = new Date()
  const KEY: string = route.name
    ? `${String(route.name)}${date}`
    : `${String(route.path)}${date}`
  return KEY
})

// i18n
const lang = ref<string>('')
const getLang = (): void => {
  const { i18n, defaultLang } = config
  const langTag: string = route.path.split('/')[1]
  lang.value = Object.prototype.hasOwnProperty.call(i18n, langTag)
    ? langTag
    : defaultLang
}
watchEffect(getLang)
provide('lang', lang)

// 全局meta信息
const { frontmatter } = route.meta
const { title, desc, cover } = frontmatter
useHead({
  meta: [
    {
      property: 'og:title',
      content: config.i18n[lang.value].title,
    },
    {
      property: 'og:image',
      content: config.avatar.big,
    },
    {
      name: 'description',
      content: config.i18n[lang.value].description,
    },
    // 下面是配置twitter分享
    {
      name: 'twitter:title',
      content: title ? title : config.i18n[lang.value].title,
    },
    {
      name: 'twitter:description',
      content: desc ? desc : config.i18n[lang.value].description,
    },
    {
      name: 'twitter:image:src',
      content: cover ? cover : config.avatar.big,
    },
    {
      name: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:creator',
      content: '@chengpeiquan',
    },
    // 下面是配置PWA
    {
      name: 'theme-color',
      content: '#111111',
    },
  ],
})
</script>
