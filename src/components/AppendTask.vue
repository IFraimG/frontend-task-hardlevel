<template>
  <div>
    <div class="project__task project__settings">
    <textarea
      placeholder="Введите то, что вы планируете сделать.."
      class="project__task-field project__append"
      v-model="modeEdit.text"
      type="text"
      ref="appendTaskREF"
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
  import { reactive, ref } from "vue"

  export default {
    name: "AppendTask",
    inject: {
      isMode: Boolean
    },
    emits: ["setMode", "appendValue"],
    setup(_, { emit }) {
      let modeEdit = reactive({ text: "" })
      let appendTaskREF = ref(null)

      const setMode = (isMode: boolean) => {
        emit("setMode", isMode)
        if (!isMode) modeEdit.text = ""
      }

      const appendTask = async () => {
        if (modeEdit.text.length > 0) {
          await emit("appendValue", modeEdit.text)
          setMode(false)
        } else {
          appendTaskREF.value.placeholder = "Вы не ввели описание !"
          appendTaskREF.value.setAttribute("data-pcholder", "error")
        }
      }

      return { modeEdit, appendTask, setMode }
    }
  }
</script>
