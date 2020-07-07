<template>
	<div class="container mx-auto text-center">
		<div v-if="user">Welcome, {{user.name}}</div>
	</div>
</template>

<script>
export default {
	name: 'Dashboard',

	data(){
		return {}
	},

	computed:{
		user: function() {
			return this.$store.state.user.user;
		},
	},

	mounted() {
		this.$store.dispatch('user/getUser')
	}
}
</script>

<style>
</style>