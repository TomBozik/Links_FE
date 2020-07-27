import Api from './Api';

export default {
  getTags(){
    return Api().get('/tag');
  },
}