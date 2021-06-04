export interface TaskInterface {
  description: string
  id: string
  isDone: boolean
  parentID: string | null
}

export interface TaskDoneItfc {
  isDone: boolean
  id: string
}

export interface TaskModalMovedItfc {
  isModal: boolean
  task: TaskInterface
}

export interface TaskShortItfc {
  title: string
  id: string
}

export interface TaskDescriptionEditItfc {
  value: string
  id: string
}