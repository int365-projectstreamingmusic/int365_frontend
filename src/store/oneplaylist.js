import axios from "axios";
export default {
  namespaced: true,
  state: {
    owner:false,
    id: '',
    onePlaylist: '',
  },
  mutations: {
    SET_OWNER(state,owner){
      state.owner = owner
    },
    SET_ID(state,id){
      state.id = id
    },
    SET_ONEPLAYLIST(state,onePlaylist){
      state.onePlaylist = onePlaylist
    },
  },
  getters:{
    owner(state){
      return state.owner
    },
    id(state){
      if(id != ''){
        return state.id
      }
    },
    onePlaylist(state){
        return state.onePlaylist
    },
  },
  actions: {
    async getOnePlaylist({commit,rootGetters,state},id){
      commit("SET_ONEPLAYLIST", '');
      console.log(rootGetters['authentication/token'])
      let headers = {headers: {}}
      if(rootGetters['authentication/token'] != null){
        headers =  {    
        headers: {
          'Authorization': 'Bearer ' + rootGetters['authentication/token']
        }
      }
      }
      
      await axios.get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/public/playlist/${id}`,
       headers
    
      )
      .then((res) =>{
        commit("SET_ONEPLAYLIST", res.data);
      }).catch((err) => {
        console.log(err)
      })
    },
    async delOnePlaylist({state,rootGetters}){
     return await axios.delete(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/playlist?id=${state.onePlaylist.playlist.id}`,
      {
        headers: {
        'Authorization': 'Bearer ' + rootGetters['authentication/token']
        }
      }
     ).then((res) =>{
      
      if(res.status == 201){
        console.log(res)
       return true
      }
     }).catch((err) => {
       console.log(err)
       return false
     })
    }
  }
}