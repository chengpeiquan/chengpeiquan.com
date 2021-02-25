<template>
  <Header />
  <router-view :key="key" />
  <Footer />
</template>

<script setup lang="ts">
import { computed, provide, ref, watchEffect } from 'vue'
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router';
import config from '/@ts/config'
import { get } from '@vueuse/core';

useHead({
  meta: [
    {
      property: 'og:title',
      content: config.title
    },
    {
      property: 'og:image',
      content: config.avatar.big
    },
    {
      name: 'description',
      content: config.description
      },
    {
      name: 'twitter:card',
      content: 'summary'
    },
    {
      name: 'twitter:creator',
      content: '@chengpeiquan'
    },
    {
      name: 'theme-color',
      content: '#111111'
    }
  ]
});

const route = useRoute();
const key = computed( () => {
  const date: Date = new Date();
  const KEY: string = route.name ? `${String(route.name)}${date}` : `${String(route.path)}${date}`; 
  return KEY;
});

// i18n
const lang = ref<string>('');
const getLang = (): void => {
  lang.value = route.path.startsWith('/en') ? 'en' : 'zh-CN';
}
watchEffect(getLang);
provide('lang', lang);
</script>