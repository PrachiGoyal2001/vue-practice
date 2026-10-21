<script setup>
import AccordianComponent from './components/AccordianComponent.vue'
import { ref } from 'vue'

const accordianDetails = [
  {
    id: 1,
    title: 'Item1',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 2,
    title: 'Item2',
    content:
      'Lorem2 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 3,
    title: 'Item3',
    content:
      'Lorem3 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
]
</script>

<template>
  <AccordianComponent
    v-for="detail in accordianDetails"
    :key="detail.id"
    :accordianDetails="detail"
    class="mb-2"
  />
</template>

<style scoped>
.mb-2 {
  margin-bottom: 10px;
}
</style>
