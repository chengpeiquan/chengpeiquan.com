<template>
  <a
    class="select-none md:text-xl text-base"
    :title="`切换到${ isDark ? '普通' : '暗黑' }模式`"
    @click="toggleTheme"
  >
    <ri-moon-line v-show="isDark" />
    <ri-sun-line v-show="!isDark" />
  </a>
</template>

<script setup lang='ts'>
import isDark from '/@libs/isDark'

const toggleTheme = (): void => {
  isDark.value = !isDark.value
}
</script>
