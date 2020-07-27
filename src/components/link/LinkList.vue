<template>
  <div v-if="links" class="flex flex-col w-full mx-auto sm:w-3/4">
    
    <div class="flex flex-col lg:items-baseline lg:flex-row">
      <div class="pb-4 pr-6 text-2xl font-bold tracking-wide"> {{ categoryName }}</div>
      <div class="flex justify-between flex-1">
        <div class="pb-4 text-sm font-semibold text-green-500 uppercase cursor-pointer hover:text-green-700" @click="toggleCreateModal">New link</div>
        <div class="pb-4 text-sm font-semibold text-red-400 uppercase cursor-pointer hover:text-red-700" @click="toggleDeleteCategoryModal()">Delete Category</div>
      </div>
    </div>

    <TagFilter ref="tagFilter"></TagFilter>

    <div v-if="links.length == 0 && loading" class="flex mx-auto font-semibold">LOADING...</div>
    <div v-if="links.length == 0 && loadingError" class="flex mx-auto font-semibold">ERROR</div>

    <div v-for="link in links" :key="link.id">
      <div class="p-2 mb-4 bg-white rounded-md shadow-lg">
        <div class="flex justify-between">
          <div>
            <div class="text-xl font-bold"> {{ link.name }} </div>
            <div class="font-semibold text-gray-700 text-md"> {{ link.description }} </div>
            <div class="text-sm truncate hover:text-custom-orange"> <a :href="link.url" target="_blank"> {{link.url}}</a></div>
            <div class="flex pt-2">
              <div v-for="tag in link.tags" :key="tag.name" class="px-1 text-xs font-semibold text-gray-700 uppercase cursor-pointer hover:text-custom-orange" @click="addTagToFilter(tag.name)">{{ tag.name }}</div>
            </div>
          </div>
          <div class="flex flex-col items-end justify-between lg:flex-row">
            <div class="pr-0 text-blue-400 hover:text-blue-700 lg:pr-2"><button @click="toggleUpdateModal(link)" class="text-sm font-semibold uppercase">Update</button></div>
            <div class="text-red-400 hover:text-red-700"><button @click="toggleDeleteModal(link)" class="text-sm font-semibold uppercase">Delete</button></div>
          </div>
        </div>

      </div>
    </div>
    
  <Pagination></Pagination>
  <createModal ref="createModal"></createModal>
  <updateModal ref="updateModal"></updateModal>
  <deleteModal ref="deleteModal"></deleteModal>
  <deleteCategoryModal ref="deleteCategoryModal"></deleteCategoryModal>

  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import TagFilter from "@/components/Filter";
import updateModal from "@/components/link/UpdateModal";
import deleteModal from "@/components/link/DeleteModal";
import createModal from "@/components/link/CreateModal";
import deleteCategoryModal from "@/components/category/DeleteCategoryModal";

export default {
  name: 'LinkList',
  components: { 
    Pagination,
    TagFilter,
    updateModal,
    deleteModal,
    deleteCategoryModal,
    createModal
  },
  data() {
    return {
    }
  },
	computed:{
		links: function() {
			return this.$store.state.link.links;
    },
    categoryName: function(){
      return this.$store.getters['category/actualCategoryName'];
    },
    loading: function() {
			return this.$store.state.link.loading;
		},
		loadingError: function() {
			return this.$store.state.link.loadingError;
		},
  },
  
  methods:{
    toggleUpdateModal: function(link) { 
      this.$store.dispatch('link/setClickedLink', link)
      this.$refs.updateModal.toggleModal() 
    },
    toggleDeleteModal: function(link) { 
      this.$store.dispatch('link/setClickedLink', link)
      this.$refs.deleteModal.toggleModal() 
    },
    toggleCreateModal: function() { 
      this.$refs.createModal.toggleModal() 
    },
    toggleDeleteCategoryModal: function() { 
      this.$refs.deleteCategoryModal.toggleModal() 
    },
    addTagToFilter: function(tag) { 
      this.$refs.tagFilter.addTag(tag);
    },
  }
}
</script>

<style>
</style>