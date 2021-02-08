<template>
  <header class="header">
    <div class="wrap">
      <div class="website-info">
        <div class="logo">
          <img :src="logo" alt="程沛权">
        </div>
        <span class="name">程沛权</span>
      </div>

      <nav>

      </nav>

      <toggle-theme />
    </div>
  </header>
</template>

<script setup lang="ts">
import { isDark } from '/@/logics'
import logo from '/@img/logo-min.jpg'
</script>

<style lang="stylus" scoped>
.header
  display flex
  justify-content center
  align-items center
  width 100%
  height 80px
  .wrap
    display flex
    justify-content space-between
    align-items center
    width var(--container)
    max-width 100%
    height @height
  .website-info
    display flex
    align-items center
    .logo
      display flex
      flex-shrink 0
      width 50px
      height @width
      border-radius 50%
      overflow hidden
      img
        width 100%
        height @width
        object-fit cover
    .name
      font-size 20px
      color var(--c-white)
      margin-left calc(var(--margin) / 2)
</style>
