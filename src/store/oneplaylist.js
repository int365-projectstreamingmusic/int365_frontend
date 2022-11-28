import axios from "axios";
export default {
  namespaced: true,
  state: {
    owner: false,
    id: '',
    onePlaylist: '',
    comment: '',
    totalComment: '',
    notfoundCM: false
  },
  mutations: {
    SET_NOTFOUNDCM(state, notfoundCM) {
      state.notfoundCM = notfoundCM
    },
    SET_TOTALCOMMENT(state, totalComment) {
      state.totalComment = totalComment
    },
    SET_COMMENT(state, comment) {
      state.comment = comment
    },
    SET_OWNER(state, owner) {
      state.owner = owner
    },
    SET_ID(state, id) {
      state.id = id
    },
    SET_ONEPLAYLIST(state, onePlaylist) {
      state.onePlaylist = onePlaylist
    },
  },
  getters: {
    owner(state) {
      return state.owner
    },
    id(state) {
      if (state.id != '') {
        return state.id
      }
    },
    onePlaylist(state) {
      return state.onePlaylist
    },
    notfoundCM(state) {
      return state.notfoundCM
    },
    totalComment(state) {
      return state.totalComment
    },
    comment(state) {
      return state.comment
    },
  },
  actions: {
    async addReport({ rootGetters, dispatch, state }, data) {
      let body = JSON.stringify({
        reportMsg: data.reportMsg,
        reportGroupId: data.reportGroupId,
        reportTitle: data.reportTitle,
        reportType: data.reportType,
        targetRef: data.targetRef
      })
      return await axios.post(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/report`,
        body,
        {
          headers: {
            'Authorization': 'Bearer ' + rootGetters['authentication/token'],
            "Content-Type": "application/json"
          }
        }
      ).then((res) => {
        if (res.status == 201) {
          return true
        }
      }).catch((err) => {
        console.log(err)
        return false
      })
    },
    async editComment({ rootGetters, dispatch, state }, data) {
      let body = JSON.stringify({ id: data.id, comment: data.comment })
      return await axios.put(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/comment/playlist`,
        body,
        {
          headers: {
            'Authorization': 'Bearer ' + rootGetters['authentication/token'],
            "Content-Type": "application/json"
          }
        }
      ).then((res) => {
        if (res.status == 201) {
          return true
        }
      }).catch((err) => {
        console.log(err)
        return false
      })
    },
    async addComment({ rootGetters, state, dispatch }, data) {
      let body = JSON.stringify({ playlistId: data.id, comment: data.comment })
      return await axios.post(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/comment/playlist`,
        body,
        {
          headers: {
            'Authorization': 'Bearer ' + rootGetters['authentication/token'],
            "Content-Type": "application/json"
          }
        }
      ).then((res) => {
        if (res.status == 201) {
          dispatch("getComment", { id: data.id, pagenum: 0, pagesize: 10 });
          return true
        }
      }).catch((err) => {
        console.log(err)
        return false
      })
    },
    async delComment({ rootGetters, state, dispatch }, commentid) {
      return await axios.delete(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/comment/playlist?commentId=${commentid}`,
        { headers: { 'Authorization': 'Bearer ' + rootGetters['authentication/token'] } }
      ).then((res) => {
        if (res.status == 201) {
          dispatch("getComment", { id: state.id, pagenum: 0, pagesize: 10 });
          return true
        }
      }).catch((err) => {
        console.log(err)
        return false
      })
    },
    async getComment({ commit }, params) {
      let pagenum = 0
      let pagesize = 17
      if (params != undefined) {
        pagenum = params.pagenum
      }
      if (params != undefined) {
        pagesize = params.pagesize
      }
      commit("SET_COMMENT", '');
      await axios.get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/public/comment/playlist?playlistId=${params.id}&page=${pagenum}&pageSize=${pagesize}`,)
        .then((res) => {
          commit("SET_TOTALCOMMENT", res.data);
          commit("SET_NOTFOUNDCM", false);
          commit("SET_COMMENT", res.data.content);
          if (res.data.content.length == 0) {
            commit("SET_NOTFOUNDCM", true);
          }
        }).catch((err) => {
          commit("SET_NOTFOUNDCM", true);
          console.log(err)
        })
    },
    async getOnePlaylist({ commit, rootGetters, state }, id) {
      commit("SET_ONEPLAYLIST", '');
      let headers = { headers: {} }
      if (rootGetters['authentication/token'] != null) {
        headers = {
          headers: {
            'Authorization': 'Bearer ' + rootGetters['authentication/token']
          }
        }
      }
      await axios.get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/public/playlist/${id}`,
        headers
      )
        .then((res) => {
          commit("SET_ONEPLAYLIST", res.data);
        }).catch((err) => {
          console.log(err)
        })
    },
    async delOnePlaylist({ state, rootGetters }) {
      return await axios.delete(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/playlist?id=${state.onePlaylist.playlist.id}`,
        {
          headers: {
            'Authorization': 'Bearer ' + rootGetters['authentication/token']
          }
        }
      ).then((res) => {
        if (res.status == 201) {
          return true
        }
      }).catch((err) => {
        console.log(err)
        return false
      })
    }
  }
}