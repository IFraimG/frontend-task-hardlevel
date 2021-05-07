import { createStore } from "vuex";

const store = createStore({
  state: () => ({
    projectsList: [],
    project: null,
    ip: "",
    tasks: [],
    isLoader: false
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
    },
    SET_LOADER(state, payload) {
      state.isLoader = payload
    },
    SET_TITLE(state: any, payload: string) {
      state.project.title = payload
    }
  },
  actions: {
    async getIpAddress({ commit, dispatch }) {
      let json = await fetch(`${import.meta.env.VITE_SITE_API}/check?access_key=${import.meta.env.VITE_KEY_API}`, { method: "GET" })
      let data = await json.json()
      console.log(data);
      
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
    },
    async saveTitle({ commit, state }, data: any) {
      try {
        await fetch(`http://localhost:3001/saveTitle`, { 
          method: "POST", 
          headers: {
            'Content-Type': 'application/json' 
          }, 
          body: JSON.stringify({ ip: state.ip, previousTitle: data.previousTitle, title: data.title })
        })
        commit("SET_TITLE", data.title)
      } catch (error) {
        
      }
    }
  },
  getters: {
    projects: (state: any) => state.projectsList,
    ip: (state: any) => state.ip,
    project: (state: any) => state.project,
    loader: (state: any) => state.isLoader
  }
})

export default store;