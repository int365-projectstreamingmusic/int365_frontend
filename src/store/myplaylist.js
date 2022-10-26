import axios from "axios";
// let s = context.rootState.authentication.authenticated
export default {
  namespaced: true,
  state: {
    playground: '',
    notfoundPG: false,
    totalPG:'',
    totalPagePG: '',
  },
  mutations: {
    SET_TOTALPAGEPG(state,totalPagePG){
      state.totalPagePG = totalPagePG
    },
    SET_TOTALPG(state,totalPG){
      state.totalPG = totalPG
    },
    SET_NOTFOUNDPG(state,notfoundPG){
      state.notfoundPG = notfoundPG
    },
    SET_PLAYGROUND(state,playground){
      state.playground = playground
    },
  },
  getters:{
    playground(state){
      return state.playground
    },
    totalPagePG (state){
      return state.totalPagePG
    },
    totalPG (state) {
      return state.totalPG
    },
    notfoundPG (state) {
      return state.notfoundPG
    },
  },
  actions: {
    async getAllPlayground({commit,rootGetters},pagenum = 0){
      commit("SET_PLAYGROUND", '');
      await axios.get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/Playground?page=${pagenum}&pageSize=18`,
      {    
        headers: {
          'Authorization': 'Bearer ' + rootGetters['authentication/token']
        }
      })
      .then((res) =>{
        commit("SET_TOTALPAGEPG",res.data.totalPages)
        commit("SET_TOTALPG", res.data.totalElements);
        commit("SET_NOTFOUNDPG", false);
        commit("SET_PLAYGROUND", res.data.content);
      }).catch((err) => {
        console.log(err)
        if(err.response.status == 404){
          commit("SET_NOTFOUNDPG", true);
        }
        console.log(err)
      })
    },
    async addOrDelFavorites({dispatch},music){
      if(music.favorite == false){
        await dispatch('addFavorites',music.id)
      } else if(music.favorite == true) {
        await dispatch('delFavorites',music.id) 
      }
    },
    async addOrDelPlayground({dispatch},music){
      if(music.favorite == false){
        await dispatch('addPlayground',music.id)
      } else if(music.favorite == true) {
        await dispatch('delPlayground',music.id) 
      }
    },
    async delPlayground({commit,rootGetters,dispatch},id){
      commit("SET_PLAYGROUND",'');
      await axios.delete(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/Playground?trackId=${id}`,
      { headers: { 'Authorization': 'Bearer ' + rootGetters['authentication/token']}})
      .then((res) =>{
        console.log(res.data)
        dispatch("getAllPlayground");
      }).catch((err) => {
        console.log(err)
      }) 
    },
    async addPlayground({commit,rootGetters,dispatch},id){
      commit("SET_PLAYGROUND",'');
      await axios.post(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/Playground?trackId=${id}`,
      { headers: { 'Authorization': 'Bearer ' + rootGetters['authentication/token']}})
      .then((res) =>{
        console.log(res.data)
        dispatch("getAllPlayground");
      }).catch((err) => {
        console.log(err)
      })
    },
    // async deletePlayground({rootGetters,dispatch},id){
    //   console.log(id)
    //   await axios.delete( `${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/Playground?trackId=${id}`,
    //     { headers: { 'Authorization': 'Bearer ' + rootGetters['authentication/token']}}
    //   )
    //   .then((response) => {
    //     console.log(response)
    //     dispatch("getPlayground");
    //   })
    //   .catch((error) => {
    //     return error.response;
    //   });
    // },
    // async delPlayground({commit,rootGetters,dispatch},id){
    //   commit("SET_PLAYGROUND",'');
    //   await axios.delete(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/Playground?trackId=${id}`,
    //   { headers: { 'Authorization': 'Bearer ' + rootGetters['authentication/token']}})
    //   .then((res) =>{
    //     console.log(res.data)
    //     dispatch("getAllPlayground");
    //   }).catch((err) => {
    //     console.log(err)
    //   }) 
    // },
    // async getPlayground({commit,rootGetters,state}){
    //   // console.log(rootGetters['authentication/token'] )
    //   await axios
    //     .get(
    //       `${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/Playground`,
    //         {         
    //           headers: {
    //             'Authorization': 'Bearer ' + rootGetters['authentication/token']
    //           }
    //         }
    //     )
    //     .then((response) => {
    //       // console.log( response.data.content)
    //       commit("SET_NOTFOUND", false);
    //       commit("SET_PLAYGROUND", response.data.content);
    //       // console.log(state.playground)
          
    //     })
    //     .catch((error) => {
    //       if(error.response.status == 404){
    //         commit("SET_NOTFOUND", true);
    //       }
    //       return error.response;
    //     });
    // }
  }
}