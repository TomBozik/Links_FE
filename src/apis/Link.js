import Api from './Api';

export default {
  getLinks(categoryId){
    return Api().get(`/resource?category=${categoryId}`);
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
}