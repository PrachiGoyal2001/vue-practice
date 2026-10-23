<template>
  <virtualized-list-component :data="data" v-slot="{ indexNo }">
    {{ indexNo }}
  </virtualized-list-component>
</template>

<script setup>
import VirtualizedListComponent from './components/VirtualizedListComponent2.vue'

const data = Array.from({ length: 100000 }, (_, index) => index)

console.log(data)
</script>

<style scoped></style>
