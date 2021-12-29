<template>
  <footer
    class="
      flex
      justify-center
      items-center
      w-full
      h-36
      opacity-70
      md:text-sm
      text-xs
    "
    :class="{ 'flex-col': isMobile }"
  >
    <a class="year">© {{ new Date().getFullYear() }} {{ getText('name') }}</a>
    <br v-if="isMobile" />
    <a
      class="md:ml-12 ml-2"
      href="https://beian.miit.gov.cn/"
      target="_blank"
      rel="nofollow noopener noreferrer"
    >
      {{ getText('icp') }}
    </a>
  </footer>

  <BackToTop />
</template>

<script setup lang="ts">
import isMobile from '@libs/isMobile'
import { useI18n } from '@/hooks'
const { getText } = useI18n()
</script>

<style lang="postcss" scoped>
.year {
  color: var(--fg-deeper);
}
</style>
