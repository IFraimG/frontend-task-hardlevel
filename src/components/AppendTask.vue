<template>
  <div>
    <div class="project__task project__settings">
    <textarea
      placeholder="Введите то, что вы планируете сделать.."
      class="project__task-field project__append"
      v-model="modeEdit.text"
      type="text"
      ref="appendTask"
      data-pcholder="normal"
    />
    </div>
    <div class="project__actions">
      <button class="project__edit" @click="setMode(false)">Отменить</button>
      <button class="project__success" @click="appendTask">Сохранить</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { reactive } from '@vue/reactivity'

  export default {
    name: "AppendTask",
    inject: {
      isMode: Boolean
    },
    emits: ["setMode", "appendValue"],
    setup() {
      let modeEdit = reactive({ text: "" })
      return { modeEdit }
    },
    methods: {
      setMode(isMode: boolean) {
        this.$emit("setMode", isMode)
        if (!isMode) this.modeEdit.text = ""
      },
      async appendTask() {
        if (this.modeEdit.text.length > 0) {
          await this.$emit("appendValue", this.modeEdit.text)
          this.setMode(false)
        } else {
          this.$refs.appendTask.placeholder = "Вы не ввели описание !"
          this.$refs.appendTask.setAttribute("data-pcholder", "error")
        }
      },
    }
  }
</script>
