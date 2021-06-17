<template>
  <div v-if="isModal" class="modal__wrapper" @click="setModal(false, null)">
    <div class="modal">
      <div @click.stop class="modal__container">
        <h1>Выберите, куда вы хотите сохранить ваше задание</h1>
        <div class="modal__content" v-if="projects != null">
          <ul v-for="(item, index) of projects" :key="index">
            <button class="home__create modal__item" @click="taskMoved(item.id, item.title)">{{ item.title }}</button>
          </ul>
        </div>
        <div class="modal__content" v-else>
          <h3>Вы еще не создали больше ни одного проекта</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import "../styles/ModalMoved.scss"
  import { computed } from 'vue'
  import { useStore } from "vuex"

  export default {
    name: "ModalMoved",
    setup() {
      const store = useStore()
      const isModal = computed(() => store.getters.isModalMoved)

      const taskMoved = (id: string, title: string) => store.dispatch("taskMoved", { id, title })
      store.dispatch("getProjects")
      return {
        isModal, taskMoved,
        setModal: (isModal: boolean, task: any) => store.commit('SET_MODAL_MOVE', { isModal, task }), 
        projects: computed(() => store.getters.projectsList),
        getProjects: () => store.dispatch("getProjects")
      }
    }
  }
</script>
