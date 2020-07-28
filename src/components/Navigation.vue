<template>
	<div :class="navbarIsOpen ? 'flex w-full sm:w-56' : 'hidden sm:flex sm:w-56'" class="flex-col justify-between overflow-y-auto bg-gray-100 border-l border-r" >
		<div class="p-1 text-lg font-bold tracking-wide text-center uppercase shadow-md sm:p-4">Links</div>
		<div class="flex flex-col flex-1 p-4 overflow-y-auto">
			<div class="flex flex-col pb-4">
				<div class="flex items-center">
					<div class="w-1/6"><button class="self-start text-xl text-gray-900 rounded-full appearance-none hover:text-custom-orange focus:outline-none" @click="newCategoryInput = !newCategoryInput"><i class="fas fa-plus"></i></button></div>
					<input :class="{ hidden: !newCategoryInput }" v-model="newCategoryName" class="w-5/6 px-2 py-2 -my-2 font-semibold leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" id="category" type="text" placeholder="New Category">
				</div>
				<div class="pt-1 text-red-600" v-if="error && newCategoryInput ">{{error}}</div>
				<button :class="{ hidden: !newCategoryInput }"  class="self-end pt-2 pr-1 text-sm font-semibold text-gray-900 uppercase hover:text-custom-orange focus:outline-none" @click="createCategory">Create</button>
			</div>
			<CategoryList />
		</div>

		<div v-if="importSuccess" class="text-sm font-semibold tracking-tighter text-center text-green-500 uppercase">Success</div>
		<div v-if="importError" class="text-sm font-semibold tracking-tighter text-center text-red-500 uppercase">{{importError}}</div>
		<div class="flex justify-between">
			<button @click="exportLinks" class="flex pl-2 text-sm font-semibold text-gray-900 uppercase appearance-none hover:text-custom-orange focus:outline-none">Export</button>
			<label class="flex pr-2 text-sm font-semibold text-gray-900 uppercase appearance-none cursor-pointer hover:text-custom-orange focus:outline-none">Import<input v-on:change="importLinks()" id="file" ref="file" type="file" style="display: none;"/></label>
		</div>

		<div class="px-4 py-2 text-center border-t">
			<a href="#" @click.prevent="logout" v-if="loggedIn" class="font-bold text-gray-900 uppercase hover:text-custom-orange">Logout <i class="fas fa-sign-out-alt"></i></a>
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
			file: '',
			newCategoryInput: false,
			newCategoryName: null,
			error: null,
			importSuccess: null,
			importError: null,
		}
	},
	
  methods: {
		exportLinks(){
			//TODO: move to Component
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
		importLinks(){
			//TODO: move to Component
			this.file = this.$refs.file.files[0];
			let formData = new FormData();
			formData.append('file', this.file);
			// LinkApi.import(formData);
			LinkApi.import(formData).then(
				() => {
					this.importSuccess = true;
					this.importError = false;
					this.$store.dispatch("category/getCategories");
				},
        error => {
					this.importError = error.response.data.error;
					this.importSuccess = false;
        }
      );
		},
		logout(){
			this.$store.dispatch('user/logout');
		},
		loadCategories(){
			this.$store.dispatch("category/getCategories");
		},
		//TODO: move to Component
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