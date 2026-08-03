<template>
  <div class="pagination-container">
    <div
      v-for="i in pageArr"
      :key="`page${i}`"
      :class="{ 'page-number': i != '...' }"
      @click="emitPageNumber(i)"
    >
      {{ i }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const emit = defineEmits(['pageNo'])
// const pageArr= ref([]);
const updatedPageNumber = ref(null)

const pageArr = computed(() => {
  const totalPages = Math.ceil(props.todoLength / 5)
  const current = updatedPageNumber.value
  const pages = []

  function addRange(arr, start, end) {
    for (let i = start; i <= end; i++) {
      arr.push(i)
    }
  }

  // Case 1: Show all pages if there are 5 or fewer pages
  if (totalPages <= 5) {
    addRange(pages, 1, totalPages)
  }

  // Case 2: Current page is near the beginning
  else if (current <= 3) {
    addRange(pages, 1, 4)
    pages.push('...')
    pages.push(totalPages)
  }

  // Case 3: Current page is near the end
  else if (current >= totalPages - 2) {
    pages.push(1)
    pages.push('...')
    addRange(pages, totalPages - 3, totalPages)
  }

  // Case 4: Current page is in the middle
  else {
    pages.push(1)
    pages.push('...')
    addRange(pages, current - 1, current + 1)
    pages.push('...')
    pages.push(totalPages)
  }

  return pages
})

// const pageArr = computed(() => {
//   const totalPages = Math.ceil(props.todoLength / 5)
//   const current = updatedPageNumber.value
//   const pages = []

//   // Helper to add a range of page numbers
//   function addRange(arr, start, end) {
//     for (let i = start; i <= end; i++) {
//       arr.push(i)
//     }
//   }

//   // Case 1: Total pages <= 5
//   if (totalPages <= 7) {
//     addRange(pages, 1, totalPages)
//   }

//   // Case 2: Current page is near the beginning
//   else if (current <= 4) {
//     addRange(pages, 1, 5)
//     pages.push('...')
//     pages.push(totalPages)
//   }

//   // Case 3: Current page is near the end
//   else if (current >= totalPages - 3) {
//     pages.push(1)
//     pages.push('...')
//     addRange(pages, totalPages - 4, totalPages)
//   }

//   // Case 4: Current page is in the middle
//   else {
//     pages.push(1)
//     pages.push('...')
//     addRange(pages, current - 1, current + 1)
//     pages.push('...')
//     pages.push(totalPages)
//   }

//   return pages
//   // const arrLength = Math.ceil(props.todoLength / 5)
//   // if (arrLength <= 5) return arrLength
//   // let arr = []
//   // arr.push(1)
//   // if (updatedPageNumber.value > 3) {
//   //   // updatedPageNumber.value > 3
//   //   arr.push('...')
//   // }
//   // let start = updatedPageNumber.value - 1 > 1 ? updatedPageNumber.value - 1 : 2
//   // let end = start + 2 >= arrLength ? arrLength - 1 : start + 2
//   // for (var i = start; i <= end; i++) {
//   //   arr.push(i)
//   // }
//   // if (arrLength - arr[arr.length - 1] - 1 >= 1) {
//   //   arr.push('...')
//   // }
//   // arr.push(arrLength)
//   // return arr
// })

const emitPageNumber = (pageNumber) => {
  console.log(pageNumber, 'in compoent')
  if (pageNumber != '...') {
    updatedPageNumber.value = pageNumber
    emit('pageNo', pageNumber)
  }
}

const props = defineProps({
  todoLength: {
    type: Number,
    required: true,
  },
})
</script>

<style scoped>
.pagination-container {
  display: flex;
  gap: 10px;
}
.page-number {
  width: 20px;
  height: 20px;
  border: 2px solid green;
  border-radius: 100%;
  display: flex;
  justify-content: center;
}
</style>
