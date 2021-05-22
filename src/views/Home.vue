<template>
  <div class="home__wrapper">
    <div class="home__container _container">
      <div class="home__content">
        <h1>Cписок проектов</h1>
        <div class="home__list">
          <div class="home__item" v-for="(item, index) of projects" :key="index">
            <router-link class="home__item-link" target="_blank" rel="noopener noreferrer" :to="item.id">
              <h2>{{ item.title }}</h2>
              <p v-if="item.tasks.length > 0">Задание: {{ item.tasks[0].description }}</p>
              <p v-else>Вы еще не добавили ни одного задания</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed } from '@vue/runtime-core'
  import { useStore } from 'vuex'
  import "/src/styles/Home.scss"

  export default {
    name: "Home",
    setup() {
      const store = useStore()
      return { projects: computed(() => store.getters.projects) }
    }
  }
</script>
