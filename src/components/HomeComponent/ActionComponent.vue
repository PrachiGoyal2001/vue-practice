<template>
  <div class="action-container" @mouseover="showDropdown = true" @mouseleave="showDropdown = false">
    <slot name="button" />
    <ChevronUp class="chevron-up icon" />
    <div class="dropdown-options" v-if="showDropdown">
      <slot name="options" />
      <div v-for="(option, index) in options" :key="`option${index}`" class="option">
        <component :is="option.icon" class="icon" />
        <div>{{ option.name }}</div>
      </div>
    </div>
    <div
      class="tooltip-outer-container tooltip-container-animation"
      ref="tooltipEl"
      v-if="tooltipLabel && showLoginToolTip"
    >
      <div class="tooltip-triangle"></div>
      <div class="tooltip-container">
        {{ tooltipLabel }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, useTemplateRef, onMounted, onBeforeUnmount } from 'vue'
import ChevronUp from 'vue-material-design-icons/ChevronUp.vue'

const maxIterations = 4

const showDropdown = ref(false)
const showLoginToolTip = ref(true)
const iterations = ref(1)
const tooltipElRef = useTemplateRef('tooltipEl')

defineProps({
  options: {
    type: Array,
    default: [],
  },
  tooltipLabel: {
    type: String,
    default: '',
    required: false,
  },
})

const shakeLoginTooltip = () => {
  if (iterations.value === maxIterations) {
    showLoginToolTip.value = false
  }
  if (iterations.value < maxIterations) {
    tooltipElRef.value?.classList.remove('tooltip-container-animation')

    setTimeout(() => {
      tooltipElRef.value?.classList.add('tooltip-container-animation')
      iterations.value++
    }, 3000)
  }
}

onMounted(() => {
  window.addEventListener('animationend', shakeLoginTooltip)
})

onBeforeUnmount(() => {
  window.addEventListener('animationend', shakeLoginTooltip)
})
</script>

<style scoped>
.action-container {
  display: flex;
  gap: 8px;
  position: relative;
  cursor: pointer;
  height: 100%;
}
.chevron-up {
  color: rgb(100, 95, 95);
}
:deep(.chevron-up svg) {
  transition: transform 0.3s ease;
}
.action-container:hover :deep(.chevron-up svg) {
  transform: rotate(180deg);
}
.dropdown-options {
  position: absolute;
  padding: 20px;
  border-radius: 16px;
  border: 2px solid rgb(199, 190, 190);
  top: 40px;
  z-index: 9999;
  background: #fff;
  right: 0;
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.option {
  display: flex;
  gap: 15px;
  align-items: center;
  padding: 8px 10px;
  border-radius: 10px;
}
.option:hover {
  background: linear-gradient(to right, #e5f4ff, #deefff, #fff);
}
:deep(.icon svg) {
  width: 20px;
  height: 20px;
}
.tooltip-outer-container {
  position: absolute;
  top: 100%;
  z-index: 99999;
}
.tooltip-container-animation {
  animation: tooltipAnimation 0.5s ease-in-out;
}
@keyframes tooltipAnimation {
  0% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(4px);
  }
  40% {
    transform: translateX(-4px);
  }
  60% {
    transform: translateX(4px);
  }
  80% {
    transform: translateX(-4px);
  }
  100% {
    transform: translateX(0);
  }
}
.tooltip-triangle {
  width: 10px;
  height: 5px;
  clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
  background: blue;
  margin-bottom: -1px;
  margin-left: 50px;
}
.tooltip-container {
  position: absolute;
  padding: 15px 0px;
  color: white;
  background: blue;
  left: -20px;
  width: 150px;
  text-align: center;
  font-size: 20px;
  border-radius: 2px;
}
</style>
