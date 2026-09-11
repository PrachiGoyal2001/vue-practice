<template>
  <div></div>
</template>

<script setup>
defineProps({
  activeTab: {
    type: String,
    required: true,
  },
  formDetail: {
    type: Object,
    required: true,
    default: () => {},
  },
})
</script>

<style scoped></style>
