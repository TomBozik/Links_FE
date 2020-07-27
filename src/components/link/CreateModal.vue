<template>
  <div>

    <div v-if="showModal" class="fixed inset-0 z-40 flex items-center w-full h-full overflow-auto">

      <div class="relative z-50 max-w-full p-3 mx-auto my-0" style="width: 600px;">
        <div class="flex flex-col overflow-hidden bg-white border rounded shadow-lg">

          <div class="px-8 pt-4 pb-2">
            <h3 class="text-xl font-semibold">Create Link</h3>
          </div>

          <div class="flex flex-col px-2 sm:px-8">
            <input v-model="link.name" class="px-2 py-2 mb-2 font-semibold leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" id="name" type="text" placeholder="Name">
            <div v-if="errors.name" class="text-red-600"> {{errors.name[0]}}</div>

            <input v-model="link.description" class="px-2 py-2 mb-2 font-semibold leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none " id="name" type="text" placeholder="Description">
            <div v-if="errors.description" class="text-red-600"> {{errors.description[0]}}</div>

            <input v-model="link.url" class="px-2 py-2 mb-2 font-semibold leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" id="name" type="text" placeholder="URL">
            <div v-if="errors.url" class="text-red-600"> {{errors.url[0]}}</div>

            <input @keyup="handleTyping" v-model="tag" class="px-2 py-2 mb-2 font-semibold leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none " id="name" type="text" placeholder="Add tags separeted by ,">
            <div v-if="errors.tags" class="text-red-600"> {{errors.tags[0]}}</div>
            <div class="flex">
              <div class="px-2 py-1 mx-1 text-sm font-semibold text-gray-700 uppercase border-2 border-gray-700 rounded-lg cursor-pointer hover:border-red-600 hover:text-red-600" v-for="(_tag, index) in tags" :key="index" @click="removeTag(index)">{{ _tag }}</div>
            </div>
          </div>

          <div class="flex items-center justify-end p-2">
            <button class="px-2 py-1 mb-1 mr-1 text-sm font-bold text-gray-700 uppercase outline-none sm:px-8 hover:text-gray-900 focus:outline-none" type="button" v-on:click="toggleModal()">Close</button>
            <button class="px-2 py-1 mb-1 mr-1 text-sm font-bold text-green-500 uppercase outline-none sm:px-8 hover:text-green-700 focus:outline-none" type="button" v-on:click="createLink()">Create</button>
          </div>

        </div>
      </div>

      <div class="fixed inset-0 z-40 w-full h-full overflow-auto bg-black opacity-50"></div>
    </div>
    
  </div>
</template>

<script>
import TagMixin from "@/mixins/TagMixin";

export default {
  name: 'CreateModal',
  mixins: [TagMixin],
  data() {
    return {
      showModal: false,
      link: {
        name: '',
        description: '',
        url: '',
        tags: [],
      },
      errors: []
    }
  },
  methods:{
    toggleModal: function(){
      this.showModal = !this.showModal;
      this.errors = [];
      this.link.name = '';
      this.link.description = '';
      this.link.url = '';
      this.link.tags = [];
      this.tags = [];
      this.tag = '';
    },
    createLink: function(){
      this.link.tags = this.tags; //set tags in link from mixin tags
      this.$store.dispatch('link/createLink', this.link)
      .then(
				() => {
					this.errors = [];
          this.showModal = false;
          this.link.name = '';
          this.link.description = '';
          this.link.url = '';
          this.link.tags = [];
          this.tags = [];
          this.tag = '';
				},
        error => {
          if(error.response.status === 422){
            this.errors = error.response.data.errors;
          }
        }
      );
    },
    
  }
  
}
</script>