<template>
  <div class="pb-4">
    <input @keyup="handleTyping" v-model="tag" class="w-full px-2 py-2 font-semibold leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" type="text" placeholder="Filter by tags separated by ,">
    <div class="flex pt-2">
      <div class="px-2 mx-1 text-sm font-semibold text-gray-700 uppercase border-2 border-gray-700 rounded-lg cursor-pointer hover:border-red-600 hover:text-red-600" v-for="(_tag, index) in tags" :key="index" @click="removeTag(index)">{{ _tag }}</div>
    </div>
  </div>
</template>

<script>
import TagMixin from "@/mixins/TagMixin";

export default {
  name: 'TagFilter',
  mixins: [TagMixin],
	data(){
		return {}
  },
  methods: {
    // overriden mixin methods
    addTag(tag) {
      this.tags.push(tag);
      this.$store.dispatch('link/setFilterTags', this.tags);
    },
    removeTag(index) {
      this.tags.splice(index, 1);
      this.$store.dispatch('link/setFilterTags', this.tags);
    },
  }
}
</script>
