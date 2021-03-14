<template>
  <section class="google-adsense">
    <ins
      class="adsbygoogle"
      style="display:inline-block; width:340px; height: 136px"
      data-ad-client="ca-pub-7109929923549092"
      data-ad-slot="2712556929"
    >
    </ins>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { isClient } from '@vueuse/core'

const lib: string = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';

const push = (): void => {
  setTimeout(() => {
    (adsbygoogle = window.adsbygoogle || []).push({});
  }, 1000);
}

const init = (): void | boolean => {
  try {
    const url: string = window.location.href;
    if ( url.includes('localhost') ) {
      return false;
    }

    const script: HTMLScriptElement = document.createElement('script');
    script['async'] = true;
    script['src'] = lib;

    script.onload = () => {
      push();
    }

    if ( !document.head.querySelector(`script[src='${lib}']`) ) {
      document.head.appendChild(script);
    }
  } catch (e) {
    console.log(e);
  }
}

if ( isClient ) {
  onMounted(init);
}
</script>

<style lang="postcss" scoped>
.google-adsense {
  width: 100%;
  max-width: 100% !important;
  max-height: 136px !important;
  overflow: hidden !important;
}
</style>