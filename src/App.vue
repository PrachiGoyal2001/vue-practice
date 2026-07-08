<script setup>
import { onMounted, useTemplateRef } from 'vue'
import AccordianComponent from './component/AccordianComponent.vue'

const accordianDetails = [
  {
    title: 'Javascript Basics',
    content: 'Learn variables, functions in javascript',
  },
  {
    title: 'React.js Overview',
    content: 'Understand component, props in React.js',
  },
  {
    title: 'Node.js',
    content: 'Basics of Server-development is required',
  },
  {
    title: 'Full Stack Development',
    content: 'Buid full-stack using React.js and Node.js',
  },
]
</script>

<template>
  <AccordianComponent
    :title="title"
    v-for="({ title, content }, index) in accordianDetails"
    :key="index"
  >
    <template #default>
      {{ content }}
    </template>
  </AccordianComponent>
</template>

<style scoped>
.accordian-content {
  padding: 5x;
}
</style>
