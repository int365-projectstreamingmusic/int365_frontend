import axios from "axios"

export default {
    namespaced: true,
    state: {
        token: null,
        roleName: null,
        user: null
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_USER(state, user) {
            state.user = user;
        },
        SET_ROLENAME(state, roleName) {
            state.roleName = roleName;
        }
    },
    getters: {
        authenticated(state) {
            return state.token && state.user;
        },
        user(state) {
            return state.user;
        },
        roleName(state) {
            return state.roleName;
        }
    },
    actions: {
        async signIn({
            dispatch
        }, credeitials) {
            let response;
            let login = JSON.stringify(credeitials);
            response = await axios.post(`http://20.213.128.1:8086/api/authen/login`, credeitials,{
                headers: {
                    'Content-Type': 'application/json',
                  }
            }).then(response => {
                dispatch('attempt', response.data.accessToken);
                return response;
            }).catch(error => {
                return error.response;
            })
            return response;
        },
        async attempt({
            commit,
            state
        }, token) {
            if (token) {
                commit('SET_TOKEN', token)
            }

            // try {
            //     let response = await axios.get(`${process.env.VUE_APP_ROOT_API}user/myprofile`)
            //     commit('SET_USER', response.data);
            //     commit('SET_ROLENAME', response.data.role.roleName);
            // } catch (error) {
            //     commit('SET_TOKEN', null);
            //     commit('SET_USER', null);
            //     commit('SET_ROLENAME', null);
            // }
        },
        async singOut({ commit }) {
            return await axios.get(`http://20.213.128.1:8086/api/authen/logout`).then(() => {
                commit('SET_TOKEN', null);
                commit('SET_USER', null);
                commit('SET_ROLENAME', null);
            })

        }
    }
}