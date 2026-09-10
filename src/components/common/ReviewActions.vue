<template>
  <div class="dropdown-container" v-click-outside>
    <DotsVertical class="three-dots-icon" @click="showOptions = !showOptions" />
    <div class="dropdown-option" v-if="showOptions">
      <div v-for="option in options" :key="option" @click="selectedOption(option)">
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, useTemplateRef } from 'vue'
import DotsVertical from 'vue-material-design-icons/DotsVertical.vue'

defineProps({
  options: {
    type: Array,
    default: () => [],
    required: true,
  },
})

const emit = defineEmits(['selectedOption'])

const vClickOutside = {
  mounted: (el) => {
    window.addEventListener('click', (event) => {
      if (!el.contains(event.target)) showOptions.value = false
    })
  },
  beforeUnmount: (el) => {
    window.removeEventListener('click', (event) => {
      if (!el.contains(event.target)) showOptions.value = false
    })
  },
}

const showOptions = ref(false)

const selectedOption = (option) => {
  emit('selectedOption', option)
  showOptions.value = !showOptions.value
}
</script>

<style scoped>
.three-dots-icon {
  cursor: pointer;
}
.dropdown-container {
  position: relative;
}
.dropdown-option {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 2px solid black;
  right: 0;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
}
</style>
