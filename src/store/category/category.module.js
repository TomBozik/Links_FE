import CategoryApi from "@/apis/Category";

export const category = {
  namespaced: true,
  state: {
    actualCategory: '',
    categories: [],
  },

  // getters
  getters: {
    actualCategoryName: state => {
      return state.categories.filter(category => category.id === state.actualCategory)[0]['name']
    }
  },

  // actions
  actions: {
    getCategories({ commit }) {
      return CategoryApi.getCategories().then(
        response => {
          commit('GET_CATEGORIES_SUCCESS', response);
        },
        () => {
          commit('GET_CATEGORIES_FAILURE');
        }
      );
    },

    setActualCategory({ dispatch, commit }, categoryId) {
      commit('SET_ACTUAL_CATEGORY', categoryId);
      dispatch('link/getLinks', null, {root: true});
    },

    createCategory({commit}, categoryName){
      return CategoryApi.createCategory(categoryName).then(
        response => {
          commit('CREATE_CATEGORY_SUCCESS', response);
          return Promise.resolve(response);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    deleteCategory({commit}, id){
      return CategoryApi.deleteCategory(id).then(
        response => {
          commit('DELETE_CATEGORY_SUCCESS', id);
          return Promise.resolve(response);
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  },


  // mutations
  mutations: {
    GET_CATEGORIES_SUCCESS(state, response) {
      state.categories = response.data.data;
    },
    GET_CATEGORIES_FAILURE(state) {
      state.categories = [];
    },
    CREATE_CATEGORY_SUCCESS(state, response) {
      state.categories = response.data.data;
    },
    SET_ACTUAL_CATEGORY(state, categoryId) {
      state.actualCategory = categoryId;
    },
    DELETE_CATEGORY_SUCCESS(state, id) {
      state.actualCategory = '';
      state.categories = state.categories.filter(obj => obj.id !== id);
      this.state.link.links = null;
    },
  }
}

