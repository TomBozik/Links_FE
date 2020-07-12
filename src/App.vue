<template>
  <div class="flex flex-col h-screen">
    <div class="flex flex-col items-end p-2 bg-gray-100 sm:hidden">
      <Burger v-if="this.$route.path !== '/login' && this.$route.path !== '/register'"></Burger>
    </div>
    <div class="flex flex-1 overflow-y-hidden">
      <Navigation v-if="this.$route.path !== '/login' && this.$route.path !== '/register'"></Navigation>
      <router-view />
    </div>
    
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import Burger from "@/components/Burger";

export default {
  name: 'App',
  components: {
    Navigation,
    Burger
  }
}
</script>

<style>
</style>
<style src="./assets/tailwind.css"></style>
