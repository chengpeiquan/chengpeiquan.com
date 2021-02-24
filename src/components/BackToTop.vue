<template>
  <a
    class="fixed right-12 bottom-12 text-2xl select-none transform rotate-90"
    @click="scrollToTop"
  >
    <ic-twotone-arrow-back-ios />
  </a>
</template>

<script setup lang="ts">
import { isClient } from '@vueuse/core'

const scrollToTop = (): void | boolean => {
  if ( isClient ) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
</script>

<style scoped>
</style>