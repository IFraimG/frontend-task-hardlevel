<template>
  <input class="project__title-input" @keydown.enter="saveValue" type="text" v-model="editValue.value" />
  <img class="project__task-done" @click="editValueClose" src="/src/assets/cancel.png" />
</template>

<script>
  import "/src/styles/Project.scss"
  import { inject, reactive } from "vue"

  export default {
    name: "EditText",
    emits: ["editMode", "saveValue"],
    setup(_, { emit }) {
      let value = inject("value")
      let editValue = reactive({ value: value })

      const editValueClose = () => {
        emit("editMode", false)
        editValue.value = ""
      }
      const saveValue = async () => {
        await emit("saveValue", editValue.value)
        editValueClose()
      }
      return { editValue, saveValue, editValueClose}
    }
  }
</script>
