<template>
  <Header />
  <router-view :key="key" />
  <Footer />
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { useRoute } from 'vue-router'
import config from '@/config'

const route = useRoute()
const key = computed(() => {
  const date: Date = new Date()
  const KEY: string = route.name
    ? `${String(route.name)}${date}`
    : `${String(route.path)}${date}`
  return KEY
})

const lang = computed(() => {
  const { i18n, defaultLang } = config
  const langTag: string = route.path.split('/')[1]
  return Object.prototype.hasOwnProperty.call(i18n, langTag)
    ? langTag
    : defaultLang
})
provide('lang', lang)
</script>
