<template>
  <div class="toast" :data-type="type" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
    <button class="toast-close" @click="onRemove(id)" v-if="isClosable">&times;</button>
    <div class="toast-content">
      <div class="toast-info">
        <img :src="NotificationTypes[type]" alt="" height="24" width="24" />
        <div class="toast-title-description">
          <span>{{ title }}</span>
          <span v-if="description">{{ description }}</span>
        </div>
      </div>
      <div class="toast-cta">
        <slot />
      </div>
    </div>
    <div class="toast-progress" :style="{ width: `${currentProgress}%` }"></div>
  </div>
</template>

<script setup>
import { getCurrentInstance, computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useToast } from './ToastService.js'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'info',
  },
  position: {
    type: String,
    default: 'top-right',
  },
  duration: {
    type: Number,
    default: 5000,
  },
  isClosable: {
    type: Boolean,
    default: false,
  },
})

const { onRemove } = useToast()

// const emit = defineEmits(['onRemove'])

const instance = getCurrentInstance()
const currentProgress = ref(100)
const pauseProgress = ref(false)
const NotificationTypes = {
  //   info: Info,
  //   danger: Alert,
  //   success: Success,
}

// Check if @custom-event or @customEvent was passed by the parent
// const hasCustomEventListener = computed(() => {
//   return !!instance?.vnode.props?.onRemove
// })

const handleMouseOver = () => {
  pauseProgress.value = true
}
const handleMouseLeave = () => {
  pauseProgress.value = false
}
let timer = null

onMounted(() => {
  timer = setInterval(() => {
    if (currentProgress.value <= 0) {
      onRemove(props.id)
      clearInterval(timer)
    }
    if (!pauseProgress.value) {
      const hunderthPart = props.duration / 100
      const percentToReduce = 100 / hunderthPart
      currentProgress.value = currentProgress.value - percentToReduce
    }
  }, 100)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style>
:root {
  --success: #4caf50;
  --danger: #f44336;
  --info: #2196f3;
  --success-bg: rgba(76, 175, 80, 0.1);
  --danger-bg: rgba(244, 67, 54, 0.1);
  --info-bg: rgba(150, 206, 243, 0.1);
}
.toast {
  width: 340px;
  border-radius: 6px;
  border: 2px solid var(--danger);
  background-color: var(--danger-bg);
  padding: 20px;
  position: relative;
  /* transition: transform 0.3s linear;
  animation: transformToast 0.2s linear; */
  /* Short way */
  /* @starting-style {
    transform: translateX(100%);
  } */
}
/* @keyframes transformToast {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
} */
.toast-close {
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 0;
  border: 0;
  background: transparent;
}
.toast-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 95%;
}
.toast-info {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
}
.toast-title-desc {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;
}
.toast-cta {
  max-width: 100px;
  max-height: 100px;
}
.toast-progress {
  height: 4px;
  width: 100%;
  position: absolute;
  bottom: 0;
  background: yellow;
  left: 0;
  border-radius: 6px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.toast[data-type='info'] {
  border-color: var(--info);
  background-color: var(--info-bg);
}
.toast[data-type='danger'] {
  border-color: var(--danger);
  background-color: var(--danger-bg);
}
.toast[data-type='success'] {
  border-color: var(--success);
  background-color: var(--success-bg);
}
/* .toast[data-position='top-right'] {
  top: 10px;
  right: 10px;
}
.toast[data-position='top-left'] {
  top: 10px;
  left: 10px;
}
.toast[data-position='bottom-right'] {
  bottom: 10px;
  right: 10px;
}
.toast[data-position='bottom-left'] {
  bottom: 10px;
  left: 10px;
} */
</style>
