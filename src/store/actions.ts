const actions = {
  async getIpAddress({ commit, dispatch }: any) {
    let json = await fetch(`${import.meta.env.VITE_SITE_API}/check?access_key=${import.meta.env.VITE_KEY_API}`, { method: "GET" })
    let data = await json.json()
    let ip = data.ip

    commit("SET_IP", ip)
    dispatch("setProjects", ip)
  },
  async setProjects({ commit }: any, ip: string) {
    let json = await fetch("http://localhost:3001/checkfolder/" + ip)
    let projects = await json.json()
    commit("SET_ALL_PROJECTS", projects)
  },
  async getProjectByID({ commit }: any, data: any) {
    try {
      let json = await fetch(`http://localhost:3001/findProject/${data.ip}/${data.projectID}`)
      let project = await json.json()
      commit("SET_PROJECT", project)
    } catch (error) {
      console.log(error)
    }
  },
  async saveTitle({ commit, state }: any, data: any) {
    try {
      await fetch(`http://localhost:3001/saveTitle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ip: state.ip, previousTitle: data.previousTitle, title: data.title })
      })
      commit("SET_TITLE", data.title)
    } catch (error) {
      console.log(error)
    }
  },
  async saveDescription({ commit, state }: any, data: any) {
    try {
      await fetch(`http://localhost:3001/editDescription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ip: state.ip,
          title: state.project.title,
          taskID: data.taskID,
          value: data.value
        })
      })
      commit("EDIT_DESCRIPTION", { value: data.value, id: data.taskID })
    } catch (error) {
      console.log(error)
    }
  },
  async setTaskDone({ state, commit }: any, data: any) {
    try {
      await fetch(`http://localhost:3001/setTaskDone`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ip: state.ip,
          title: state.project.title,
          id: data.id,
          isDone: data.isDone
        })
      })
      commit("SET_TASK_DONE", { isDone: data.isDone, id: data.id })
    } catch (error) {
      console.log(error)
    }
  },
  async appendTask({ state, commit }: any, text: string) {
    try {
      let json = await fetch(`http://localhost:3001/appendTask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ip: state.ip, title: state.project.title, description: text })
      })
      let task = await json.json()
      commit("APPEND_TASK", task)
    } catch (error) {
      console.log(error.message)
    }
  },
  async deleteTask({ state, commit }: any, taskID: string) {
    try {
      await fetch(`http://localhost:3001/deleteTask/${state.ip}/${state.project.title}/${taskID}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      })
      commit("DELETE_TASK", taskID)
    } catch (error) {
      console.log(error.message)
    }
  },
  async saveMiniTask({ state, commit }: any, data: any) {
    try {
      let json = await fetch(`http://localhost:3001/appendTask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ip: state.ip,
          title: state.project.title,
          parentID: data.taskParentID,
          description: data.text
        })
      })
      let miniTask = await json.json()
      commit("APPEND_TASK", miniTask)
    } catch (error) {
      console.log(error.message)
    }
  },
  async getProjects({ state, commit }: any) {
    try {
      let json = await fetch(`http://localhost:3001/getProjectsID/${String(state.ip)}/${state.project.title}`, { method: "GET" })
      let projects = await json.json()
      console.log(projects);
      commit("SET_PROJECTS_LIST", projects)
    } catch (error) {
      console.log(error.message)
    }
  },
  async createProject({ state, commit }: any) {
    try {
      let json = await fetch(`http://localhost:3001/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ip: state.ip })
      })
      let project = await json.json()
      commit("ADD_PROJECT", { project })
    } catch (error) {
      console.log(error.message);
    }
  },
  async taskMoved({ state, commit }: any, payload: any) {
    try {
      let json = await fetch(`http://localhost:3001/taskMoved`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ip: state.ip, oldID: state.project.id, title: state.project.title,
          newID: payload.id, newTitle: payload.title, taskID: state.modalTask.id
        })
      })
      let project = await json.json()
      commit("SET_PROJECT", project)
      commit("SET_MODAL_MOVE", { isModal: false, task: null })
    } catch (error) {
      console.log(error.message);
    }
  },
  async dragTask({ state, commit }: any, payload: any) {
    let newTaskIndex = state.project.tasks.findIndex((task: any) => task.id == payload.taskID)
    let tasks = []

    if (payload.taskOrder != null && newTaskIndex != null) {
      let prevTaskOrder = {
        ...state.project.tasks[newTaskIndex],
        order: payload.taskOrder,
        parentID: state.project.tasks[payload.taskOrder]?.parentID
      }
      let newTask = {
        ...state.project.tasks[payload.taskOrder],
        order: newTaskIndex,
        parentID: state.project.tasks[newTaskIndex]?.parentID
      }

      for (let i = 0; i < state.project.tasks.length; i++) {
        if (i == payload.taskOrder) tasks.push(prevTaskOrder)
        else if (i == newTaskIndex) tasks.push(newTask)
        else tasks.push(state.project.tasks[i])
      }

      try {
        await fetch(`http://localhost:3001/dragTasks`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ip: state.ip, title: state.project.title, tasks })
        })
        commit("DRAG_TASK", tasks)
      } catch (err) {
        console.log(err)
      }
    }
  }
}

export default actions
