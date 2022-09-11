import { createStore } from "vuex";
import authentication from "./authentication";
import homepage from "./homepage";
export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    authentication,
    homepage
  },
});
