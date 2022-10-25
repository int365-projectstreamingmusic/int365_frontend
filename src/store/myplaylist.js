import axios from "axios";
// let s = context.rootState.authentication.authenticated
export default {
  namespaced: true,
  state: {
    playground: null,
    notfound: false,
  },
  mutations: {
    SET_PLAYGROUND(state,playground){
      state.playground = playground
    },
    SET_NOTFOUND(state,notfound){
      state.notfound = notfound
    }
  },
  getters:{
    notfound (state) {
      return state.notfound
    }, 
    playground(state){
      return state.playground
    }
  },
  actions: {
    async deletePlayground({rootGetters,dispatch},id){
      console.log(id)
      await axios.delete( `${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/Playground?trackId=${id}`,
        { headers: { 'Authorization': 'Bearer ' + rootGetters['authentication/token']}}
      )
      .then((response) => {
        console.log(response)
        dispatch("getPlayground");
      })
      .catch((error) => {
        return error.response;
      });
    },
    async getPlayground({commit,rootGetters,state}){
      // console.log(rootGetters['authentication/token'] )
      await axios
        .get(
          `${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/Playground`,
            {         
              headers: {
                'Authorization': 'Bearer ' + rootGetters['authentication/token']
              }
            }
        )
        .then((response) => {
          // console.log( response.data.content)
          commit("SET_NOTFOUND", false);
          commit("SET_PLAYGROUND", response.data.content);
          // console.log(state.playground)
          
        })
        .catch((error) => {
          if(error.response.status == 404){
            commit("SET_NOTFOUND", true);
          }
          return error.response;
        });
    }
  }
}