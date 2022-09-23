import axios from "axios";

export default {
  namespaced: true,
  state: {
    topFrist:'',
    topFive: '',
    mediaPlayer: false,
    sideBarShow: true,
    mobile: false

  },
  mutations: {
    SET_MOBILE(state,mobile){
      state.mobile = mobile
    },
    SET_TOPFRIST(state, topFrist){
      state.topFrist = topFrist
    },
    SET_TOPFIVE(state, topFive) {
      state.topFive = topFive;
    },
    SET_MEDIAPLAYER(state,mediaPlayer){
      state.mediaPlayer = mediaPlayer 
    },
    SET_SIDEBARSHOW(state,sideBarShow){
      state.sideBarShow = sideBarShow
    }
  },
  getters:{
    mobile(state){
      return state.mobile
    },
    sideBarShow(state){
      return state.sideBarShow
    },
    mediaPlayer(state){
      return state.mediaPlayer
    },
    topFrist(state){
      return state.topFrist
    },
    topFive(state){
      return state.topFive
    }
  },
  actions: {
    async getTopFive({ commit }){
      await axios.get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/public/general/track`)
      .then((res) =>{

        commit("SET_TOPFRIST", res.data.content[0])
        res.data.content.splice(0,1)
        commit("SET_TOPFIVE", res.data.content);
        
      }).catch((err) => {
        console.log(err)
      })
    },
    setMediaPlayer({ commit },boolean){
      console.log(boolean)
      commit("SET_MEDIAPLAYER",boolean)
    },
    hideSideBar({ commit,state }){
      console.log(state.sideBarShow)
      commit("SET_SIDEBARSHOW",!state.sideBarShow)
    },
    handleView({commit}) {
      
      if (window.innerWidth <= 1320) {
        commit("SET_MOBILE",true)
      } else if (window.innerWidth > 1320) {
        commit("SET_MOBILE",false)
      }
    },
  }
}