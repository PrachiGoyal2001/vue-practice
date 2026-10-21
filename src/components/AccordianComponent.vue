<template>
  <div
    class="accordian-container"
    :class="{ 'accordian-container-height': isAccordianOpen }"
    ref="accordianContainerRef"
    :id="getId"
  >
    <div class="accordian-title" @click="toggleAccordian" ref="accordianTitleRef">
      <div>
        {{ accordianDetails.title }}
      </div>
      <ChevronUp v-if="isAccordianOpen" />
      <ChevronDown v-else />
    </div>
    <div class="accordian-content" ref="accordianContentRef">
      {{ accordianDetails.content }}
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, nextTick, onMounted, ref, useTemplateRef, watch } from 'vue'
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue'
import ChevronUp from 'vue-material-design-icons/ChevronUp.vue'

const props = defineProps({
  accordianDetails: {
    type: Object,
    default: () => {},
  },
})

const isAccordianOpen = ref(false)
const accordianContainerRef = useTemplateRef('accordianContainerRef')
const accordianTitleRef = useTemplateRef('accordianTitleRef')
const accordianContentRef = useTemplateRef('accordianContentRef')
const getId = getCurrentInstance()?.uid

const toggleAccordian = () => {
  if (!isAccordianOpen.value) {
    isAccordianOpen.value = true
    // nextTick(() => {
    accordianContainerRef.value.style.height = `${accordianTitleRef.value.offsetHeight + accordianContentRef.value.offsetHeight}px`
    closeOtherAccordian()
    // })
  } else {
    accordianContainerRef.value.style.height = `${accordianTitleRef.value.offsetHeight}px`
    isAccordianOpen.value = false
  }
}

const closeOtherAccordian = () => {
  const allAccordians = document.getElementsByClassName('accordian-container') //check can it be done using Ref
  for (const accordian of allAccordians) {
    if (Number(accordian.getAttribute('id')) !== getId) {
      const accordianTitle = accordian.getElementsByClassName('accordian-title')[0]
      accordian.style.height = `${accordianTitle.offsetHeight}px`
      accordian.closeAccordian()
    }
  }
}

const closeAccordian = () => {
  isAccordianOpen.value = false
}

onMounted(() => {
  accordianContainerRef.value.style.height = `${accordianTitleRef.value.offsetHeight}px`
  accordianContainerRef.value.closeAccordian = closeAccordian
})
</script>

<style scoped>
.accordian-container {
  overflow: hidden;
  border: 2px solid rgb(219, 211, 211);
  border-radius: 10px;
  transition: height 0.5s ease-in-out;
}
.accordian-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;
}
.accordian-title:hover {
  background: rgb(206, 202, 202);
}
.accordian-content {
  padding: 10px 15px;
  border-top: 0;
}
</style>
