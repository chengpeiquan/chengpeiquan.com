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
    <a class="year">© {{ year }} {{ name }}</a>
    <br v-if="isMobile" />
    <a
      class="md:ml-12 ml-2"
      href="https://beian.miit.gov.cn/"
      target="_blank"
      rel="nofollow noopener noreferrer"
    >
      {{ icp }}
    </a>
  </footer>

  <BackToTop />
</template>

<script setup lang="ts">
import { ref, inject, watchEffect } from 'vue'
import config from '/@/config'
import isMobile from '/@libs/isMobile'

const name = ref<string>('')
const icp = ref<string>('')
const year: number = new Date().getFullYear()
const lang: string = inject('lang') || ''

const getI18n = (): void => {
  const key: string = lang.value
  name.value = config.i18n[key].name
  icp.value = config.i18n[key].icp
}
watchEffect(getI18n)
</script>

<style lang="postcss" scoped>
.year {
  color: var(--fg-deeper);
}
</style>
