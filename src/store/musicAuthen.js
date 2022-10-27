import axios from "axios";

export default {
    namespaced: true,
    state: {
        mySong: '',
        totalSongMySong: '',
        totalPageMySong: '',
        notfoundMySong: false,
        myHitory: '',
        totalSongMyHitory: '',
        totalPageMyHitory: '',
        notfoundMyHitory: false,
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


        SET_NOTFOUNDMYHISTORY(state, notfoundMyHitory) {
            state.notfoundMyHitory = notfoundMyHitory
        },
        SET_MYHISTORY(state, MyHitory) {
            state.MyHitory = MyHitory
        },
        SET_TOTALSONGMYHISTORY(state, totalSongMyHitory) {
            state.totalSongMyHitory = totalSongMyHitory
        },
        SET_TOTALPAGEMYHISTORY(state, totalPageMyHitory) {
            state.totalPageMyHitory = totalPageMyHitory
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

        notfoundMyHitory(state) {
            return state.notfoundMyHitory
        },
        myHitory(state) {
            return state.MyHitory
        },
        totalSongMyHitory(state) {
            if (state.totalSongMyHitory != '') {
                return state.totalSongMyHitory
            }
        },
        totalPageMyHitory(state) {
            if (state.totalPageMyHitory != '') {
                return state.totalPageMyHitory
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
                    commit("SET_NOTFOUNDMYSONG", false);
                    commit("SET_MYSONG", res.data.content)
                }).catch((err) => {
                    if (err.response.status == 404) {
                        commit("SET_NOTFOUNDMYSONG", true);
                    }
                    console.log(err)
                })
        },
        async getMyHistory({ commit }, pagenumMyHis = 0) {
            commit("SET_MYHISTORY", '')
            await axios.get(`${process.env.VUE_APP_MY_ENV_VARIABLE}api/user/history/MyHistory?page=${pagenumMyHis}`)
                .then((res) => {
                    console.log(res.data);
                    commit("SET_TOTALPAGEMYHISTORY", res.data.totalPages)
                    commit("SET_TOTALSONGMYHISTORY", res.data.totalElements);
                    commit("SET_NOTFOUNDMYHISTORY", false);
                    commit("SET_MYHISTORY", res.data.content)
                }).catch((err) => {
                    if (err.response.status == 404) {
                        commit("SET_NOTFOUNDMYHISTORY", true);
                    }
                    console.log(err)
                })
        }
    }
}