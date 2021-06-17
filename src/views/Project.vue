<template>
  <div @click="$store.commit('SET_TOOLTIP', null)" class="project__wrapper">
    <ModalMoved />
    <div class="project__container _container">
      <div class="project__content" v-if="project != null && !isLoader">
        <div class="project__header">
          <router-link to="/">
            <img src="/src/assets/leftarrow.png" alt="Вернуться" />
          </router-link>
          <Title :project="project" />
        </div>
        <div class="project__list" v-if="project.tasks.length > 0">
          <div v-for="task of projectTasks" :key="task"
            class="project__task-container"
            @dragover.prevent
            @drop="onDroppable($event, task.order)"
          >
            <TaskWrapper
              draggable="true"
              @dragstart="onDragStart($event, task)"
              @drop="onDroppable($event)"
              @dragleave="onDragLeave($event)"
              @dragenter="onDragEnter($event)"
              :task="task"
              v-if="task.parentID == null"
              :taskList="projectTasks"
            /> 
          </div>
        </div>
        <AppendTask style="margin-bottom: 100px" v-if="isModeInput" @setMode="setMode" @appendValue="appendValue" />
        <div class="project__actions" v-if="!isModeInput">
          <button @click="setMode(true)" class="project__success">Добавить</button>
          <button @click="exportProject" class="project__edit">Экспортировать</button>
        </div>
      </div>
      <div v-if="isLoader">
        <p>Загрузка.....</p>
      </div>
      <div v-if="!isLoader && project == null">
        <h1>Возникли проблемы</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, provide } from '@vue/runtime-core'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  import "/src/styles/Project.scss"
  import Title from "/src/components/Title.vue"
  import AppendTask from '/src/components/AppendTask.vue'
  import TaskWrapper from '/src/components/TaskWrapper.vue'
  import ModalMoved from '/src/components/ModalMoved.vue'
  import { TaskInterface } from "/src/interfaces/task"

  const Component = defineComponent({
    name: "Project",
    components: { Title, AppendTask, TaskWrapper, ModalMoved },
    setup() {
      const store = useStore()
      const route = useRoute()

      const getProject = async () => {
        store.commit("SET_LOADER", true)
        await store.dispatch("getIpAddress")
        const ip = computed(() => store.getters.ip)

        if (ip.value != null && ip.value.length > 0) await store.dispatch("getProjectByID", {
          ip: ip.value, projectID: route.params.projectID
        })
        store.commit("SET_LOADER", false)
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

      const projectTasks = computed(() => {
        let arr: TaskInterface[] = store.state.project.tasks
        let orderArr = []

        arr.map((item: TaskInterface, index: number) => {
          if (item?.order == null) orderArr.push({ ...item, order: index })
          else orderArr.push({ ...item })
        })

        return orderArr
      })

      const exportProject = () => {
        let link = document.createElement("a")

        let fileBLOB = new Blob([JSON.stringify(store.getters.project)], { type: 'application/json' })

        link.href = URL.createObjectURL(fileBLOB)
        link.download = `${store.getters.project.title}.json`;
        link.click();
      }

      const setMode = (isMode: boolean) => store.commit("SET_MODE_INPUT", isMode)
      const appendValue = (text: string) => store.dispatch("appendTask", text)

      onMounted(getProject)

      let isModeInput = computed(() => store.getters.isModeInput)
      provide("isMode", isModeInput)
      return { 
        isModeInput, onDragStart, onDroppable, onDragEnter, onDragLeave,
        project: computed(() => store.getters.project),
        isLoader: computed(() => store.getters.loader),
        projectTasks, exportProject, setMode, appendValue
      }
    }
  })

  export default Component
</script>
