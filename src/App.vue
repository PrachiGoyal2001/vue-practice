<script setup>
import ToastContainer from './toast/notification/ToastContainer.vue'
import { useToast } from './toast/notification/ToastService'

const { addNotification } = useToast()

const showToast = () => {
  addNotification({ title: 'vhjerdsd', position: 'top-right', isClosable: true })
}
</script>

<template>
  <ToastContainer />
  <button @click="showToast">Show Toast</button>
</template>

<style scoped></style>
