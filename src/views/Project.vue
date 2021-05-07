<template>
  <div class="project__wrapper">
    <div class="project__container _container">
      <div class="project__content" v-if="project != null && !isLoader">
        <Title :project="project" />
        <div class="project__list" v-if="project.tasks.length > 0">
          <div class="project__task-container" v-for="task of project.tasks" :key="task.id">
            <div class="project__task">
              <p class="project__task-description">{{ task.description }}</p>
              <img class="project__task-done project__task-ready" v-if="task.isDone" src="/src/assets/cancel.png" />
              <img class="project__task-done project__task-ready" v-else src="/src/assets/check.png" />
            </div>
          </div>
        </div>
        <div class="project__actions">
          <button class="project__success">Добавить</button>
          <button class="project__edit">Переместить в другой проект</button>
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
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import "/src/styles/Project.scss"
import Title from '../components/Title.vue'

export default {
  components: { Title },
  name: "Project",
  setup() {
    const store = useStore()    
    const route = useRoute()

    const getProject = async () => {
      store.commit("SET_LOADER", true)
      await store.dispatch("getIpAddress")
      const ip = computed(() => store.getters.ip)

      if (ip.value != null && ip.value.length > 0) await store.dispatch("getProjectByID", {ip: ip.value, projectID: route.params.projectID})
      store.commit("SET_LOADER", false)
    }

    onMounted(getProject)

    return { 
      project: computed(() => store.getters.project), 
      isLoader: computed(() => store.getters.loader),
    }
  },
}
</script>
