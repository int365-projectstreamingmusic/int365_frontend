import axios from "axios";

export default {
  namespaced: true,
  state: {
    topFrist:'',
    topFive: '',
    topFiveInSevenDays:'',
    recentplayed:'',
    recentReleases: '',
    mediaPlayer: false,
    sideBarShow: true,
    mobile: false,
    logo:false,
    topOne:false,
    smView:false,
    notfoundRP: false,
    path: ''
  },
  mutations: {
    SET_PATH(state,path){
      state.path = path
    },
    SET_NOTFOUNDRP(state,notfoundRP){
      state.notfoundRP = notfoundRP
    },
    SET_SMVIEW(state,smView){
      state.smView = smView
    },
    SET_TOPONE(state,topOne){
      state.topOne = topOne
    },
    SET_LOGO(state,logo){
      state.logo = logo
    },
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
    },
    SET_TOPFIVESEVENDAYS(state,topFiveInSevenDays){
      state.topFiveInSevenDays = topFiveInSevenDays
    },
    SET_RECENTPLAYED(state,recentplayed){
      state.recentplayed = recentplayed
    },
    SET_RECENTRELEASES(state,recentReleases){
      state.recentReleases = recentReleases
    }
  },
  getters:{
    path(state){
      return state.path
    },
    notfoundRP(state){
      return state.notfoundRP
    },
    smView(state){
      return state.smView
    },
    topOne(state){
      return state.topOne
    },
    logo(state){
      return state.logo
    },
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
    },
    topFiveInSevenDays(state){
      return state.topFiveInSevenDays
    },
    recentplayed(state){
      return state.recentplayed
    },
    recentReleases(state){
      return state.recentReleases
    }
  },
  actions: {
    async getTopFive({ commit },num){
      await axios.get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/public/track/topall?numberOfTracks=${num}`)
      .then((res) =>{
        commit("SET_TOPFRIST", res.data[0])
        res.data.splice(0,1)
        commit("SET_TOPFIVE", res.data);
        
      }).catch((err) => {
        console.log(err)
      })
    },
    async getTopFiveInSevenDays({ commit },params){
      commit("SET_TOPFIVESEVENDAYS", '');
      await axios.get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/public/track/top?days=${params.day}&numberOfTracks=${params.num}`)
      .then((res) =>{
        commit("SET_TOPFIVESEVENDAYS", res.data);

      }).catch((err) => {
        console.log(err)
      })
    },
    async getRecentplayed({ commit,rootGetters, state },params){
      commit("SET_RECENTPLAYED", '');
      await axios.get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/history/LastVisited?numberOfRecord=${params}`,
      {         
        headers: {
          'Authorization': 'Bearer ' + rootGetters['authentication/token']
        }
      })
      .then((res) =>{
        commit("SET_RECENTPLAYED", res.data);
      }).catch((err) => {
        console.log(err)
        commit("SET_RECENTPLAYED", 'NOTFOUNDRP');
        commit("SET_NOTFOUNDRP", true)
      })
    },
    checkFavAndPlay({state,dispatch},params){

      for (let x of state.topFiveInSevenDays) { 
        if(x.id == params.idFav){ 
          dispatch("getTopFiveInSevenDays",{num:6,day:7});
        }
      for (let x of state.recentplayed) {
        if(x.track.id == params.idFav){ 
          dispatch("getRecentplayed",6);
        }
      }
      for (let x of state.recentReleases) { x.id == params.idFav ? dispatch("getRecentReleases"):''} 
      }
    }
    ,
    async getRecentReleases({ commit }){
      commit("SET_RECENTRELEASES", '');
      await axios.get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/public/track/latest`)
      .then((res) =>{
        commit("SET_RECENTRELEASES", res.data);
      }).catch((err) => {
        console.log(err)
      })
    },
    setMediaPlayer({ commit },boolean){
      commit("SET_MEDIAPLAYER",boolean)
    },
    hideSideBar({ commit,state }){
      commit("SET_SIDEBARSHOW",!state.sideBarShow)
    },
    setTopOne({commit},boolean){
      commit("SET_TOPONE", boolean)
    },
    handleView({commit}) {
        commit("SET_TOPONE", false)
      if (window.innerWidth <= 640){
        commit("SET_SMVIEW",false)
      } else if (window.innerWidth > 640){
        commit("SET_SMVIEW",true)
      }  
      if (window.innerWidth <= 1320) {
        commit("SET_MOBILE",true)
      } else if (window.innerWidth > 1320) {
        commit("SET_MOBILE",false)
      }
      if(window.innerWidth <= 450){
        commit("SET_LOGO",true)
      } else if (window.innerWidth > 450) {
        commit("SET_LOGO",false)
      }
    }
  }
}