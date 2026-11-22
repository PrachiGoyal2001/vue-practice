<template>
  <div class="toast-container" :data-position="position">
    <TransitionGroup name="list">
      <NotificationComponent
        v-for="toast in toasts"
        :key="toast.id"
        class="toast-position"
        v-bind="toast"
      />
    </TransitionGroup>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue'
import NotificationComponent from './NotificationComponent.vue'
import { useToast } from './ToastService.js'

const { toasts } = useToast()

const position = ref(toasts.value[0]?.position)

watch(
  () => toasts.value[0]?.position,
  (newPosition) => {
    if (newPosition) {
      position.value = newPosition
    }
  },
)
</script>

<style scoped>
.toast-container {
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.toast-container[data-position='top-right'] {
  top: 10px;
  right: 10px;
}
.toast-container[data-position='top-left'] {
  top: 10px;
  left: 10px;
}
.toast-container[data-position='bottom-right'] {
  bottom: 10px;
  right: 10px;
}
.toast-container[data-position='bottom-left'] {
  bottom: 10px;
  left: 10px;
}
.list-enter-from,
.list-leave-to {
  transform: translateX(100%);
}
.list-move,
.list-enter-active,
.list-leave-active {
  transition: transform 0.4s ease;
}
</style>
