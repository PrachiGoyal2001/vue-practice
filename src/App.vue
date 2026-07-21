<script setup>
import { ref } from 'vue'
import axios from 'axios'
import ProgressBarComponent from './components/ProgressBarComponent.vue'
import CircularBarComponent from './components/CircularBarComponent.vue'

const progessCompleted = ref(0)

const getBytes = () => {
  axios.get('https://httpbin.org/bytes/5000000', {
    responseType: 'blob',
    onDownloadProgress: (progressEvent) => {
      progessCompleted.value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
    },
  })
}

getBytes()
</script>

<template>
  <div>
    <ProgressBarComponent :percentage="progessCompleted" />
    <CircularBarComponent :percentage="progessCompleted" />
  </div>
</template>

<style scoped></style>
