const TagMixin = {
  data(){
    return {
      tag: '',
      tags: [],
    }
  },
  methods:{
    addTag(tag) {
			this.tags.push(tag);
    },
    removeTag(index) {
			this.tags.splice(index, 1);
    },
    tagExists(tag) {
			return this.tags.indexOf(tag) !== -1;
    },
    handleTyping(e) {
			if ( e.keyCode === 188 ) {
				let tag = this.tag.replace(/,/g, '');
				if ( !this.tagExists(tag) ) {
					this.addTag(tag);
					this.tag = '';
				}
			}
		}
  },
}
export default TagMixin;