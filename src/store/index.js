import { createStore } from "vuex";
// import demo dataset
import athletes from "./demo/athletes.json";

export default createStore({
  state: {
    demo: {
      athletes,
    },
  },
  getters: {
    athletes: (state) => state.demo.athletes,
  },
  mutations: {},
  actions: {},
  modules: {},
});
