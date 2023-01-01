<template>
  <div class="mt-2em mb-2em">
    <div class="video-player">
      <video :src="url" controls preload="auto" :poster="poster || ''"></video>
    </div>
    <p class="text-sm text-gray-500 text-center !indent-0px mt-2" v-if="title">
      {{ title }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  url: string
  poster?: string
  title?: string
}>()
</script>

<style lang="postcss" scoped>
.video-player {
  @apply relative w-full h-0 bg-black rounded overflow-hidden;
  padding-top: 56.3%;
  video {
    @apply absolute top-0 left-0 w-full h-full m-0;
  }
}
</style>
