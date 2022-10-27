import axios from "axios";

export default {
  namespaced: true,
  state: {
    allSong:'',
    totalSong:'',
    totalPage: '',
    notfound: false,
  },
  mutations: {
    SET_NOTFOUND(state,notfound){
      state.notfound = notfound
    },
    SET_ALLSONG(state,allSong){
      state.allSong = allSong
    },
    SET_TOTALSONG(state,totalSong){
      state.totalSong = totalSong
    },
    SET_TOTALPAGE(state,totalPage){
      state.totalPage =totalPage
    }
  },
  getters:{
    notfound (state) {
      return state.notfound
    }, 
    allSong(state){
      return state.allSong
    },
    totalSong(state){
      if(state.totalSong != ''){
        return state.totalSong
      }
    },
    totalPage(state){
      if(state.totalPage != ''){
        return state.totalPage
      }
    }
  },
  actions: {
    async getAllSong({commit},pagenum = 0){
      commit("SET_ALLSONG",'')
      await axios.get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/public/track?page=${pagenum}&pageSize=18`)
      .then((res) =>{
        // console.log(res.data.content)
        // console.log(res.data.content.length)
        commit("SET_TOTALPAGE",res.data.totalPages)
        commit("SET_TOTALSONG", res.data.totalElements);
        commit("SET_NOTFOUND", false);
        commit("SET_ALLSONG", res.data.content)
        
        
      }).catch((err) => {
        if(err.response.status == 404){
          commit("SET_NOTFOUND", true);
        }
        console.log(err)
      })
    },
    async addHisAndView({rootGetters},musicfilename){
      await axios.put(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/streaming/entrance/${musicfilename}`,
        {         
          headers: {
            'Authorization': 'Bearer ' + rootGetters['authentication/token']
          }
        }
      )
      .then((res) =>{
      }).catch((err) => {
        if(err.response.status == 404){
          console.log('404')
        }
        console.log(err)
      })
    }

  }
}