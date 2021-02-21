<template>
  <footer class="flex justify-center items-center w-full h-36">
    <p class="opacity-70 md:text-sm text-xs">
      <span>© {{ year }} 程沛权</span>
      <a
        class="ml-4"
        href="https://beian.miit.gov.cn/"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >粤ICP备20011269号-1</a>
    </p>
  </footer>
</template>

<script setup lang="ts">
const year: number = new Date().getFullYear();
</script>

<style scoped>
</style>