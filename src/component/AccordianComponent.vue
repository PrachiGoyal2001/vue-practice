<template>
  <div class="accordian-container">
    <div class="accordian-title-container" @click="toggleAccordian" v-bind="$attrs">
      <div class="accordian-title">
        {{ title }}
        <ChevronUp v-if="isOpen" />
        <ChevronDown v-else />
      </div>
    </div>
    <div v-if="isOpen" class="accordian-content">
      <slot :lclContent="{ isOpen }" />
    </div>
  </div>
</template>

<script setup>
import { ref, useAttrs } from 'vue'
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue'
import ChevronUp from 'vue-material-design-icons/ChevronUp.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
})

const isOpen = ref(false)

const toggleAccordian = () => {
  isOpen.value = !isOpen.value
}

defineOptions({
  inheritAttrs: false,
})

defineExpose({
  isOpen,
  toggleAccordian,
})
</script>

<style scoped>
.accordian-container {
  width: 50%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 2px solid rgb(171, 159, 159);
  border-radius: 10px;
}
.accordian-title-container {
  border-radius: 10px;
  border: 2px solid rgb(236, 227, 227);
  padding: 5px;
}
.accordian-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
