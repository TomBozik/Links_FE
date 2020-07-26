<template>
	<div :class="navbarIsOpen ? 'flex w-full sm:w-56' : 'hidden sm:flex sm:w-56'" class="flex-col justify-between overflow-y-auto bg-gray-100 border-r" >
		<div class="p-1 text-lg font-bold tracking-wide text-center uppercase shadow-md sm:p-4">Links</div>
		<div class="flex flex-col flex-1 p-4 overflow-y-auto">
			<div class="flex flex-col pb-4">
				<div class="flex items-center">
					<div class="w-1/6"><button class="self-start text-xl rounded-full appearance-none focus:outline-none" @click="newCategoryInput = !newCategoryInput"><i class="fas fa-plus"></i></button></div>
					<input :class="{ hidden: !newCategoryInput }" v-model="newCategoryName" class="w-5/6 px-2 py-2 -my-2 font-semibold leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" id="category" type="text" placeholder="New Category">
				</div>
				<div class="pt-1 text-red-600" v-if="error && newCategoryInput ">{{error}}</div>
				<button :class="{ hidden: !newCategoryInput }"  class="self-end pt-2 pr-1 text-sm font-semibold uppercase focus:outline-none" @click="createCategory">Create</button>
			</div>
			<CategoryList />
		</div>

		<button @click="exportLinks" class="flex pl-2 text-sm font-semibold text-gray-700 uppercase">Export</button>
		
		<div class="px-4 py-2 text-center border-t">
			<a href="#" @click.prevent="logout" v-if="loggedIn" class="font-bold uppercase">Logout <i class="fas fa-sign-out-alt"></i></a>
		</div>

	</div>
</template>

<script>
import LinkApi from "@/apis/Link";
import CategoryList from "@/components/category/CategoryList";

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
		exportLinks(){
			LinkApi.export().then(({ data }) => {
        const downloadUrl = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'links.csv');
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
		},
		logout(){
			this.$store.dispatch('user/logout');
		},
		loadCategories(){
			this.$store.dispatch("category/getCategories");
		},
		createCategory(){
			this.$store.dispatch('category/createCategory', this.newCategoryName)
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
		navbarIsOpen: function() {
			return this.$store.state.navbar.isOpen;
		},
	},
	
	mounted: function(){
		// this.loadCategories();
	},
	
}
</script>

<style>
</style>