<template>
<div v-if="meta">
  <div class="flex justify-center" v-if="meta.last_page != 1 && !loading">
    <div v-for="index in meta.last_page" :key="index">
      <button :class="index==meta.current_page ? 'text-green-500' : ''" class="px-1 font-bold hover:text-custom-orange" @click="changePage(index)">
        {{index}}
      </button>
    </div>
  </div>
</div>
</template>

<script>

export default {
	name: 'Pagination',
	data(){
		return {}
  },
  
	computed:{
    pagination: function() {
			return this.$store.state.link.pagination;
    },
    meta: function() {
			return this.$store.state.link.meta;
    },
    loading: function() {
			return this.$store.state.link.loading;
		},
	},

  methods:{
    changePage: function(id) { 
      this.$store.dispatch('link/getLinks', id);
    },
  }
}
</script>

<style>
</style>