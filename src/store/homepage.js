import axios from "axios";

export default {
  namespaced: true,
  state: {
    topFrist:'',
    topFive: '',
  },
  mutations: {
    SET_TOPFRIST(state, topFrist){
      state.topFrist = topFrist
    },
    SET_TOPFIVE(state, topFive) {
      state.topFive = topFive;
    },
  },
  getters:{
    topFrist(state){
      return state.topFrist
    },
    topFive(state){
      return state.topFive
    }
  },
  actions: {
    async getTopFive({ commit }){
      await axios.get(`http://20.213.128.1:8086/api/public/general/track`)
      .then((res) =>{

        commit("SET_TOPFRIST",res.data.content[0])
        res.data.content.splice(0,1)
        commit("SET_TOPFIVE", res.data.content);
        
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}