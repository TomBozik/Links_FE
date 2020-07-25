<template>
  <div>

    <div v-if="showModal" class="fixed inset-0 z-40 flex items-center w-full h-full overflow-auto">

      <div class="relative z-50 max-w-full p-3 mx-auto my-0" style="width: 600px;">
        <div class="flex flex-col overflow-hidden bg-white border rounded shadow-lg">

          <div class="px-8 pt-4 pb-2">
            <h3 class="text-xl font-semibold">Update Link</h3>
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
            <button class="px-6 py-1 mb-1 mr-1 text-sm font-bold text-red-500 uppercase outline-none focus:outline-none" type="button" v-on:click="toggleModal()">Close</button>
            <button class="px-6 py-1 mb-1 mr-1 text-sm font-bold text-green-500 uppercase outline-none focus:outline-none" type="button" v-on:click="updateLink()">Update</button>
          </div>

        </div>
      </div>

      <div class="fixed inset-0 z-40 w-full h-full overflow-auto bg-black opacity-50"></div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'UpdateModal',
  props: {
    link: {
      type: Object
    }
  },
  data() {
    return {
      showModal: false,
      errors: []
    }
  },
  computed: {
    form: function(){
      return this.link;
    }
  },
  methods:{
    toggleModal: function(){
      this.showModal = !this.showModal;
      this.errors = [];
    },
    updateLink: function(){
      this.$store.dispatch('link/updateLink', this.form)
      .then(
				() => {
					this.errors = [];
          this.showModal = false;
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