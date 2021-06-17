import { StateInterface } from './../interfaces/project';
import {
  TaskDoneItfc, TaskInterface, TaskModalMovedItfc,
  TaskShortItfc, TaskDescriptionEditItfc, TaskDragItfc
} from './../interfaces/task'
import { ProjectFull } from "../interfaces/project"

const mutations = {
  SET_IP(state: StateInterface, payload: string) {
    state.ip = payload
  },
  SET_ALL_PROJECTS(state: StateInterface, payload: Array<ProjectFull>) {
    state.projectsList = payload
  },
  SET_PROJECT(state: StateInterface, payload: ProjectFull) {
    state.project = payload
  },
  ADD_PROJECT(state: StateInterface, payload: any) {
    state.projectsList = state.projectsList == null ? [payload.project] : [...state.projectsList, payload.project]
  },
  SET_LOADER(state: StateInterface, payload: boolean) {
    state.isLoader = payload
  },
  SET_TITLE(state: StateInterface, payload: string) {
    if (state.project != null) state.project.title = payload
  },
  EDIT_DESCRIPTION(state: StateInterface, payload: TaskDescriptionEditItfc) {
    if (state.project != null) state.project.tasks.map((item: TaskInterface) => {
      if (item.id == payload.id) item.description = payload.value
    })
  },
  SET_TASK_DONE(state: StateInterface, payload: TaskDoneItfc) {
    if (state.project != null) state.project.tasks.map((item: TaskInterface) => {
      if (item.id == payload.id) item.isDone = payload.isDone
    })
  },
  APPEND_TASK(state: any, payload: TaskInterface) {
    state.project.tasks = [...state.project.tasks, payload]
  },
  DELETE_TASK(state: any, payload: string) {
    state.project.tasks.map((task: TaskInterface, index: number) => {
      if (payload == task.id) state.project.tasks.splice(index, 1)
    })
  },
  SET_MODE_INPUT(state: StateInterface, payload: boolean) {
    state.isModeInput = payload
  },
  SET_MODE_MINI_TASK(state: StateInterface, payload: boolean) {
    state.isModeMiniTask = payload
  },
  SET_TOOLTIP(state: StateInterface, payload: string | null) {
    state.tooltipID = payload
  },
  SET_MODAL_MOVE(state: any, payload: TaskModalMovedItfc) {
    state.isModalMoved = payload.isModal
    state.modalTask = payload.task
  },
  SET_PROJECTS_LIST(state: any, payload: TaskShortItfc) {
    state.projectModalList = payload
  },
  DRAG_TASK(state: any, payload: TaskInterface[]) {
    state.project.tasks = payload
  }
}

export default mutations