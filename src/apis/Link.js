import Api from './Api';
export default {

  getLinks(categoryId, page, tags){
    var params = {
      params: {
        category: categoryId,
        tags: tags,
        page: page
      }
    };
    return Api().get(`/resource`, params);
  },

  createLink(form){
    return Api().post('/resource', form);
  },

  updateLink(form){
    return Api().put(`/resource/${form.id}`, form);
  },

  deleteLink(id){
    return Api().delete(`/resource/${id}`);
  },

  export(){
    return Api().request('/export', {responseType: 'blob'});
  },

  import(payload){
    return Api().post('/import', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

}