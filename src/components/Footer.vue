<template>
  <footer class="flex justify-center items-center w-full h-40">
    <p class="prose">
      <span>© {{ year }} 程沛权</span>
      <a
        class="link ml-4"
        href="https://beian.miit.gov.cn/"
        target="_blank"
        rel="nofollow"
      >粤ICP备20011269号-1</a>
    </p>
  </footer>
</template>

<script setup lang="ts">
const year: number = new Date().getFullYear();
</script>

<style scoped>

</style>