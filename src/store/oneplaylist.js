import axios from "axios";
export default {
  namespaced: true,
  state: {
    id: 4,
    onePlaylist: '',
  },
  mutations: {
    SET_ID(state,id){
      state.id = id
    },
    SET_ONEPLAYLIST(state,onePlaylist){
      state.onePlaylist = onePlaylist
    },
  },
  getters:{
    id(state){
      if(id != ''){
        return state.id
      }
    },
    onePlaylist(state){
      if(state.onePlaylist != ''){
        return state.onePlaylist
      }
    },
  },
  actions: {
    async getOnePlaylist({commit,rootGetters,state}){
      console.log('playlist',state.id)
      commit("SET_ONEPLAYLIST", '');
      await axios.get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/playlist/${state.id}`,
      {    
        headers: {
          'Authorization': 'Bearer ' + rootGetters['authentication/token']
        }
      })
      .then((res) =>{
        console.log(res.data)
        commit("SET_ONEPLAYLIST", res.data);
      }).catch((err) => {
        console.log(err)
      })
    },

  }
}