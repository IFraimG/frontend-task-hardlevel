<template>
  <div class="project__task-wrapper">
    <Task :item="task" @contextmenu="setTooltip(task)" />
    <div class="project__task__mini-task-add" v-if="isModeMiniTask == task.id">
      <AppendTask @setMode="setModeMiniTask" @appendValue="saveMiniTask" />
    </div>
    <div class="project__task__mini-task-item" v-for="item of taskList" :key="item.id">
      <TaskWrapper v-if="item.parentID == task.id" :taskList="taskList" :task="item" />
    </div>
    <div class="project__tooltip" v-if="tooltip == task.id">
      <p @click="setModeMiniTask(task.id)">Добавить подзадание</p>
      <p>Перенести в другой проект</p>
      <p @click="deleteTask(task.id)">Удалить</p>
    </div>
  </div>
</template>

<script lang="ts">
  import AppendTask from '/src/components/AppendTask.vue'
  import Task from '/src/components/Task.vue'
  import { computed, provide } from '@vue/runtime-core'
  import { useStore } from 'vuex'

  export default {
    name: "TaskWrapper",
    components: { AppendTask, Task },
    props: {
      task: Object,
      taskList: Array
    },
    setup() {
      const store = useStore()

      let isModeInput = computed(() => store.getters.isModeInput)
      let isModeMiniTask = computed(() => store.getters.isModeMiniTask)
      let tooltip = computed(() => store.getters.tooltipID)

      provide("isMode", isModeInput)

      return { isModeInput, isModeMiniTask, tooltip }
    },
    methods: {
      setTooltip(task: any) {
        this.$store.commit("SET_TOOLTIP", task.id)
      },
      deleteTask(taskID: string) {
        this.$store.dispatch("deleteTask", taskID)
      },
      setModeMiniTask(isMode: any) {
        this.$store.commit("SET_MODE_MINI_TASK", isMode)
      },
      saveMiniTask(text: string) {
        this.$store.dispatch("saveMiniTask", { text, taskParentID: this.isModeMiniTask })
      }
    }
  }
</script>
