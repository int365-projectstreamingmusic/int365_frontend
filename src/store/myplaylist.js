import axios from "axios";
// let s = context.rootState.authentication.authenticated
export default {
  namespaced: true,
  state: {
    playground: '',
    notfoundPG: false,
    totalPG:'',
    totalPagePG: '',
    myplaylist: '',
    notfoundPL: false,
    totalPL: '',
    totalPagePL: ''
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
    SET_MYPLAYLIST(state,myplaylist){
      state.myplaylist = myplaylist
    },
    SET_NOTFOUNDPL(state,notfoundPL){
      state.notfoundPL = notfoundPL
    },
    SET_TOTALPL(state,totalPL){
      state.totalPL = totalPL
    },
    SET_TOTALPAGEPL(state,totalPagePL){
      state.totalPagePL = totalPagePL
    },
  },
  getters:{
    totalPagePL(state){
      if(state.totalPagePL != ''){
        return state.totalPagePL
      }
    },
    totalPL(state){
      if(state.totalPL != ''){
        return state.totalPL
      }
    },
    notfoundPL(state){
      return state.notfoundPL
    },
    myplaylist(state){
      return state.myplaylist
    },
    playground(state){
      return state.playground
    },
    totalPagePG (state){
      if(state.totalPagePG != ''){
        return state.totalPagePG
      }
    },
    totalPG (state) {
      if(state.totalPG != ''){
        return state.totalPG
      }
    },
    notfoundPG (state) {
      return state.notfoundPG
    },
  },
  actions: {
    async getAllMyPlaylist({commit,rootGetters},params){
      let pagenum = 0
      let pagesize = 17
      if(params != undefined){
        pagenum = params.pagenum
      }
      if(params != undefined){
        pagesize = params.pagesize
      }
      commit("SET_MYPLAYLIST", '');
      await axios.get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/playlist?page=${pagenum}&pageSize=${pagesize}`,
      {    
        headers: {
          'Authorization': 'Bearer ' + rootGetters['authentication/token']
        }
      })
      .then((res) =>{
        commit("SET_TOTALPAGEPL",res.data.totalPages)
        commit("SET_TOTALPL", res.data.totalElements);
        commit("SET_NOTFOUNDPL", false);
        commit("SET_MYPLAYLIST", res.data.content);
      }).catch((err) => {
        console.log(err)
        if(err.response.status == 404){
          commit("SET_NOTFOUNDPL", true);
        }
        console.log(err)
      })
    },
    async getAllPlayground({commit,rootGetters,state},params){
      let pagenum = 0
      let pagesize = 18
      if(params != undefined){
        pagenum = params.pagenum
      }
      if(params != undefined){
        pagesize = params.pagesize
      }
      commit("SET_PLAYGROUND", '');
      await axios.get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/Playground?page=${pagenum}&pageSize=${pagesize}`,
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
    async addOrDelPlayground({dispatch},music){
      if(music.playground == false){
        await dispatch('addPlayground',music.id)
      } else if(music.playground == true) {
        await dispatch('delPlayground',music.id) 
      }
    },
    async delPlayground({commit,rootGetters,dispatch},id){
      commit("SET_PLAYGROUND",'');
      await axios.delete(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/Playground?trackId=${id}`,
      { headers: { 'Authorization': 'Bearer ' + rootGetters['authentication/token']}})
      .then((res) =>{
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
        dispatch("getAllPlayground");
      }).catch((err) => {
        console.log(err)
      })
    },
    async addMusicToPalylist({rootGetters},data){
      let body = JSON.stringify({id:data.id,trackIdList:data.trackIdList})
      return await axios.put(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/playlist/add-track`,
        body,
        { headers: { 'Authorization': 'Bearer ' + rootGetters['authentication/token'],
                      "Content-Type": "application/json"
          }
        }
      ).then((res) =>{
        if(res.status == 200){
          return true 
        }
      }).catch((err) => {
        console.log(err)
        return false
      })
    }
  }
}