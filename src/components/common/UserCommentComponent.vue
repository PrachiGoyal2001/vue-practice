<template>
  <div class="user-comment-container">
    <input
      v-model="modelValue"
      :placeholder="type"
      @keydown.enter="saveComment"
      @focus="$emit('onFocus')"
    />
    <div class="comment-buttons" v-if="showActionButtons">
      <button @click="saveComment">{{ props.type }}</button>
      <button @click="cancelComment">Cancel</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const modelValue = defineModel()

const props = defineProps({
  type: {
    type: String,
    default: '',
  },
  showActionButtons: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['saveComment', 'cancelComment', 'onFocus'])

const saveComment = () => {
  emit('saveComment', modelValue.value)
}
const cancelComment = () => {
  emit('cancelComment')
}
</script>

<style scoped>
.user-comment-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.comment-buttons {
  justify-self: flex-end;
}
</style>
