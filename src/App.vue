<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import Header from '/@cp/Header.vue'
import Footer from '/@cp/Footer.vue'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Footer
  },
  setup () {
    const router = useRouter();
    console.log(router);
  }
})
</script>