<template>
  <div class="accordian-container" ref="accordianRef">
    <div class="accordian-title-container" @click="toggleAccordian(true)">
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
import { onMounted, ref, useTemplateRef, getCurrentInstance } from 'vue'
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue'
import ChevronUp from 'vue-material-design-icons/ChevronUp.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
})

const isOpen = ref(false)
const accordianRef = useTemplateRef('accordianRef')

let instance = null

const toggleAccordian = (closeOthers) => {
  isOpen.value = !isOpen.value
  if (closeOthers) {
    closeOtherAccordians()
  }
}
const closeAccordian = () => {
  isOpen.value = false
}
/**
 * 1.) Find all other Accordian
 * 2.) Exclude Current Accordian
 * 3.) Loop through all Accordian
 * 4.) Trigger toogleAccordian function inside other Accordians
 */
const closeOtherAccordians = () => {
  const allAccordian = document.getElementsByClassName('accordian-container')
  for (const accordian of allAccordian) {
    if (instance != accordian.instanceId) {
      accordian.closeAccordian()
    }
  }
}
/*
const accordian = {
  open: false,
  toggle() {
    this.open = !this.open()
    this.closeOthers()
  },
  closeOthers() {
    accordian2.toggle()
  }
}

const accordian2 = {
  open: false,
  toggle() {
    this.open = !this.open
    this.closeOthers()
  },
  closeOthers() {
    accordian.toggle()
  }
}
*/

/*
accordian3
accordian4
accordian5
*/

onMounted(() => {
  accordianRef.value.closeAccordian = closeAccordian
  accordianRef.value.instanceId = instance = getCurrentInstance()?.uid
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
