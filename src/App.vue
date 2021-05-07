<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()
    onBeforeMount(() => store.dispatch("getIpAddress"))
  }
})
</script>
