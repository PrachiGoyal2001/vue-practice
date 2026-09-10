<template>
  <div class="otp-wrapper">
    <div v-for="(i, index) in otpLength" :key="`input${index}`">
      <input
        type="text"
        maxlength="1"
        ref="allInputs"
        @input="userInputValue($event, index)"
        @keydown.delete="deleteuserInput($event, index)"
        @paste.prevent="copyOtpInput($event, index)"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, useTemplateRef } from 'vue'

const props = defineProps({
  otpLength: {
    type: Number,
    default: 4,
  },
})

const allInputs = useTemplateRef('allInputs')

const userInputValue = (event, index) => {
  if (!/\d/.test(event.target.value)) {
    //If not a number, then set value as null
    event.target.value = null
  } else {
    allInputs.value[index].value = event.target.value
    if (index !== props.otpLength - 1) {
      // when input ref is not last Element
      allInputs.value[index + 1].focus()
    }
    checkAllValuesFilled()
  }
}

const deleteuserInput = (event, index) => {
  if (event.target.value) {
    allInputs.value[index].value = null
    return
  }
  if (index > 0) {
    allInputs.value[index - 1].value = null
    allInputs.value[index - 1].focus()
  }
}

const onChangeOtp = () => {
  let result = ''
  allInputs.value.forEach((input) => {
    result = result + input.value
  })
  console.log('result', result)
}

const checkAllValuesFilled = () => {
  let isAllInputFilled = true
  allInputs.value.forEach((input) => {
    if (!/\d/.test(input.value)) {
      isAllInputFilled = false
      return
    }
  })
  if (isAllInputFilled) onChangeOtp()
}

const copyOtpInput = (event, index) => {
  let pastedText = event.clipboardData.getData('text').split('')
  let startIndex = index
  pastedText.forEach((text) => {
    if (!/\d/.test(text)) return
    let idExists = allInputs.value[startIndex]
    if (!idExists) return
    allInputs.value[startIndex].value = text
    startIndex++
  })
  if (startIndex === props.otpLength) {
    allInputs.value[startIndex - 1].focus()
  } else {
    allInputs.value[startIndex].focus()
  }
  checkAllValuesFilled()
}
</script>

<style scoped>
.otp-wrapper {
  display: flex;
  gap: 10px;
}
input {
  width: 30px;
  height: 30px;
  text-align: center;
}
</style>

<!--<template>
  <div class="otp-wrapper">
    <input
      v-for="(i, index) in otpLength"
      :key="`input${index}`"
      type="text"
      maxlength="1"
      ref="inputs"
    />
  </div>
</template>

<script setup>
import { onMounted, reactive, useTemplateRef } from 'vue'

const props = defineProps({
  otpLength: {
    type: Number,
    default: 4,
  },
})

const userInput = reactive({})
const allInputs = useTemplateRef('inputs')

onMounted(() => {
  allInputs.value.forEach((input, index) => {
    input.addEventListener('input', (event) => {
      if (event.target.value.length > 0 && index < allInputs.value.length - 1) {
        allInputs.value[index + 1].focus()
      }
    })
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace') {
        if (event.target.value === '') {
          allInputs.value[index - 1].value = ''
        } else {
          event.target.value = ''
        }
        if (index > 0) allInputs.value[index - 1].focus()
      }
    })
    input.addEventListener('paste', (event) => {
      event.preventDefault()
      const text = event.clipboardData.getData('text')
      console.log('paste', text)
      for (var i = 0; i < text.length; i++) {
        allInputs.value[index + i].value = text[i]
        if (allInputs.value[index + i + 1]) allInputs.value[index + i + 1].focus()
        console.log(i, 'allInputs', index)
      }
      console.log(allInputs.value)
    })
  })
})
</script>

<style scoped>
.otp-wrapper {
  display: flex;
  gap: 10px;
}
input {
  width: 30px;
  height: 30px;
  text-align: center;
}
</style> -->
