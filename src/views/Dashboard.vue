<template>
	<div class="flex flex-1 p-4 overflow-y-auto bg-gray-100">
		<div v-if="user && !links" class="m-auto text-2xl font-bold tracking-wide">Welcome, {{user.name}}</div>
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