<template>
  <div @contextmenu.prevent="setTooltip" :class="[task.isDone ? 'project__done' : '', 'project__task']">
    <p @click="editMode(true)" v-if="!editTask.isMode" class="project__task-description">
      {{ task.description }}
    </p>
    <div class="project__task-edit" v-else>
      <textarea
        v-model="editTask.value"
        id="fieldTask"
        ref="fieldTask"
        @keyup.enter="adaptiveField"
        class="project__task-field project__task-error"
        cols="30"
      />
      <img class="project__task-done" @click="editMode(false)" src="/src/assets/cancel.png" />
    </div>
    <img class="project__task-done project__task-ready" @click="setDone(false)" v-if="task.isDone && !editTask.isMode" src="/src/assets/cancel.png" />
    <img
      class="project__task-done project__task-ready"
      @click="setDone(true)"
      v-else-if="!task.isDone && !editTask.isMode"
      src="/src/assets/check.png"
    />
    <img class="project__task-done" @click="saveText" v-else-if="editTask.isMode" src="/src/assets/check.png" />
  </div>
</template>

<script lang="ts">
  import { provide, reactive } from "@vue/runtime-core"
  // import EditText from './EditText.vue'
  import "/src/styles/Project.scss"

  export default {
    name: "Task",
    props: {
      item: Object
    },
    setup(props: any) {
      let editTask = reactive({ isMode: false, value: "" })
      provide("value", props.item.description)
      return { task: props.item, editTask }
    },
    methods: {
      editMode(editMode: boolean) {
        if (editMode) this.editTask.value = this.task.description
        else this.editTask.value = ""
        this.editTask.isMode = editMode
      },
      async saveText() {
        if (this.editTask.value.length > 0) {
          await this.$store.dispatch("saveDescription", {
            value: this.editTask.value,
            taskID: this.task.id
          })
          this.editMode(false)
        } else this.$refs.fieldTask.placeholder = "Вы не заполнили задание !"
      },
      adaptiveField() {
        let fieldTask = document.getElementById("fieldTask")
        fieldTask.style.overflow = "hidden"
        fieldTask.style.height = fieldTask.scrollHeight + "px"
      },
      setDone(isDone: boolean) {
        this.$store.dispatch("setTaskDone", { id: this.task.id, isDone })
      }
    }
  }
</script>
