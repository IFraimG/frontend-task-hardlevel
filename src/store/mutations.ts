
const mutations = {
  SET_IP(state: any, payload: string) {
    state.ip = payload
  },
  SET_ALL_PROJECTS(state: any, payload: any) {
    state.projectsList = payload
  },
  SET_PROJECT(state: any, payload: any) {
    state.project = payload
  },
  SET_LOADER(state: any, payload: boolean) {
    state.isLoader = payload
  },
  SET_TITLE(state: any, payload: string) {
    state.project.title = payload
  },
  EDIT_DESCRIPTION(state: any, payload: any) {
    state.project.tasks.map((item: any) => {
      if (item.id == payload.id) item.description = payload.value
    })
  },
  SET_TASK_DONE(state: any, payload: any) {
    state.project.tasks.map((item: any) => {
      if (item.id == payload.id) item.isDone = payload.isDone
    })
  },
  APPEND_TASK(state: any, payload: any) {
    state.project.tasks = [...state.project.tasks, payload]
  },
  DELETE_TASK(state: any, payload: string) {
    state.project.tasks.map((task: any, index: number) => {
      if (payload == task.id) state.project.tasks.splice(index, 1)
    })
  },
  SET_MODE_INPUT(state: any, payload: boolean) {
    state.isModeInput = payload
  },
  SET_MODE_MINI_TASK(state: any, payload: boolean | string) {
    state.isModeMiniTask = payload
  },
  APPEND_MINI_TASK(state: any, payload: any) {
    state.project.tasks.map((task: any, index: number) => {
      if (task.id == payload.taskID) state.project.tasks[index].miniTasks.push(payload.miniTask)
    })
  }
}

export default mutations;