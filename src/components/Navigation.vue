<template>
	<header class="w-full" id="all">
		<div class="container items-center px-4 py-4 mx-auto sm:py-1 sm:flex sm:justify-between">

			<div class="flex items-center justify-between">
				<!-- left side -->
				<div class="dark:text-gray-500">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
				</div>
				<!-- left side end -->

				<!-- burger  -->
				<div class="sm:hidden" id="nav-burger">
					<button type="button" class="block dark:text-gray-500" @click="isOpen = !isOpen">
						<svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
							<path v-if="isOpen" fill-rule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
							<path v-if="!isOpen" fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
						</svg>
					</button>
				</div>
				<!-- burger end -->
			</div>

			<!-- links -->
			<div id="nav-links" :class="isOpen ? 'block' : 'hidden'" class="items-center pt-8 pb-2 sm:pt-2 sm:flex">
        <router-link v-if="loggedIn" :to="{name: 'Dashboard'}" class="block py-1 pr-8 font-bold uppercase">Dashboard</router-link>
				<router-link v-if="!loggedIn" :to="{name: 'Login'}" class="block py-1 pr-8 font-bold uppercase">Login</router-link>
        <router-link v-if="!loggedIn" :to="{name: 'Register'}" class="block py-1 pr-8 font-bold uppercase">Register</router-link>
        <a href="#" @click.prevent="logout" v-if="loggedIn" class="block py-1 pr-8 font-bold uppercase">Logout</a>
			</div>
			<!-- links end -->
				
		</div>
	</header>
</template>

<script>
export default {
	name: 'Navigation',
	
  data() {
		return {
			isOpen: false,
		}
	},
	
  methods: {
		logout(){
			this.$store.dispatch('user/logout');
		}
	},
	
  computed:{
		loggedIn: function() {
			return this.$store.state.user.loggedIn;
		},
  },
}
</script>

<style>
</style>