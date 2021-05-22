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
    setup() {
      let value = inject("value")
      let editValue = reactive({ value: value })
      return { editValue }
    },
    methods: {
      editValueClose() {
        this.$emit("editMode", false)
        this.editValue.value = ""
      },
      async saveValue() {
        await this.$emit("saveValue", this.editValue.value)
        this.editValueClose()
      }
    }
  }
</script>
