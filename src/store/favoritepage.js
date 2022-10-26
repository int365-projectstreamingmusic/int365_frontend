import axios from "axios";

export default {
  namespaced: true,
  state: {
    favorites:'',
    notfound: false,
  },
  mutations: {
    SET_FAVORITES(state,favorites){
      state.favorites = favorites
    },
    SET_NOTFOUND(state,notfound){
      state.notfound = notfound
    },
  },
  getters:{
    favorites (state) {
      return state.favorites
    }, 
    notfound (state) {
      return state.notfound
    }, 
  },
  actions: {
    async getAllFavorites({commit,rootGetters,context,dispatch}){
      commit("SET_FAVORITES", '');
      await axios.get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/Favorite`,
      {         
        headers: {
          'Authorization': 'Bearer ' + rootGetters['authentication/token']
        }
      })
      .then((res) =>{
        console.log(res)
        // dispatch('homepage/checkFavAndPlay','', { root: true });
        commit("SET_NOTFOUND", false);
        commit("SET_FAVORITES", res.data.content);
      }).catch((err) => {
        console.log(err)
        if(err.response.status == 404){
          commit("SET_NOTFOUND", true);
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
    async addFavorites({commit,rootGetters,dispatch},id){
      commit("SET_FAVORITES", '');
      try{
        await axios.post(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/Favorite?trackId=${id}`,
          { headers: { 'Authorization': 'Bearer ' + rootGetters['authentication/token']}
        })
        // เอาออก
        dispatch("getAllFavorites");
      } catch(err){
          console.log(err)
      }
      
    },
    async delFavorites({commit,rootGetters,dispatch,root},id){
      commit("SET_FAVORITES", '');
      await axios.delete(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/Favorite?trackId=${id}`,
      { headers: { 'Authorization': 'Bearer ' + rootGetters['authentication/token']}})
      .then((res) =>{
        console.log(res)
        // dispatch('homepage/checkFavAndPlay',{idFav:id,booleanFav:false}, { root: true })
         // เอาออก
        dispatch("getAllFavorites");
      }).catch((err) => {
        console.log(err)
      }) 
    }
  }
}