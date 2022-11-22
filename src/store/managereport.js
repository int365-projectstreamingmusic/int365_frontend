import axios from "axios";
export default {
  namespaced: true,
  state: {
    reportComment: false,
    reportLicense: false,
    // comment
    reportCommentList: '',
    totalComment: '',
    totalPageComment: '',
    notfoundComment: false,
    // track
    reportTrackList: '',
    totalTrack: '',
    totalPageTrack: '',
    notfoundTrack: false,
  },
  mutations: {
    SET_REPORTCOMMENT(state, reportComment) {
      state.reportComment = reportComment
    },
    SET_REPORTLICENSE(state, reportLicense) {
      state.reportLicense = reportLicense
    },
    // comment 
    SET_TOTALCOMMENT(state, totalComment) {
      state.totalComment = totalComment
    },
    SET_TOTALPAGECOMMENT(state, totalPageComment) {
      state.totalPageComment = totalPageComment
    },
    SET_REPORTCOMMENTLIST(state, reportCommentList) {
      state.reportCommentList = reportCommentList
    },
    SET_NOTFOUNDCOMMENT(state, notfoundComment) {
      state.notfoundComment = notfoundComment
    },
    // track
    SET_TOTALTRACK(state, totalTrack) {
      state.totalTrack = totalTrack
    },
    SET_TOTALPAGETRACK(state, totalPageTrack) {
      state.totalPageTrack = totalPageTrack
    },
    SET_REPORTTRACKLIST(state, reportTrackList) {
      state.reportTrackList = reportTrackList
    },
    SET_NOTFOUNDTRACK(state, notfoundTrack) {
      state.notfoundTrack = notfoundTrack
    },
  },
  getters: {
    reportComment(state) {
      return state.reportComment
    },
    reportLicense(state) {
      return state.reportLicense
    },
    // comment
    totalComment(state) {
      return state.totalComment
    },
    totalPageComment(state) {
      return state.totalPageComment
    },
    reportCommentList(state) {
      return state.reportCommentList
    },
    notfoundComment(state) {
      return state.notfoundComment
    },
    // track
    totalTrack(state) {
      return state.totalTrack
    },
    totalPageTrack(state) {
      return state.totalPageTrack
    },
    reportTrackList(state) {
      return state.reportTrackList
    },
    notfoundTrack(state) {
      return state.notfoundTrack
    },
  },
  actions: {
    async getReportComment({ commit }, pagenumComment = 0) {
      commit("SET_REPORTCOMMENT", true);
      commit("SET_REPORTLICENSE", false);
      await axios
        .get(
          `${process.env.VUE_APP_MY_ENV_VARIABLE}api/manager/report?page=${pagenumComment}&pageSize=5&searchKey&reportType=200`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          let datacomment = [];
          res.data.content.forEach(element => {
            if (element.commentPlaylist != null) {
              datacomment.push(element)
            } if (element.commentTrack != null) {
              datacomment.push(element)
            }
          });
          commit("SET_TOTALCOMMENT", res.data.totalPages)
          commit("SET_TOTALPAGECOMMENT", res.data.totalElements);
          commit("SET_NOTFOUNDCOMMENT", false);
          commit("SET_REPORTCOMMENTLIST", datacomment)
        })
        .catch((err) => {
          if (err.response.status == 404||err.response.status==500) {
            commit("SET_NOTFOUNDCOMMENT", true);
          }
        })

    },
    async getReportLicense({ commit }, pagenumTrack = 0) {
      commit("SET_REPORTCOMMENT", false);
      commit("SET_REPORTLICENSE", true);
      await axios
        .get(
          `${process.env.VUE_APP_MY_ENV_VARIABLE}api/manager/report?page=${pagenumTrack}&pageSize=5&searchKey&reportType=1001`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          commit("SET_TOTALTRACK", res.data.totalPages)
          commit("SET_TOTALPAGETRACK", res.data.totalElements);
          commit("SET_NOTFOUNDTRACK", false);
          commit("SET_REPORTTRACKLIST", res.data.content)
        })
        .catch((err) => {
          if (err.response.status == 404) {
            commit("SET_NOTFOUNDCOMMENT", true);
          }
        }
        );
    }
    
  }
}