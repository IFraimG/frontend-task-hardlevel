<template>
  <div class="project__task-wrapper">
    <Task :item="task" @contextmenu="setTooltip(task)" />
    <div class="project__task__mini-task-add" v-if="isModeMiniTask == task.id">
      <AppendTask @setMode="setModeMiniTask" @appendValue="saveMiniTask" />
    </div>
    <div
      class="project__task__mini-task-item"
      v-for="item of taskList"
      :key="item"
      @drop="onDroppable($event, item.order)"
      @dragover.prevent
    >
      <TaskWrapper
        draggable="true"
        @dragenter="onDragEnter($event)"
        @dragstart="onDragStart($event, item)"
        @drop="onDroppable($event)"
        @dragleave="onDragLeave($event)"
        v-if="item.parentID == task.id"
        :taskList="taskList"
        :task="item"
      />
    </div>
    <div class="project__tooltip" v-if="tooltip == task.id">
      <p @click="setModeMiniTask(task.id)">Добавить подзадание</p>
      <p @click="movedTask">Перенести в другой проект</p>
      <p @click="deleteTask(task.id)">Удалить</p>
    </div>
  </div>
</template>

<script lang="ts">
  import AppendTask from '/src/components/AppendTask.vue'
  import Task from '/src/components/Task.vue'
  import { TaskInterface } from "/src/interfaces/task"
  import { computed, defineComponent, provide } from 'vue'
  import { useStore } from 'vuex'

  const Component = defineComponent({
    name: "TaskWrapper",
    components: { AppendTask, Task },
    props: {
      task: Object,
      taskList: Array
    },
    setup(props: { task: TaskInterface, taskList: TaskInterface[] }) {
      const store = useStore()

      let isModeInput = computed(() => store.getters.isModeInput)
      let isModeMiniTask = computed(() => store.getters.isModeMiniTask)
      let tooltip = computed(() => store.getters.tooltipID)

      const setTooltip = (task: any) => store.commit("SET_TOOLTIP", task.id)
      const deleteTask = (taskID: string) => store.dispatch("deleteTask", taskID)
      const setModeMiniTask = (isMode: boolean) => store.commit("SET_MODE_MINI_TASK", isMode)
      const saveMiniTask = (text: string) => store.dispatch("saveMiniTask", { text, taskParentID: props.task.id })

      const movedTask = () => {
        store.dispatch("getProjects")
        store.commit("SET_MODAL_MOVE", { task: props.task, isModal: true })
      }

      const onDragStart = (event: DragEvent, item: TaskInterface) => {
        event.dataTransfer.dropEffect = "move"
        event.dataTransfer.effectAllowed = "move"
        event.dataTransfer.setData("taskID", item.id)
      }

      const onDroppable = (event: DragEvent, taskOrder: number) => {
        if (event.currentTarget.classList.contains("dragOver")) event.currentTarget.classList.remove("dragOver")
        let taskID = event.dataTransfer.getData("taskID")
        store.dispatch("dragTask", { taskOrder, taskID })
      }

      const onDragEnter = (event: DragEvent) => event.currentTarget.classList.add("dragOver")
      const onDragLeave = (event: DragEvent) => {
        if (event.currentTarget.classList.contains("dragOver")) event.currentTarget.classList.remove("dragOver")
      }
      provide("isMode", isModeInput)

      return {
        isModeInput, isModeMiniTask, tooltip, movedTask,
        setTooltip, deleteTask, setModeMiniTask, saveMiniTask,
        onDroppable, onDragStart, onDragEnter, onDragLeave
      }
    }
  })

  export default Component
</script>
