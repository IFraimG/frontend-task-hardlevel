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
          <div class="project__task-container" v-for="task of project.tasks" :key="task.id">
            <TaskWrapper :task="task" v-if="task.parentID == null" :taskList="project.tasks" />
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
  import { computed, onMounted, provide, reactive } from '@vue/runtime-core'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  import "/src/styles/Project.scss"
  import Title from '/src/components/Title.vue'
  import AppendTask from '/src/components/AppendTask.vue'
  import TaskWrapper from '/src/components/TaskWrapper.vue'
  import ModalMoved from '/src/components/ModalMoved.vue'

  export default {
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

      onMounted(getProject)

      let isModeInput = computed(() => store.getters.isModeInput)
      provide("isMode", isModeInput)

      return { 
        isModeInput,
        project: computed(() => store.getters.project),
        isLoader: computed(() => store.getters.loader)
      }
    },
    methods: {
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
      }
    }
  }
</script>
