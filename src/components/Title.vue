<template>
  <h1 class="project__title" v-if="!editTitle.isModeTitle" @dblclick="editMode(true)">
      {{ project.title }}
  </h1>
  <div class="project__title-content" v-if="editTitle.isModeTitle == true">
    <EditText @editMode="editMode" @saveValue="saveTitle" />
  </div>
</template>

<script lang="ts">
import { reactive } from '@vue/reactivity';
import "/src/styles/Project.scss";
import EditText from './EditText.vue';
import { provide } from '@vue/runtime-core';

export default {
  components: { EditText },
  name: "Title",
  props: {
    project: Object,
  },
  setup(props: any) {
    let editTitle = reactive({ isModeTitle: false })

    provide("value", props.project.title)
    return { editTitle, project: props.project }
  },
  methods: {
    editMode(isMode: boolean) {
      this.editTitle.isModeTitle = isMode
    },
    saveTitle(value: string) {
      this.$store.dispatch("saveTitle", { title: value, previousTitle: this.project.title })
    }
  }
};
</script>
