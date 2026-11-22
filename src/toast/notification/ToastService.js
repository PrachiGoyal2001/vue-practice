import { ref } from 'vue'

let instance = null

const toast = () => {
  const toasts = ref([])
  const addNotification = ({ ...rest }) => {
    const obj = { ...rest, id: new Date().getTime() }
    toasts.value = [obj, ...toasts.value]
  }

  const onRemove = (id) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }
  return {
    toasts,
    addNotification,
    onRemove,
  }
}

export const useToast = () => {
  if (!instance) instance = toast()
  return instance
}
