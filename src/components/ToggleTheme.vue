<template>
  <a
    class="select-none text-xl"
    :title="
      lang === 'en'
        ? `Switch to ${isDark ? 'light' : 'dark'} theme`
        : `切换到${isDark ? '普通' : '暗黑'}模式`
    "
    @click="toggleTheme"
  >
    <ri-moon-line v-show="isDark" />
    <ri-sun-line v-show="!isDark" />
  </a>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import isDark from '/@libs/isDark'

const lang: string = inject('lang') || ''

const toggleTheme = (): void => {
  isDark.value = !isDark.value
}
</script>
