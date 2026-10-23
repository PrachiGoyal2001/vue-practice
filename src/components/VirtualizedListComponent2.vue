<!--My way to make Virtualized List-->

<template>
  <div
    class="virtualized-list-container"
    :style="{ height: `${VIRTUALIZED_LIST_HEIGHT}px` }"
    @scroll="handleScrollTop"
  >
    <div :style="{ height: `${data.length * ROW_HEIGHT}px` }">
      <div :style="{ transform: `translateY(${startIndex * ROW_HEIGHT}px)` }">
        <div
          v-for="i in data.slice(startIndex, startIndex + renderedRowCount)"
          :key="i"
          class="row"
          :style="{ height: `${ROW_HEIGHT}px` }"
        >
          <slot :indexNo="i" />
        </div>
      </div>
    </div>
  </div>
  s: {{ startIndex }} and renderedRowCount:{{ renderedRowCount }}
</template>

<script setup>
import { computed, ref } from 'vue'

const VIRTUALIZED_LIST_HEIGHT = 400
const ROW_HEIGHT = 52
const OVERSCAN_COUNT = 10

const scrollTop = ref(0)

const startIndex = computed(() => {
  console.log(Math.floor(scrollTop.value / ROW_HEIGHT))
  return Math.floor(scrollTop.value / ROW_HEIGHT)
})

const renderedRowCount = computed(() => {
  const total = Math.floor(VIRTUALIZED_LIST_HEIGHT / ROW_HEIGHT) + OVERSCAN_COUNT
  return total
})

const handleScrollTop = (event) => {
  scrollTop.value = event.target.scrollTop
}

defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})
</script>

<style scoped>
.virtualized-list-container {
  border: 2px solid seagreen;
  border-radius: 10px;
  overflow-y: auto;
  width: 400px;
  margin-top: 100px;
}
.row {
  border-bottom: 2px solid forestgreen;
  background: lavender;
  width: 100%;
}
</style>
