<template>
  <div @click="setTooltip('')" class="project__wrapper">
    <div class="project__container _container">
      <div class="project__content" v-if="project != null && !isLoader">
        <div class="project__header">
          <router-link to="/">
            <img src="/src/assets/leftarrow.png" alt="Вернуться" />
          </router-link>
          <Title :project="project" />
        </div>
        <div class="project__list" v-if="project.tasks.length > 0">
          <div class="project__task-container" v-for="task of project.tasks" :key="task.id">
            <div class="project__task-wrapper">
              <Task :item="task" @contextmenu="setTooltip(task)" />
              <div class="project__task__mini-task-add" v-if="isModeMiniTask == task.id">
                <AppendTask @setMode="setModeMiniTask" @appendValue="saveMiniTask" />
              </div>
              <div @click.stop class="project__tooltip" v-if="tooltip.tooltipID == task.id">
                <p @click="$store.commit('SET_MODE_MINI_TASK', task.id)">Добавить подзадание</p>
                <p>Перенести в другой проект</p>
                <p @click="deleteTask(task.id)">Удалить</p>
              </div>
            </div>
          </div>
        </div>
        <AppendTask v-if="isModeInput" @setMode="setMode" @appendValue="appendValue" />
        <div class="project__actions" v-if="!isModeInput">
          <button @click="$store.commit('SET_MODE_INPUT', true)" class="project__success">Добавить</button>
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
import { computed, onMounted, provide, reactive } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import "/src/styles/Project.scss"
import Title from '../components/Title.vue'
import Task from '../components/Task.vue'
import AppendTask from '../components/AppendTask.vue'

export default {
  components: { Title, Task, AppendTask },
  name: "Project",
  setup() {
    const store = useStore()    
    const route = useRoute()

    const tooltip = reactive({ tooltipID: null })

    const getProject = async () => {
      store.commit("SET_LOADER", true)
      await store.dispatch("getIpAddress")
      const ip = computed(() => store.getters.ip)

      if (ip.value != null && ip.value.length > 0) await store.dispatch("getProjectByID", {ip: ip.value, projectID: route.params.projectID})
      store.commit("SET_LOADER", false)
    }

    onMounted(getProject)
    
    let isModeInput = computed(() => store.getters.isModeInput)
    let isModeMiniTask = computed(() => store.getters.isModeMiniTask)
    provide("isMode", isModeInput)

    return { 
      isModeInput, isModeMiniTask,
      project: computed(() => store.getters.project), 
      isLoader: computed(() => store.getters.loader), tooltip
    }
  },
  methods: {
    setTooltip(task: any) {
      this.tooltip.tooltipID = task.id
    },
    deleteTask(taskID: string) {
      this.$store.dispatch("deleteTask", taskID)
    },
    exportProject() {
      let link = document.createElement("a")

      let fileBLOB = new Blob([JSON.stringify(this.project)], { type: 'application/json' })
      
      link.href = URL.createObjectURL(fileBLOB)
      link.download = `${this.project.title}.json`;
      link.click();
    },
    setMode(isMode: boolean) {
      this.$store.commit("SET_MODE_INPUT", isMode)
    },
    appendValue(text: string) {
      this.$store.dispatch("appendTask", text)
    },
    setModeMiniTask(isMode: boolean) {
      this.$store.commit("SET_MODE_MINI_TASK", isMode)
    },
    saveMiniTask(text: string) {
      this.$store.dispatch("saveMiniTask", { text, taskParentID: this.isModeMiniTask })
    }
  }
}
</script>
