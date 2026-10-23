<!--Frontend Master way to make Virtualized List-->

<template>
  <div
    class="infinite-scroll-container"
    :style="{ height: `${LIST_SCROLL_HEIGHT}px` }"
    @scroll="handleScroll"
  >
    <div :style="{ height: `${data.length * ROW_HEIGHT}px` }">
      <div :style="{ transform: `translateY(${startIndex * ROW_HEIGHT}px)` }">
        <div
          v-for="i in data.slice(startIndex, startIndex + renderedRowCount)"
          :key="i"
          :style="{ height: `${ROW_HEIGHT}px` }"
          class="row"
        >
          <slot :indexNo="i" />
        </div>
      </div>
    </div>
  </div>
  <div>s:{{ startIndex }} r:{{ renderedRowCount }} scrollTop:{{ scrollTop }}</div>
</template>

<script setup>
import { ref, computed } from 'vue'

const LIST_SCROLL_HEIGHT = 400
const ROW_HEIGHT = 52
const OVERSCAN_COUNT = 10

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})

const scrollTop = ref(0)

//Use scrollTop to find startIndex
//In startIndex, To get rid of decimal Value use Math.floor and scrollTop can also go in negative, for that situation use 0[check scenario for negative scrollTop]
const startIndex = computed(() =>
  Math.max(Math.floor(scrollTop.value / ROW_HEIGHT) - OVERSCAN_COUNT, 0),
)

//Understand in which scenario this will be used
const renderedRowCount = computed(() => {
  let totalCount = Math.floor(LIST_SCROLL_HEIGHT / ROW_HEIGHT) + 2 * OVERSCAN_COUNT
  return Math.min(props.data.length - startIndex.value, totalCount)
})

const handleScroll = (event) => {
  scrollTop.value = event.target.scrollTop
}
</script>

<style scoped>
.infinite-scroll-container {
  overflow-y: auto;
  overflow-x: hidden;
  width: 400px;
  border: 2px solid lightseagreen;
  border-radius: 4px;
}
.row {
  border: 1px solid black;
  background-color: azure;
  width: 100%;
  color: #333;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding-inline: 20px;
  cursor: pointer;
  /* transition: background-color 0.2s linear; */
}
</style>

// Disadvantages of VirtualizedListComponent // 1.) Search is not Possible
