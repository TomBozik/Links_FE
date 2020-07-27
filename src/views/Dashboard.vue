<template>
	<div :class="navbarIsOpen ? 'hidden sm:flex' : 'w-full flex'" class="flex-1 p-4 overflow-y-auto">

		<div class="self-center mx-auto"> 
			<div v-if="user && !links && !loading && !loadingError" class="m-auto text-2xl font-bold tracking-wide">Welcome, {{user.name}}</div>
		</div>

		<div v-if="links" class="flex w-full"><LinkList/></div>
	</div>
</template>

<script>
import LinkList from "@/components/link/LinkList";

export default {
	name: 'Dashboard',

	components: {
    LinkList,
  },

	data(){
		return {}
	},

	computed:{
		user: function() {
			return this.$store.state.user.user;
		},
		links: function() {
			return this.$store.state.link.links;
		},
		loading: function() {
			return this.$store.state.link.loading;
		},
		loadingError: function() {
			return this.$store.state.link.loadingError;
		},
		navbarIsOpen: function() {
			return this.$store.state.navbar.isOpen;
		},
	},

	mounted() {
		this.$store.dispatch('category/getCategories');
		this.$store.dispatch('link/getTags');
		this.$store.dispatch('user/getUser');
	}
}
</script>

<style>
</style>