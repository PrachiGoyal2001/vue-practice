<template>
  <div class="input-container" @paste="pasteOtp($event)">
    <input
      type="text"
      v-for="(i, index) in otpLength"
      :key="i"
      :id="i"
      ref="userInputRef"
      v-model="userInput[index]"
      maxlength="1"
      @input="isUserInputNumber($event, index)"
      @keydown.delete="moveToPrevInput($event, index)"
    />
  </div>
  {{ userInput }}
</template>

<script setup>
import { onMounted, ref, useTemplateRef } from 'vue'

const otpLength = 4
const userInput = ref([])
const userInputRef = useTemplateRef('userInputRef')

const moveToPrevInput = (event, index) => {
  if (!event.target.value && index > 0) {
    userInput.value[index - 1] = ''
    userInputRef.value[index - 1].focus()
  }
}

const onChangeOtp = () => {
  console.log('opt Entered', userInput.value.join(''))
}

const moveFocusToNextInput = (index) => {
  if (index < otpLength - 1) {
    userInputRef.value[index + 1].focus()
  } else if (index === otpLength - 1) {
    userInputRef.value[index].focus()
  }
  const totalInputFieldsFilled = userInput.value.filter((x) => /^\d$/.test(x))
  if (totalInputFieldsFilled.length === otpLength) {
    onChangeOtp()
  }
}

const isUserInputNumber = (event, index) => {
  if (!/^\d$/.test(event.target.value)) {
    userInput.value[index] = ''
    return
  }
  moveFocusToNextInput(index)
}

const pasteOtp = (event) => {
  event.preventDefault()
  const pasteOtp = event.clipboardData.getData('text/plain')
  const filteredOtp = Array.from(pasteOtp)
    .filter((x) => /^\d$/.test(x))
    .slice(0, 4)
  filteredOtp.forEach((otp, index) => {
    userInput.value[index] = otp
  })
  if (filteredOtp.length > 0) {
    moveFocusToNextInput(filteredOtp.length - 1)
  }
}
</script>

<style scoped>
.input-container {
  display: flex;
  gap: 10px;
  width: 100%;
  height: 100%;
}
input {
}
</style>
