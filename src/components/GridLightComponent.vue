<template>
  <div class="grid-light-container">
    <div v-for="(row, rowIndex) in config" :key="`row${rowIndex}`" class="flex-container">
      <button
        v-for="(column, columnIndex) in row"
        :key="`row${rowIndex}column${columnIndex}`"
        class="flex"
        @click="updateOrder(rowIndex, columnIndex, column)"
        :class="{ active: order.includes(`${rowIndex}${columnIndex}`), 'border-0': !column }"
        :aria-label="`label${rowIndex + 1}${columnIndex + 1}`"
      >
        {{ column }}
      </button>
    </div>
    {{ order }} and {{ isTimerRunning }}
    <!-- Use aria-label in button for Accessbility. For Accessibility in Div there is different Rule -->
  </div>
</template>

<script setup>
import { ref } from 'vue'

const config = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
]

const order = ref([]) //Instead of Array use Object as for finding clickable div present in order Array we need
// to use includes which take O(n) time. But even using Object , insertion order is not guranteed So we will use Map as in
// map insetion order remain preserved.

const totalGrid = 8
const isTimerRunning = ref(false)

const updateOrder = (rowIndex, columnIndex, columnValue) => {
  if (!columnValue || isTimerRunning.value) return
  if (order.value.includes(`${rowIndex}${columnIndex}`)) return
  order.value.push(`${rowIndex}${columnIndex}`)
  if (order.value.length === totalGrid) {
    for (let i = 1; i <= totalGrid; i++) {
      isTimerRunning.value = true
      setTimeout(() => {
        order.value.pop()
        if (i === totalGrid) {
          console.log('here')
          isTimerRunning.value = false
        }
      }, 300 * i)
    }
  }
}
</script>

<style scoped>
.grid-light-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.flex-container {
  display: flex;
  gap: 10px;
}
.flex {
  width: 100px;
  height: 100px;
  border: 2px solid black;
  cursor: pointer;
  background: transparent;
}
.active {
  background: blue;
}
.border-0 {
  border-width: 0px;
}
</style>
