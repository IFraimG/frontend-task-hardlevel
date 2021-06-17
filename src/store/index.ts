import { StateInterface } from "./../interfaces/project"
import { createStore } from "vuex"
import actions from "./actions"
import mutations from "./mutations"

const store = createStore<StateInterface>({
  state: () => ({
    projectsList: [],
    project: null,
    ip: "",
    isLoader: false,
    isModeInput: false,
    isModeMiniTask: false,
    isModalMoved: false,
    tooltipID: null,
    modalTask: null,
    projectModalList: null
  }),
  mutations: mutations,
  actions: actions,
  getters: {
    projects: (state: StateInterface) => state.projectsList,
    ip: (state: StateInterface) => state.ip,
    project: (state: StateInterface) => state.project,
    loader: (state: StateInterface) => state.isLoader,
    isModeInput: (state: StateInterface) => state.isModeInput,
    isModeMiniTask: (state: StateInterface) => state.isModeMiniTask,
    tooltipID: (state: StateInterface) => state.tooltipID,
    isModalMoved: (state: StateInterface) => state.isModalMoved,
    modalTask: (state: StateInterface) => state.modalTask,
    projectsList: (state: StateInterface) => state.projectModalList
  }
})

export default store
