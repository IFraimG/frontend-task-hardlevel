import { TaskInterface, TaskShortItfc } from "./interfaces/task"
import { Store } from "vuex"
import { ProjectFull } from "./interfaces/project"

declare module "@vue/runtime-core" {
  interface StateInterface {
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

  interface ComponentCustomProperties {
    $store: Store<StateInterface>
  }
}
