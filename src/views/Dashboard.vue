<template>
	<div class="flex flex-1 p-4 overflow-y-auto bg-gray-100">

		<div class="self-center mx-auto"> 
			<div v-if="user && !links && !loading && !loadingError" class="m-auto text-2xl font-bold tracking-wide">Welcome, {{user.name}}</div>
			<div v-if="user && !links && loading" class="flex w-full">LOADING...</div>
			<div v-if="user && !links && loadingError" class="flex w-full">ERROR</div>
		</div>

		<div v-if="links" class="flex w-full"><LinkList/></div>
	</div>
</template>

<script>
import LinkList from "@/components/LinkList";

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
		}
	},

	mounted() {
		this.$store.dispatch('link/getCategories');
		this.$store.dispatch('user/getUser');
	}
}
</script>

<style>
</style>