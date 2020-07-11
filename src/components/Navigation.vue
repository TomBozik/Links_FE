<template>
	<div class="flex flex-col justify-between w-56 overflow-y-auto bg-gray-100 border-r">
		
		<div class="p-4 text-lg font-bold tracking-wide text-center uppercase shadow-md">Links</div>

		<div class="flex flex-col flex-1 p-4 overflow-y-auto">

			<div class="flex flex-col pb-4">
				<div class="flex items-center">
					<div class="w-1/6"><button class="self-start text-xl rounded-full appearance-none focus:outline-none" @click="newCategoryInput = !newCategoryInput"><i class="fas fa-plus"></i></button></div>
					<input :class="{ hidden: !newCategoryInput }" v-model="newCategoryName" class="w-5/6 px-2 py-2 -my-2 font-semibold leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" id="category" type="text" placeholder="New Category">
				</div>
				<div class="pt-1 text-red-600" v-if="error && newCategoryInput ">{{error}}</div>
				<button :class="{ hidden: !newCategoryInput }"  class="self-end pt-2 pr-1 font-bold focus:outline-none" @click="createCategory">Create</button>
			</div>
			
			<CategoryList />
		</div>

		<div class="px-4 py-2 text-center border-t">
			<a href="#" @click.prevent="logout" v-if="loggedIn" class="font-bold uppercase">Logout <i class="fas fa-sign-out-alt"></i></a>
		</div>

	</div>
</template>

<script>
import CategoryList from "@/components/CategoryList";

export default {
	name: 'Navigation',

	components: {
    CategoryList,
  },
	
  data() {
		return {
			newCategoryInput: false,
			newCategoryName: null,
			error: null
		}
	},
	
  methods: {
		logout(){
			this.$store.dispatch('user/logout');
		},
		loadCategories(){
			this.$store.dispatch("link/getCategories");
		},
		createCategory(){
			this.$store.dispatch('link/createCategory', this.newCategoryName)
      .then(
				() => {
					this.error= null;
					this.newCategoryName = null;
				},
        error => {
          if(error.response.status === 402){
						this.error = error.response.data.error;
          }
        }
      );
		}
	},
	
  computed:{
		loggedIn: function() {
			return this.$store.state.user.loggedIn;
		},
	},
	
	mounted: function(){
		// this.loadCategories();
	},
	
}
</script>

<style>
</style>