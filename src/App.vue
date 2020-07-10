<template>
  <div id="app">
    <Navigation v-if="this.$route.path !== '/login' && this.$route.path !== '/register'"></Navigation>
    <router-view />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
export default {
  name: 'App',
  components: {
    Navigation,
  }
}
</script>

<style>
</style>
<style src="./assets/tailwind.css"></style>
