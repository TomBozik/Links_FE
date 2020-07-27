<template>
  <div>

    <div v-if="showModal" class="fixed inset-0 z-40 flex items-center w-full h-full overflow-auto">

      <div class="relative z-50 max-w-full p-3 mx-auto my-0" style="width: 600px;">
        <div class="flex flex-col overflow-hidden bg-white border rounded shadow-lg">

          <div class="px-8 pt-4 pb-2 text-center">
            <h3 class="text-xl font-semibold">Delete Link?</h3>
          </div>

          <div class="px-8 pt-4 pb-2 text-red-600" v-if="errors">{{errors}}</div>

          <div class="flex items-center justify-center p-2">
            <button class="px-6 py-1 mb-1 mr-1 text-sm font-bold text-red-400 uppercase outline-none hover:text-red-700 focus:outline-none" type="button" v-on:click="deleteLink()">Delete</button>
            <button class="px-6 py-1 mb-1 mr-1 text-sm font-bold text-gray-700 uppercase outline-none hover:text-gray-900 focus:outline-none" type="button" v-on:click="toggleModal()">Close</button>
          </div>

        </div>
      </div>

      <div class="fixed inset-0 z-40 w-full h-full overflow-auto bg-black opacity-50"></div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'DeleteModal',
  data() {
    return {
      showModal: false,
      errors: null
    }
  },
  computed: {
    link: function() {
			return this.$store.state.link.clickedLink;
		},
  },
  methods:{
    toggleModal: function(){
      this.showModal = !this.showModal;
      this.errors = null;
    },
    deleteLink: function(){
      this.$store.dispatch('link/deleteLink', this.link.id)
      .then(
				() => {
					this.errors = [];
          this.showModal = false;
				},
        error => {
          this.errors = error;
        }
      );
    }
  }
  
}
</script>