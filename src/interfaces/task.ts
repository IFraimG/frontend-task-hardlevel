export interface TaskInterface {
  description: string
  id: string
  isDone: boolean
  parentID: string | null
  order: number | null
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

export interface TaskDragItfc {
  taskIndex: number
  taskID: string
}