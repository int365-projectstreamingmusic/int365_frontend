import axios from "axios";

export default {
  namespaced: true,
  state: {
    allSong:'',
    totalSong:'',
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
      return state.totalSong
    }
  },
  actions: {
    async getAllSong({commit}){
      await axios.get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/public/track?pageSize=18`)
      .then((res) =>{
        // console.log(res.data)
        console.log(res.data.content)
        console.log(res.data.content.length)
        commit("SET_NOTFOUND", false);
        commit("SET_ALLSONG", res.data.content)
        commit("SET_TOTALSONG", res.data);
        
      }).catch((err) => {
        if(err.response.status == 404){
          commit("SET_NOTFOUND", true);
        }
        console.log(err)
      })
    }
  }
}