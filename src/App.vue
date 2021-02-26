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

// 全局meta信息
const { frontmatter } = route.meta;
const { title, desc, cover } = frontmatter;
useHead({
  meta: [
    {
      property: 'og:title',
      content: config[lang.value].title
    },
    {
      property: 'og:image',
      content: config.avatar.big
    },
    {
      name: 'description',
      content: config[lang.value].description
    },
    // 下面是配置twitter分享
    {
      name: 'twitter:title',
      content: title ? title : config[lang.value].title
    },
    {
      name: 'twitter:description',
      content: desc ? desc : config[lang.value].description
    },
    {
      name: 'twitter:image:src',
      content: cover ? cover : config.avatar.big
    },
    {
      name: 'twitter:card',
      content: 'summary'
    },
    {
      name: 'twitter:creator',
      content: '@chengpeiquan'
    },
    // 下面是配置PWA
    {
      name: 'theme-color',
      content: '#111111'
    }
  ]
});
</script>