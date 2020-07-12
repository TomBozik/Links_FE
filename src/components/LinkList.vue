<template>
  <div v-if="links" class="flex flex-col w-full mx-auto sm:w-3/4">
    
    <div class="flex items-baseline">
      <div class="pb-4 pr-6 text-2xl font-bold tracking-wide"> {{ categoryName }}</div>
      <div class="pb-4 font-semibold text-green-600 uppercase cursor-pointer" @click="toggleModal">Create</div>
    </div>

    <div v-for="link in links" :key="link.id">
      <div class="p-2 mb-4 bg-white rounded-md shadow-lg">
        <div class="text-xl font-bold"> {{ link.name }} </div>
        <div class="font-semibold text-gray-700 text-md"> {{ link.description }} </div>
        <div class="text-sm truncate"> <a :href="link.url" target="_blank"> {{link.url}}</a></div>
      </div>
    </div>


  <div v-if="showModal" class="fixed inset-0 z-40 flex items-center w-full h-full overflow-auto">
    <div class="relative z-50 max-w-full p-3 mx-auto my-0" style="width: 600px;">
      <div class="flex flex-col overflow-hidden bg-white border rounded shadow-lg">
        <div class="px-8 pt-4 pb-2">
          <h3 class="text-xl font-semibold"> Create Link</h3>
        </div>
        <div class="flex flex-col px-8">
          <input v-model="form.name" class="px-2 py-2 mb-2 font-semibold leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" id="name" type="text" placeholder="Name">
          <div v-if="errors.name" class="text-red-600"> {{errors.name[0]}}</div>

          <input v-model="form.description" class="px-2 py-2 mb-2 font-semibold leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none " id="name" type="text" placeholder="Description">
            <div v-if="errors.description" class="text-red-600"> {{errors.description[0]}}</div>

          <input v-model="form.url" class="px-2 py-2 font-semibold leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" id="name" type="text" placeholder="URL">
          <div v-if="errors.url" class="text-red-600"> {{errors.url[0]}}</div>

        </div>
        <div class="flex items-center justify-end p-2">
          <button class="px-6 py-1 mb-1 mr-1 text-sm font-bold text-red-500 uppercase outline-none focus:outline-none" type="button" v-on:click="toggleModal()"> Close</button>
          <button class="px-6 py-1 mb-1 mr-1 text-sm font-bold text-green-500 uppercase outline-none focus:outline-none" type="button" v-on:click="createLink()">Create</button>
        </div>
      </div>
    </div>
    <div class="fixed inset-0 z-40 w-full h-full overflow-auto bg-black opacity-50"></div>
  </div>
    
  </div>
</template>

<script>
export default {
  name: 'LinkList',
  data() {
    return {
      showModal: false,
      form: {
        name: '',
        description: '',
        url: ''
      },
      errors: []
    }
  },
	computed:{
		links: function() {
			return this.$store.state.link.links;
    },
    categoryName: function(){
      return this.$store.getters['link/actualCategoryName'];
    }
  },
  
  methods:{
    toggleModal: function(){
      this.showModal = !this.showModal;
      this.errors = [];
      this.form.name = '';
      this.form.description = '';
      this.form.url = '';
    },
    createLink: function(){
      this.$store.dispatch('link/createLink', this.form)
      .then(
				() => {
					this.errors = [];
          this.showModal = false;
          this.form.name = '';
          this.form.description = '';
          this.form.url = '';
				},
        error => {
          if(error.response.status === 422){
            this.errors = error.response.data.errors;
          }
        }
      );
    }
  }
}
</script>

<style>
</style>