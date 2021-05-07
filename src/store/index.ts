import { createStore } from "vuex";

const store = createStore({
  state: () => ({
    projectsList: [],
    project: null,
    ip: "",
    tasks: []
  }),
  mutations: {
    SET_IP(state, payload: string) {
      state.ip = payload
    },
    SET_ALL_PROJECTS(state, payload) {
      state.projectsList = payload
    },
    SET_PROJECT(state, payload) {
      state.project = payload
    }
  },
  actions: {
    async getIpAddress({ commit, dispatch }) {
      let json = await fetch("https://ipapi.co/json/", { method: "GET" })
      let data = await json.json()
      let ip = data.ip;
      commit("SET_IP", ip)
      dispatch("setProjects", ip)
    },
    async setProjects({ commit }, ip: string) {
      let json = await fetch("http://localhost:3001/checkfolder/" + ip)
      let projects = await json.json()
      commit("SET_ALL_PROJECTS", projects)
    },
    async getProjectByID({ commit }, data: any) {
      try {
        let json = await fetch(`http://localhost:3001/findProject/${data.ip}/${data.projectID}`)
        let project = await json.json()  
        commit("SET_PROJECT", project)
      } catch (error) {
        console.log(error);
      }
    }
  },
  getters: {
    projects: (state: any) => state.projectsList,
    ip: (state: any) => state.ip
  }
})

export default store;