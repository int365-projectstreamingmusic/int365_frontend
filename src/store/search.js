export default {
  namespaced: true,
  state: {
    found: false,
  },
  mutations: {
    SET_FOUND(state,found){
      state.found = found
    }
  },
  getters:{
    found(state){
      return state.found
    }
  },
  actions: {
    
  }
}