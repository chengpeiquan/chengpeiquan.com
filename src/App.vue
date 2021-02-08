<template>
  <Header />
  <img alt="Vue logo" :src="logo" />
  <router-view />
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import Header from '/@cp/Header.vue'
import Footer from '/@cp/Footer.vue'

import logo from '/@img/logo.png'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Footer
  },
  setup () {
    console.log(logo);
    const router = useRouter();
    console.log(router);
    
    
    
    return {
      logo
    }
  }
})
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>