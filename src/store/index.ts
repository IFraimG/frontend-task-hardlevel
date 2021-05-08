import { createStore } from "vuex";
import actions from "./actions";
import mutations from "./mutations";

const store = createStore({
  state: () => ({
    projectsList: [],
    project: null,
    ip: "",
    isLoader: false,
    isModeInput: false,
    isModeMiniTask: false
  }),
  mutations: mutations,
  actions: actions,
  getters: {
    projects: (state: any) => state.projectsList,
    ip: (state: any) => state.ip,
    project: (state: any) => state.project,
    loader: (state: any) => state.isLoader,
    isModeInput: (state: any) => state.isModeInput,
    isModeMiniTask: (state: any) => state.isModeMiniTask
  }
})

export default store;