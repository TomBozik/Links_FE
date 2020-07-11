import Api from './Api';

export default {
  createCategory(name){
    return Api().post('/category', {name: name});
  },

  getCategories(){
    return Api().get('/category');
  },
}