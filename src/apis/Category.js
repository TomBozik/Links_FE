import Api from './Api';

export default {
  createCategory(name){
    return Api().post('/category', {name: name});
  },
  deleteCategory(id){
    return Api().delete(`/category/${id}`);
  },
  getCategories(){
    return Api().get('/category');
  },
}