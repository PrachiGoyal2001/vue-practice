<template>
  <div v-if="!data.length">No sortable List</div>
  <div class="box">
    <div class="sortable-list-x">
      <div
        v-for="(d, index) in data"
        :key="d"
        :draggable="true"
        :class="[
          rowClass,
          {
            grabbing: index === startIndex,
            active: activeRow === index,
            [`draggable-${dragDirection}`]: index === swapIndex,
            bubble: index === dropIndex,
          },
        ]"
        @click="activeRow = index"
        @dragstart="startDrag($event, index)"
        @dragend="reset"
        @dragover="dragOverElement($event, index)"
        @drop="onDrop($event)"
      >
        {{ d }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const rowClass = 'row-x'

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})

const data = ref(props.list)

const activeRow = ref(null)
const startIndex = ref(-1)
const swapIndex = ref(-1)
const dropIndex = ref(-1)
const dragDirection = ref(null)

const reset = () => {
  startIndex.value = -1
  swapIndex.value = -1
}

const dragOverElement = (event, index) => {
  event.preventDefault()
  const rect = event.currentTarget.getBoundingClientRect()
  console.log(rect)
  const midPoint = rect.top + rect.height / 2
  console.log(event.clientY)
  if (event.clientY < midPoint) {
    dragDirection.value = 'top'
  } else {
    dragDirection.value = 'bottom'
  }
  swapIndex.value = index
}

const onDrop = (event) => {
  event.preventDefault()
  const newArray = [...data.value]
  let factor = 0
  if (swapIndex.value === startIndex.value) {
    factor = 0
  } else if (swapIndex.value < startIndex.value) {
    factor = dragDirection.value === 'top' ? 0 : 1
  } else {
    factor = dragDirection.value === 'top' ? 1 : 0
  }
  const dropToIndex =
    swapIndex.value <= startIndex.value ? swapIndex.value + factor : swapIndex.value - factor
  data.value = swapArrayElements(newArray, startIndex.value, dropToIndex)

  dropIndex.value = dropToIndex

  setTimeout(() => {
    dropIndex.value = -1
  }, 2000)
  reset()
}

const swapArrayElements = (arr, currentIndex, swapIndex) => {
  if (currentIndex >= arr.length || swapIndex >= arr.length || currentIndex < 0 || swapIndex < 0) {
    console.log('Invalid Indices')
    return arr
  }
  const newArr = [...arr]
  const [element] = newArr.splice(currentIndex, 1)
  newArr.splice(swapIndex, 0, element)
  return newArr
}

const startDrag = (event, index) => {
  startIndex.value = index
  const original = event.currentTarget
  event.dataTransfer.effectAllowed = 'copy'
  const dragImage = original.cloneNode(true)
  dragImage.style.position = 'absolute'
  dragImage.style.pointerEvents = 'none'
  dragImage.style.opacity = '0.8'
  dragImage.style.transform = 'scale(1.2)'
  dragImage.style.backgroundColor = 'red'
  dragImage.style.width = '200px'
  //Postiton it off screen
  dragImage.style.top = '-1000px'
  dragImage.style.left = '-1000px'
  //Append to the body
  document.body.appendChild(dragImage)

  //set as drag Image
  event.dataTransfer.setDragImage(dragImage, 100, 0) //0,0 are the x and y coordinates which
  //is used to change the positioning of cursor pointer w.r.t to preview

  //Remove it after the drag starts
  setTimeout(() => {
    document.body.removeChild(dragImage)
  }, 0)
}
</script>

<style scoped>
.sortable-list-x {
  height: 70vh;
  overflow: auto;
  width: 42vw;
  margin-inline: auto;
  margin-top: 50px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
}
.row-x {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  height: 42px;
  border-bottom: 1px solid #e6e6e6;
  background-color: #fff;
  transition: background-color 0.2s ease;
  color: #333;
}
.row-x.active {
  cursor: grabbing;
}
.grabbing {
  background: lightsalmon;
}
.drop-zone {
  background: blue;
}
.draggable-top {
  border: 2px solid #4caf50;
}
.draggable-bottom {
  border: 2px solid #af4c95;
}
.bubble {
  animation: bu 0.3s linear infinite;
}
@keyframes bu {
  from {
    background: red;
  }
  to {
    background: lightgreen;
  }
}
</style>
