import axios from "axios";

export default {
  namespaced: true,
  state: {
    token: null,
    roles: null,
    UserName: null,
    data: null,
    admin:false,
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
    SET_DATA(state, data) {
      state.data = data;
    },
    SET_ADMIN(state, admin) {
      state.admin = admin;
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
    data(state) {
      return state.data;
    },
    admin(state) {
      return state.admin;
    },
    token(state){
      return state.token
    },
    userId(state){
      if(state.data != null){
        return state.data.accountId
      }else{
        return null
      }
      
    }
  },
  actions: {
    async signIn({ dispatch }, credeitials) {
      let response;
      response = await axios
        .post(
          `${process.env.VUE_APP_MY_ENV_VARIABLE}api/authen/login`,
          credeitials,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          dispatch("attempt", response.data.token);
          return response;
        })
        .catch((error) => {
          return error.response;
        });
      return response;
    },
    async attempt({ commit, state }, token) {
      if (token) {
        commit("SET_TOKEN", token);
      }

      if (!state.token) {
        return;
      }

      try {
        let response = await axios.get(
          `${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/myProfile`,
          {         
            headers: {
              'Authorization': 'Bearer ' + state.token
            }
          }
        );
        response.data.userRoles.forEach(element => {
          if (element.roles.roles === "admin") {
            commit("SET_ADMIN",true)
          }
        });
        commit("SET_USERNAME", response.data.username);
        commit("SET_ROLES", response.data.userRoles);
        commit("SET_DATA",response.data)
      } catch (error) {
        commit("SET_TOKEN", null);
        commit("SET_USERNAME", null);
        commit("SET_ROLES", null);
        commit("SET_DATA", null);
        commit("SET_ADMIN", null);
      }
    },
    async singOut({ commit }) {
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
