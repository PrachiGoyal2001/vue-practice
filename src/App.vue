<script setup>
import { ref, reactive } from 'vue'
import KanbanBoardComponent from './components/KanbanBoardComponent.vue'

const newTaskDetail = reactive({
  task: '',
  type: 'to-do',
})

const taskType = [
  { label: 'To do', value: 'to-do' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Done', value: 'done' },
]

const typeBasedAllTasks = reactive({
  'to-do': ['Market Research', 'Write projects'],
  'in-progress': ['Design UI mockups'],
  done: ['set up Repository'],
})

const addTask = () => {
  typeBasedAllTasks[newTaskDetail.type].push(newTaskDetail.task)
  newTaskDetail.task = ''
}

const addTaskDetails = ({ start, drop }) => {
  console.log(start, drop)
  const [element] = typeBasedAllTasks[start.type].splice(start.index, 1)
  typeBasedAllTasks[drop.type].push(element)
}

const deleteTask = ({ index, type }) => {
  typeBasedAllTasks[type].splice(index, 1)
}
</script>

<template>
  <div>
    <input
      type="text"
      placeholder="Add a new task..."
      @keydown.enter="addTask"
      v-model="newTaskDetail.task"
    />
    <select v-model="newTaskDetail.type">
      <option v-for="(type, index) in taskType" :key="index" :value="type.value">
        {{ type.label }}
      </option>
    </select>
    <button @click="addTask">Add</button>
  </div>
  <KanbanBoardComponent
    :typeBasedAllTasks="typeBasedAllTasks"
    class="mt-5"
    @addTaskDetails="addTaskDetails"
    @deleteTask="deleteTask"
  />
</template>

<style scoped>
.mt-5 {
  margin-top: 15px;
}
</style>
