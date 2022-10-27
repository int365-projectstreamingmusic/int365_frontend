import { createStore } from "vuex";
import authentication from "./authentication";
import homepage from "./homepage";
import managereport from "./managereport";
import search from "./search";
import myplaylist from "./myplaylist";
import allsong from "./allsong";
import favoritepage from "./favoritepage";
import oneplaylist from "./oneplaylist";
import allplaylist from "./allplaylist";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    authentication,
    homepage,
    managereport,
    search,
    myplaylist,
    allsong,
    favoritepage,
    oneplaylist,
    allplaylist
  },
});
