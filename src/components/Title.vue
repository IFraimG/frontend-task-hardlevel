<template>
  <h1 v-if="!editTitle.isModeTitle" class="project__title" @dblclick="editMode(true)">
    {{ project.title }}
  </h1>
  <div v-if="editTitle.isModeTitle == true" class="project__title-content">
    <EditText @editMode="editMode" @saveValue="saveTitle" />
  </div>
</template>

<script lang="ts">
  import "/src/styles/Project.scss"
  import EditText from "./EditText.vue"
  import { defineComponent, provide, reactive } from "vue"
  import { useStore } from "vuex"

  const Component = defineComponent({
    name: "Title",
    components: { EditText },
    props: {
      project: Object
    },
    setup(props: any) {
      const store = useStore()
      let editTitle = reactive({ isModeTitle: false })

      const editMode = (isMode: boolean) => editTitle.isModeTitle = isMode
      const saveTitle = (value: string) => store.dispatch("saveTitle", { title: value, previousTitle: props.project.title })
      provide("value", props.project.title)
      return { editTitle, saveTitle, editMode }
    },
  })

  export default Component
</script>
