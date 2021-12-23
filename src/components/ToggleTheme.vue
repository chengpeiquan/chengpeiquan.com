<template>
  <a
    class="select-none text-xl"
    :title="
      getText({
        zh: `切换到${isDark ? '普通' : '暗黑'}模式`,
        en: `Switch to ${isDark ? 'light' : 'dark'} theme`,
      })
    "
    @click="toggleTheme"
  >
    <ri-moon-line v-show="isDark" />
    <ri-sun-line v-show="!isDark" />
  </a>
</template>

<script setup lang="ts">
import isDark from '@libs/isDark'
import { useI18n } from '@/hooks'

const { getText } = useI18n()
const toggleTheme = (): void => {
  isDark.value = !isDark.value
}
</script>
