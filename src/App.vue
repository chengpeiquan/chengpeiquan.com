<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router';
import config from '/@ts/config'

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
  ],
});
</script>