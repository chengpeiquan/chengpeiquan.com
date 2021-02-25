<template>
  <footer class="flex justify-center items-center w-full h-36">
    <p class="opacity-70 md:text-sm text-xs">
      <span>© {{ year }} {{ name }}</span>
      <a
        class="md:ml-12 ml-2"
        href="https://beian.miit.gov.cn/"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        {{ icp }}
      </a>
    </p>
  </footer>

  <BackToTop />
</template>

<script setup lang="ts">
import { ref, inject, watchEffect } from 'vue'
import config from '/@ts/config'

const name = ref<string>('');
const icp = ref<string>('');
const year: number = new Date().getFullYear();
const lang: string = inject('lang') || '';

const getI18n = (): void => {
  name.value = lang.value === 'en' ? config.nameEN : config.name;
  icp.value = lang.value === 'en' ? config.icpEN : config.icp;
}
watchEffect(getI18n);
</script>

<style scoped>
</style>