<template>
  <div>
    <button type="button" class="block appearance-none dark:text-gray-500 focus:outline-none" @click="toggle">
      <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path v-if="isOpen" fill-rule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
        <path v-if="!isOpen" fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
      </svg>
    </button>
  </div>
</template>

<script>

export default {
	name: 'Burger',


	data(){
		return {}
	},

	computed:{
    isOpen: function() {
			return this.$store.state.navbar.isOpen;
		},
	},

  methods:{
    toggle(){
			this.$store.dispatch('navbar/toggleNavbar');
		},
  }
}
</script>

<style>
</style>