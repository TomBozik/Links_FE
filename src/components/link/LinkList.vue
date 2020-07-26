<template>
  <div v-if="links" class="flex flex-col w-full mx-auto sm:w-3/4">
    
    <div class="flex items-baseline justify-between">
      <div class="flex items-baseline">
        <div class="pb-4 pr-6 text-2xl font-bold tracking-wide"> {{ categoryName }}</div>
        <div class="pb-4 text-sm font-semibold text-green-600 uppercase cursor-pointer" @click="toggleCreateModal">New link</div>
      </div>
      <div class="flex items-baseline">
        <div class="pb-4 text-sm font-semibold text-red-600 uppercase cursor-pointer" @click="toggleDeleteCategoryModal()">Delete Category</div>
      </div>
    </div>

    <div v-for="link in links" :key="link.id">
      <div class="p-2 mb-4 bg-white rounded-md shadow-lg">
        <div class="flex justify-between">
          <div>
            <div class="text-xl font-bold"> {{ link.name }} </div>
            <div class="font-semibold text-gray-700 text-md"> {{ link.description }} </div>
            <div class="text-sm truncate"> <a :href="link.url" target="_blank"> {{link.url}}</a></div>
            <div class="flex pt-2">
              <div v-for="tag in link.tags" :key="tag.name" class="px-1 text-xs font-semibold text-gray-700 uppercase">{{ tag.name }}</div>
            </div>
          </div>
          <div class="flex flex-col items-end justify-between lg:flex-row">
            <div class="pr-0 text-blue-500 lg:pr-2"><button @click="toggleUpdateModal(link)" class="text-sm font-semibold uppercase">Update</button></div>
            <div class="text-red-500"><button @click="toggleDeleteModal(link)" class="text-sm font-semibold uppercase">Delete</button></div>
          </div>
        </div>

      </div>
    </div>

  <createModal ref="createModal"></createModal>
  <updateModal ref="updateModal" v-bind:link="clickedLink"></updateModal>
  <deleteModal ref="deleteModal" v-bind:link="clickedLink"></deleteModal>
  <deleteCategoryModal ref="deleteCategoryModal"></deleteCategoryModal>

  </div>
</template>

<script>
import updateModal from "@/components/link/UpdateModal";
import deleteModal from "@/components/link/DeleteModal";
import createModal from "@/components/link/CreateModal";
import deleteCategoryModal from "@/components/category/DeleteCategoryModal";

export default {
  name: 'LinkList',
  components: { 
    updateModal,
    deleteModal,
    deleteCategoryModal,
    createModal
  },
  data() {
    return {
      clickedLink: null,
    }
  },
	computed:{
		links: function() {
			return this.$store.state.link.links;
    },
    categoryName: function(){
      return this.$store.getters['category/actualCategoryName'];
    }
  },
  
  methods:{
    toggleUpdateModal: function(link) { 
      this.clickedLink = { ...link }
      this.clickedLink['tags'] = this.clickedLink['tags'].map( tag => tag.name);
      this.$refs.updateModal.toggleModal() 
    },
    toggleDeleteModal: function(link) { 
      this.clickedLink = { ...link }
      this.$refs.deleteModal.toggleModal() 
    },
    toggleCreateModal: function() { 
      this.$refs.createModal.toggleModal() 
    },
    toggleDeleteCategoryModal: function() { 
      this.$refs.deleteCategoryModal.toggleModal() 
    },
  }
}
</script>

<style>
</style>