import axios from "axios";

export default {
  namespaced: true,
  state: {
    allPlaylist:'',
    totalPlaylist:'',
    totalPageAPL: '',
    notfoundAPL: false,
    playlist: ''
  },
  mutations: {
    SET_PLAYLIST(state,playlist){
      state.playlist = playlist
    },
    SET_NOTFOUNDAPL(state,notfoundAPL){
      state.notfoundAPL = notfoundAPL
    },
    SET_ALLPLAYLIST(state,allPlaylist){
      state.allPlaylist = allPlaylist
    },
    SET_TOTALPLAYLIST(state,totalPlaylist){
      state.totalPlaylist = totalPlaylist
    },
    SET_TOTALPAGEAPL(state,totalPageAPL){
      state.totalPageAPL =totalPageAPL
    }
  },
  getters:{
    playlist(state){
      if(state.playlist != '' ){
       return state.playlist        
      }
    },
    notfoundAPL (state) {
      return state.notfoundAPL
    }, 
    allPlaylist(state){
      return state.allPlaylist
    },
    totalPlaylist(state){
      if(state.totalPlaylist != ''){
        return state.totalPlaylist
      }
    },
    totalPageAPL(state){
      if(state.totalPageAPL != ''){
        return state.totalPageAPL
      }
    }
  },
  actions: {
    async getAllPlaylist({commit},pagenum = 0){
      commit("SET_ALLPLAYLIST",'')
      console.log(pagenum)
      await axios.get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/public/playlist?page=${pagenum}&pageSize=18`)
      .then((res) =>{
        console.log(res.data)
        console.log(res.data.totalPages)
        console.log(res.data.totalElements)
   
        commit("SET_NOTFOUNDAPL", false);
        commit("SET_ALLPLAYLIST", res.data.content)
        commit("SET_TOTALPAGEAPL",res.data.totalPages)
        commit("SET_TOTALPLAYLIST", res.data.totalElements);
        
      }).catch((err) => {
        if(err.response.status == 404){
          commit("SET_NOTFOUNDAPL", true);
        }
        console.log(err)
      })
    },
    async getPlaylist({commit},id){
      // ต้องมี check ว่า login ไหม ถึง playlist ส่วนตัว
      commit("SET_PLAYLIST",'')
      console.log(id)
      await axios.get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/public/playlist/${id}`)
      .then((res) =>{
        console.log(res.data)
        if(res.data.tracksInfo.content){
          console.log('เพลงในplaylist')
          commit("SET_PLAYLIST", res.data.tracksInfo.content)
        }
        
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}