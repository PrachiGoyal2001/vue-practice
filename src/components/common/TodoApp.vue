<template>
  <div>
    <input v-model="userTask" @keyup.enter="addTask" />
    <button @click="addTask()">AddTask</button>
    <table border>
      <thead>
        <tr>
          <td>Id</td>
          <td>Description</td>
          <td>Buttons</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="detail in filteredTodoDetails" :key="detail.id">
          <!-- <td :class="detail.isComplete ? 'lineThrough' : ''">{{ detail.id }}</td>
          <td :class="detail.isComplete ? 'lineThrough' : ''">{{ detail.description }}</td> -->
          <td :class="{ lineThrough: detail.isComplete }">{{ detail.id }}</td>
          <td :class="{ lineThrough: detail.isComplete }">{{ detail.description }}</td>
          <td :class="detail.isComplete ? 'lineThrough' : ''">{{ detail.description }}</td>
          <td>
            <button @click="markAsComplete(detail.id)">Mark As Complete</button>
            <button @click="deleteTask(detail.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination-component :todoLength="todoDetails.length" @pageNo="updateTodoDetails" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PaginationComponent from './PaginationComponent.vue'

const userTask = ref(null)
const pageNumber = ref(1)

const todoDetails = ref([
  { id: 1, description: 'Work1', isComplete: false, createdAt: Date.now() },
  { id: 2, description: 'Work2', isComplete: false, createdAt: Date.now() },
  { id: 3, description: 'Work3', isComplete: false, createdAt: Date.now() },
  { id: 4, description: 'Work4', isComplete: false, createdAt: Date.now() },
  { id: 5, description: 'Work5', isComplete: false, createdAt: Date.now() },
  { id: 6, description: 'Work6', isComplete: false, createdAt: Date.now() },
  { id: 7, description: 'Work7', isComplete: false, createdAt: Date.now() },
  { id: 8, description: 'Work8', isComplete: false, createdAt: Date.now() },
  { id: 9, description: 'Work9', isComplete: false, createdAt: Date.now() },
  { id: 10, description: 'Work10', isComplete: false, createdAt: Date.now() },
  { id: 11, description: 'Work11', isComplete: false, createdAt: Date.now() },
  { id: 21, description: 'Work12', isComplete: false, createdAt: Date.now() },
  { id: 31, description: 'Work13', isComplete: false, createdAt: Date.now() },
  { id: 41, description: 'Work14', isComplete: false, createdAt: Date.now() },
  { id: 51, description: 'Work15', isComplete: false, createdAt: Date.now() },
  { id: 61, description: 'Work16', isComplete: false, createdAt: Date.now() },
  { id: 71, description: 'Work17', isComplete: false, createdAt: Date.now() },
  { id: 81, description: 'Work18', isComplete: false, createdAt: Date.now() },
  { id: 91, description: 'Work19', isComplete: false, createdAt: Date.now() },
  { id: 110, description: 'Work110', isComplete: false, createdAt: Date.now() },
  { id: 112, description: 'Work112', isComplete: false, createdAt: Date.now() },
  { id: 212, description: 'Work122', isComplete: false, createdAt: Date.now() },
  { id: 312, description: 'Work132', isComplete: false, createdAt: Date.now() },
  { id: 412, description: 'Work142', isComplete: false, createdAt: Date.now() },
  { id: 512, description: 'Work152', isComplete: false, createdAt: Date.now() },
  { id: 612, description: 'Work162', isComplete: false, createdAt: Date.now() },
  { id: 712, description: 'Work172', isComplete: false, createdAt: Date.now() },
  { id: 812, description: 'Work182', isComplete: false, createdAt: Date.now() },
  { id: 912, description: 'Work192', isComplete: false, createdAt: Date.now() },
  { id: 1120, description: 'Work1120', isComplete: false, createdAt: Date.now() },
  { id: 113, description: 'Work113', isComplete: false, createdAt: Date.now() },
  { id: 213, description: 'Work123', isComplete: false, createdAt: Date.now() },
  { id: 313, description: 'Work133', isComplete: false, createdAt: Date.now() },
  { id: 413, description: 'Work143', isComplete: false, createdAt: Date.now() },
  { id: 513, description: 'Work153', isComplete: false, createdAt: Date.now() },
  { id: 613, description: 'Work163', isComplete: false, createdAt: Date.now() },
  { id: 713, description: 'Work173', isComplete: false, createdAt: Date.now() },
  { id: 813, description: 'Work183', isComplete: false, createdAt: Date.now() },
  { id: 913, description: 'Work193', isComplete: false, createdAt: Date.now() },
  { id: 1130, description: 'Work1130', isComplete: false, createdAt: Date.now() },
  { id: 113, description: 'Work113', isComplete: false, createdAt: Date.now() },
  { id: 213, description: 'Work123', isComplete: false, createdAt: Date.now() },
  { id: 313, description: 'Work133', isComplete: false, createdAt: Date.now() },
  { id: 413, description: 'Work143', isComplete: false, createdAt: Date.now() },
  { id: 513, description: 'Work153', isComplete: false, createdAt: Date.now() },
  { id: 613, description: 'Work163', isComplete: false, createdAt: Date.now() },
  { id: 713, description: 'Work173', isComplete: false, createdAt: Date.now() },
  { id: 813, description: 'Work183', isComplete: false, createdAt: Date.now() },
  { id: 913, description: 'Work193', isComplete: false, createdAt: Date.now() },
  { id: 1130, description: 'Work1130', isComplete: false, createdAt: Date.now() },
  { id: 1134, description: 'Work1134', isComplete: false, createdAt: Date.now() },
  { id: 2134, description: 'Work1234', isComplete: false, createdAt: Date.now() },
  { id: 3134, description: 'Work1334', isComplete: false, createdAt: Date.now() },
  { id: 4134, description: 'Work1434', isComplete: false, createdAt: Date.now() },
  { id: 5134, description: 'Work1534', isComplete: false, createdAt: Date.now() },
  { id: 6134, description: 'Work1634', isComplete: false, createdAt: Date.now() },
  { id: 7134, description: 'Work1734', isComplete: false, createdAt: Date.now() },
  { id: 8134, description: 'Work1834', isComplete: false, createdAt: Date.now() },
  { id: 9134, description: 'Work1934', isComplete: false, createdAt: Date.now() },
  { id: 11340, description: 'Work11430', isComplete: false, createdAt: Date.now() },
  { id: 115, description: 'Work115', isComplete: false, createdAt: Date.now() },
  { id: 215, description: 'Work125', isComplete: false, createdAt: Date.now() },
  // { id: 315, description: 'Work135', isComplete: false, createdAt: Date.now() },
  // { id: 415, description: 'Work145', isComplete: false, createdAt: Date.now() },
  // { id: 515, description: 'Work155', isComplete: false, createdAt: Date.now() },
  // { id: 615, description: 'Work165', isComplete: false, createdAt: Date.now() },
  // { id: 715, description: 'Work175', isComplete: false, createdAt: Date.now() },
  // { id: 815, description: 'Work185', isComplete: false, createdAt: Date.now() },
  // { id: 915, description: 'Work195', isComplete: false, createdAt: Date.now() },
  // { id: 1150, description: 'Work1950', isComplete: false, createdAt: Date.now() },
])

const filteredTodoDetails = computed(
  () =>
    todoDetails.value
      .map((todo) => ({ ...todo }))
      .slice(5 * (pageNumber.value - 1), 5 * (pageNumber.value - 1) + 5)
      .sort((a, b) => b.createdAt - a.createdAt), // will not replace original Array
)

const markAsComplete = (detailId) => {
  const todoDetail = todoDetails.value.find((detail) => detail.id === detailId)
  todoDetail.isComplete = true
}

const deleteTask = (detailId) => {
  todoDetails.value = todoDetails.value.filter((detail) => detail.id !== detailId)
}

const addTask = () => {
  todoDetails.value.push({
    id: todoDetails.value.length + 1,
    description: userTask.value,
    isComplete: false,
    createdAt: Date.now(),
  })
  userTask.value = null
}

const updateTodoDetails = (pageNum) => {
  pageNumber.value = pageNum
}
</script>

<style scoped>
.lineThrough {
  text-decoration: line-through;
}
</style>
