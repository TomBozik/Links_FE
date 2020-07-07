import UserApi from "@/apis/User";
import router from "@/router";

const isLoggedIn = localStorage.getItem('auth');
const initialState = isLoggedIn
  ? { loggedIn: true, user: null  }
  : { loggedIn: false, user: null };


export const user = {
  namespaced: true,
  state: initialState,

  actions: {

      login({ commit }, form) {
        return UserApi.login(form).then(
          data => {
            commit('LOGIN_SUCCESS', data);
            return Promise.resolve(data);
          },
          error => {
            commit('LOGIN_FAILURE');
            return Promise.reject(error);
          }
        );
      },

      register({ commit }, form) {
        return UserApi.register(form).then(
          data => {
            commit('REGISTER_SUCCESS');
            return Promise.resolve(data);
          },
          error => {
            commit('REGISTER_FAILURE');
            return Promise.reject(error);
          }
        );
      },

      logout({ commit }) {
        UserApi.logout();
        commit('LOGOUT');
      },

      getUser({ commit }) {
        return UserApi.auth().then(
          data => {
            commit('GET_USER_SUCCESS', data);
          },
          () => {
            commit('GET_USER_FAILURE');
          }
        );
      },
  },


  mutations: {
    LOGIN_SUCCESS(state) {
      localStorage.setItem('auth', "true");
      state.loggedIn = true;
    },
    LOGIN_FAILURE(state) {
      state.loggedIn = false;
    },

    REGISTER_SUCCESS(state) {
      state.loggedIn = false;
    },
    REGISTER_FAILURE(state) {
      state.loggedIn = false;
    },

    LOGOUT(state){
      state.loggedIn = false;
      state.user = null;
      localStorage.removeItem('auth');
      router.push({name: 'Login'});
    },

    GET_USER_SUCCESS(state, data) {
      state.user = data.data;
    },
    GET_USER_FAILURE(state) {
      state.loggedIn = false;
      state.user = null;
      localStorage.removeItem('auth');
      router.push({name: 'Login'});
    },
  }
}

