import { TaskInterface, TaskShortItfc } from './task';

export interface StateInterface {
  projectsList: Array<ProjectFull> | null
  project: ProjectFull | null
  ip: string
  isLoader: boolean
  isModeInput: boolean
  isModeMiniTask: boolean
  isModalMoved: boolean
  tooltipID: string | null
  modalTask: TaskInterface | null
  projectModalList: TaskShortItfc | null
}

export interface ProjectFull {
  title: string
  id: string
  tasks: Array<TaskInterface>
}