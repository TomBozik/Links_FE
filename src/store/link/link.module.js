import CategoryApi from "@/apis/Category";
import LinkApi from "@/apis/Link";

export const link = {
  namespaced: true,
  state: {
    actualCategory: '',
    categories: [],
    links: null,
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

    getLinks({ commit, state }) {
      return LinkApi.getLinks(state.actualCategory).then(
        response => {
          commit('GET_LINKS_SUCCESS', response);
        },
        () => {
          commit('GET_LINKS_FAILURE');
        }
      );
    },

    setActualCategory({ dispatch, commit }, categoryId) {
      commit('SET_ACTUAL_CATEGORY', categoryId);
      dispatch('getLinks');
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

    createLink({commit, state}, form){
      form = Object.assign({'category_id': state.actualCategory}, form);
      return LinkApi.createLink(form).then(
        response => {
          commit('CREATE_LINK_SUCCESS', response);
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

    GET_LINKS_SUCCESS(state, response) {
      state.links = response.data.data;
    },
    GET_LINKS_FAILURE(state) {
      state.links = [];
    },

    CREATE_CATEGORY_SUCCESS(state, response) {
      state.categories = response.data.data;
    },

    CREATE_LINK_SUCCESS(state, response) {
      state.links = response.data.data;
    },

    SET_ACTUAL_CATEGORY(state, categoryId) {
      state.actualCategory = categoryId;
    },

  }
}

