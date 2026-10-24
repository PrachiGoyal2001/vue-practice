<template>
  <div class="all-tasks">
    <div
      v-for="(allTask, key, index) in typeBasedAllTasks"
      :key="`all-task-${index}`"
      class="task-based-on-type"
      @dragover="dragOver($event, key)"
      @drop="onDrop($event)"
    >
      <div class="task-key">
        {{ formatKey(key) }}
        <div class="task-length">{{ allTask.length }}</div>
      </div>
      <div class="task-details">
        <div
          v-for="(task, index) in allTask"
          :key="`task-${index}`"
          class="mb-2 task"
          :draggable="true"
          @click="selectTask(index, key)"
          @dragstart="startDrag($event, index, key)"
          @dragend="reset"
          :class="{
            active: index === startDragDetail.index && key === startDragDetail.type,
          }"
        >
          {{ task }}
          <div @click="deleteTask(index, key)" class="cursor-pointer">❌</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  typeBasedAllTasks: {
    type: Object,
    default: () => {},
  },
})

const emit = defineEmits(['deleteTask', 'addTaskDetails'])
const startDragDetail = ref({ index: -1, type: null })
const dropDetail = ref({ type: null })

const formatKey = (key) => {
  return key
    .split('-')
    .map((k) => k[0].toUpperCase() + k.slice(1))
    .join('')
}

const deleteTask = (index, type) => {
  emit('deleteTask', { index, type })
}

const startDrag = (event, index, type) => {
  startDragDetail.value = { index, type }
  event.dataTransfer.effectAllowed = 'copy'
}

const selectTask = (index, type) => {
  startDragDetail.value = { index, type }
}

const dragOver = (event, type) => {
  event.preventDefault()
  dropDetail.value = { type }
}

const reset = () => {
  startDragDetail.value = { index: -1, type: null }
  dropDetail.value = { type: null }
}

const onDrop = (event) => {
  event.preventDefault()
  emit('addTaskDetails', { start: startDragDetail.value, drop: dropDetail.value })
  reset()
}
</script>

<style scoped>
.all-tasks {
  display: flex;
  gap: 10px;
}
.task-based-on-type {
  border: 2px solid black;
  border-radius: 5px;
  width: 200px;
}
.task-key {
  border-bottom: 2px solid black;
  padding: 10px 5px;
}
.task-key .task-length {
  border-radius: 100%;
  border: 2px solid black;
  height: 15px;
  width: 15px;
  padding: 2px;
  display: inline-block;
  text-align: center;
}
.mb-2 {
  margin-bottom: 10px;
}
.task-details {
  padding: 10px 5px;
}
.task {
  padding: 5px 2px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  background: rgb(111, 108, 108);
  cursor: grab;
}
.cursor-pointer {
  cursor: pointer;
}
.active {
  cursor: grabbing;
}
</style>
