<template>
	<div class="text-center sm:text-left">
		<ul>
      <li v-for="category in categories" :key="category.id" @click="setCategory(category.id)" class="pb-4 text-xl font-semibold cursor-pointer sm:pb-1 sm:text-md">{{category.name}}</li>
    </ul>
	</div>
</template>

<script>
export default {
	name: 'CategoryList',
	
  data() {
		return {}
	},
	
  methods: {
    setCategory(categoryId){
      this.$store.dispatch('navbar/toggleNavbar');
			this.$store.dispatch('link/setActualCategory', categoryId);
    },
	},
	
  computed:{
    categories: function(){
      return this.$store.state.link.categories;
    }
  },
}
</script>

<style>
</style>