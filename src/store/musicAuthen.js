import axios from "axios";

export default {
    namespaced: true,
    state: {
        mySong: '',
        totalSongMySong: '',
        totalPageMySong: '',
        notfoundMySong: '',
        myHistory: '',
        totalSongMyHistory: '',
        totalPageMyHistory: '',
        notfoundMyHistory: '',
    },
    mutations: {
        SET_NOTFOUNDMYSONG(state, notfoundMySong) {
            state.notfoundMySong = notfoundMySong
        },
        SET_MYSONG(state, mySong) {
            state.mySong = mySong
        },
        SET_TOTALSONGMYSONG(state, totalSongMySong) {
            state.totalSongMySong = totalSongMySong
        },
        SET_TOTALPAGEMYSONG(state, totalPageMySong) {
            state.totalPageMySong = totalPageMySong
        },


        SET_NOTFOUNDMYHISTORY(state, notfoundMyHistory) {
            state.notfoundMyHistory = notfoundMyHistory
        },
        SET_MYHISTORY(state, myHistory) {
            state.myHistory = myHistory
        },
        SET_TOTALSONGMYHISTORY(state, totalSongMyHistory) {
            state.totalSongMyHistory = totalSongMyHistory
        },
        SET_TOTALPAGEMYHISTORY(state, totalPageMyHistory) {
            state.totalPageMyHistory = totalPageMyHistory
        },
    },
    getters: {
        notfoundMySong(state) {
            return state.notfoundMySong
        },
        mySong(state) {
            return state.mySong
        },
        totalSongMySong(state) {
            if (state.totalSongMySong != '') {
                return state.totalSongMySong
            }
        },
        totalPageMySong(state) {
            if (state.totalPageMySong != '') {
                return state.totalPageMySong
            }
        },

        notfoundMyHistory(state) {
            return state.notfoundMyHistory
        },
        myHistory(state) {
            return state.myHistory
        },
        totalSongMyHistory(state) {
            if (state.totalSongMyHistory != '') {
                return state.totalSongMyHistory
            }
        },
        totalPageMyHistory(state) {
            if (state.totalPageMyHistory != '') {
                return state.totalPageMyHistory
            }
        },


    },
    actions: {
        async getMySong({ commit }, pagenumMySong = 0) {
            commit("SET_MYSONG", '')
            await axios.get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/artist/track?page=${pagenumMySong}&pageSize=15&searchContent`)
                .then((res) => {
                    commit("SET_TOTALPAGEMYSONG", res.data.totalPages)
                    commit("SET_TOTALSONGMYSONG", res.data.totalElements);
                    commit("SET_MYSONG", res.data.content)
                }).catch((err) => {
                    if (err.response.status == 404) {
                        commit("SET_NOTFOUNDMYSONG", 404);
                    } if (err.response.status == 500) {
                        commit("SET_NOTFOUNDMYSONG", 500);
                    }
                })
        },
        async getMyHistory({ commit }, pagenumMyHis = 0) {
            commit("SET_MYHISTORY", '')
            await axios.get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/history/MyHistory?page=${pagenumMyHis}`)
                .then((res) => {
                    commit("SET_TOTALPAGEMYHISTORY", res.data.totalPages)
                    commit("SET_TOTALSONGMYHISTORY", res.data.totalElements);
                    commit("SET_MYHISTORY", res.data.content)
                }).catch((err) => {
                    if (err.response.status == 404) {
                        commit("SET_NOTFOUNDMYHISTORY", 404);
                    } if (err.response.status == 500) {
                        commit("SET_NOTFOUNDMYHISTORY", 500);
                    }
                })
        }
    }
}