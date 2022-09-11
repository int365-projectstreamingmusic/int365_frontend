import axios from "axios";

export default {
  namespaced: true,
  state: {
    token: null,
    roles: null,
    UserName: null,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USERNAME(state, UserName) {
      state.UserName = UserName;
    },
    SET_ROLES(state, roles) {
      state.roles = roles;
    },
  },
  getters: {
    authenticated(state) {
      return state.token && state.UserName;
    },
    UserName(state) {
      return state.UserName;
    },
    roles(state) {
      return state.roles;
    },
  },
  actions: {
    async signIn({ dispatch }, credeitials) {
      let response;
      response = await axios
        .post(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/authen/login`, credeitials, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          dispatch("attempt", response);
          return response;
        })
        .catch((error) => {
          return error.response;
        });
      return response;
    },
    attempt({ commit }, response) {
      if (response) {
        localStorage.removeItem('accesstoken')
          commit("SET_USERNAME", response.data.UserName);
          commit("SET_ROLES", response.data.roles);
          commit("SET_TOKEN", response.data.token);
        
      }
    },
    async singOut({ commit }) {
      console.log(process.env.VUE_APP_ROOT_API);
      return await axios
        .get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/authen/logout`)
        .then(() => {
          commit("SET_TOKEN", null);
          commit("SET_USERNAME", null);
          commit("SET_ROLES", null);
        });
        
    },
  },
};
