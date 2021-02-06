<template>
  <NavBar />
  <!-- <img alt="Vue logo" src="./assets/img/logo.png" /> -->
  <img alt="Vue logo" :src="logo" />
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->

  <router-view />
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '/@cp/NavBar.vue'
import Footer from '/@cp/Footer.vue'

import logo from '/@img/logo.png'

export default defineComponent({
  name: 'App',
  components: {
    NavBar,
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>