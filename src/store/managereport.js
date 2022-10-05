export default {
  namespaced: true,
  state: {
    reportComment: false,
    reportLicense: false,
  },
  mutations: {
    SET_REPORTCOMMENT(state,reportComment){
      state.reportComment = reportComment
    },
    SET_REPORTLICENSE(state,reportLicense){
      state.reportLicense = reportLicense
    }
  },
  getters:{
    reportComment(state){
      return state.reportComment
    },
    reportLicense(state){
      return state.reportLicense
    }
  },
  actions: {
    getReportCommend({ commit }){
      commit("SET_REPORTCOMMENT",true);
      commit("SET_REPORTLICENSE",false)
    },
    getReportLicense({ commit }){
      commit("SET_REPORTCOMMENT",false);
      commit("SET_REPORTLICENSE",true)
    }
  }
}