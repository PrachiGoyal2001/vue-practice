<template>
  <div class="all-toasts">
    <div
      v-for="(toast, index) in allToasts"
      :key="`toast-${index}`"
      class="toast-container"
      :style="{
        'background-color': `${getBackgroundColor(toast)}`,
      }"
    >
      {{ toast.title }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { allToasts } from '@/composables/toast'

const debounceToast = () => {
  setTimeout(() => {
    allToasts.value.shift()
  }, 1000)
}

watch(
  () => allToasts.value.length,
  (newValue) => {
    if (newValue) debounceToast()
  },
)

const getBackgroundColor = (toast) => {
  if (toast.type === 'error') return '#e83737'
  if (toast.type === 'warning') return '#dcdc5d'
  return '#3cd43c'
}
</script>

<style scoped>
.all-toasts {
  position: fixed;
  left: 50%;
  transform: translate(-50%, -50%);
}
.toast-container {
  margin-top: 10px;
  padding: 10px;
  border-radius: 8px;
  color: black;
}
</style>
