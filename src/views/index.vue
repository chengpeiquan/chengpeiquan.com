<template>
  <main>
    <!-- 头图 -->
    <section class="w-full h-60 overflow-hidden mb-6">
      <img
        class="img"
        :src="banner"
        alt="花臂当仔"
      >
    </section>
    <!-- 头图 -->

    <!-- 主体 -->
    <section class="container mx-auto mb-6">

    </section>
    <!-- 主体 -->

  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import banner from '/@img/banner.jpg'

export default defineComponent({
  setup () {
    

    return {
      banner
    }
  }
})
</script>

<style scoped>

</style>