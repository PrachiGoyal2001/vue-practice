<script setup>
import { ref } from 'vue'
import AutocompleteComponent from './components/AutoCompleteComponent.vue'
import { products } from './product.json'

const options = ref(products)

const userInput = ref('')

const userSelectedResult = (uResult) => {
  console.log('userSelectedValue', uResult)
}

const userInputValue = (uInput) => {
  console.log('userInputValue', uInput)
  userInput.value = uInput
}
</script>

<template>
  <div>
    <AutocompleteComponent
      :options="options"
      v-model="userInput"
      label="title"
      @onchange="userInputValue"
      @onSelect="userSelectedResult"
      placeholder="Select products...."
    />
  </div>
</template>

<style scoped>
a:hover {
  color: yellow;
}
a:link {
  color: red;
}
a:visited {
  color: green;
}
a:active {
  color: pink;
}
</style>
