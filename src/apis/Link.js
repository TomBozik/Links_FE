import Api from './Api';

export default {
  getLinks(categoryId, page){
    return Api().get(`/resource?category=${categoryId}&page=${page}`);
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
  }
}