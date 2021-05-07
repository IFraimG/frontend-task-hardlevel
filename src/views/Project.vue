<template>
  <div>проект</div>
  <p>{{ ip }}</p>
</template>

<script lang="ts">
import { computed, onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default {
  name: "Project",
  setup() {
    const store = useStore()    
    const route = useRoute()

    onMounted(async () => {
      const ip = computed(() => store.getters.ip)
      if (ip.value != null && ip.value.length > 0) store.dispatch("getProjectByID", { ip: ip.value, projectID: route.params.projectID })
    })
  }
}
</script>
