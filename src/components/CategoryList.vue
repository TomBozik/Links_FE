<template>
	<div>
		<ul>
      <li v-for="category in categories" :key="category.id" @click="setCategory(category.id)" class="pb-1 font-semibold cursor-pointer text-md">{{category.name}}</li>
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