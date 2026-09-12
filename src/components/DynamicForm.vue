<template>
  <div>
    <div v-for="(field, key, index) in activeFormField" :key="`${field}${index}`">
      <div v-if="field.type === 'text'">
        <label :for="field.label">{{ field.label }} </label>
        <input
          type="text"
          v-model="field.value"
          :placeholder="field.placeholder"
          :id="field.label"
        />
      </div>
      <div v-if="field.type === 'number'">
        <label :for="field.label">{{ field.label }} </label>
        <input
          type="number"
          v-model="field.value"
          :placeholder="field.placeholder"
          :id="field.label"
        />
      </div>
      <div v-if="field.type === 'radio'">
        {{ field.label }}
        <div v-for="(option, index) in field.options" :key="`${option}${index}`">
          <input
            type="radio"
            :id="option"
            :name="field.label"
            :value="option"
            v-model="field.value"
          />
          <label :for="option"> {{ option }} </label>
        </div>
      </div>
      <div v-if="field.type === 'checkbox'">
        {{ field.label }}
        <div v-for="(option, index) in field.options" :key="`${option.value}${index}`">
          <input
            type="checkbox"
            :id="option.value"
            :name="field.label"
            :value="option.value"
            v-model="field.value"
          />
          <label :for="option.value"> {{ option.label }} </label>
        </div>
      </div>
      <div v-if="field.type === 'select'">
        {{ field.label }}
        <select v-model="field.value">
          <option v-for="option in field.options" :key="option.value" :value="option.value">
            {{ option.value }}
          </option>
        </select>
      </div>
      <div class="error-message" v-if="isValidate">
        {{ field.validator() }}
      </div>
    </div>
    <button
      v-if="activeTab === Object.keys(formDetail)[Object.keys(formDetail).length - 1]"
      @click="submitForm"
    >
      Submit
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  activeTab: {
    type: String,
    required: true,
  },
  formDetail: {
    type: Object,
    required: true,
    default: () => {},
  },
})

const formFields = ref(props.formDetail)
const isValidate = ref(false)
const allRequiredFieldsFilled = ref(true)
const result = ref({})

const activeFormField = computed(() => formFields.value[props.activeTab])

const checkRequiredFieldsAdded = () => {
  Object.keys(formFields.value).forEach((tabFields) => {
    const tabField = formFields.value[tabFields]
    allRequiredFieldsFilled.value &&
      Object.keys(tabField).forEach((field) => {
        if (tabField[field].isRequired) {
          if (
            (tabField[field].type === 'checkbox' && !tabField[field].value.length) ||
            !tabField[field].value
          ) {
            allRequiredFieldsFilled.value = false
            return
          }
        }
      })
  })
}

const submitForm = () => {
  isValidate.value = true
  allRequiredFieldsFilled.value = true
  checkRequiredFieldsAdded()
  if (allRequiredFieldsFilled.value) {
    Object.keys(formFields.value).forEach((tabFields) => {
      const tabField = formFields.value[tabFields]
      Object.keys(tabField).forEach((field) => {
        result.value[field] = tabField[field].value
      })
    })
    console.log(result.value)
  }
}
</script>

<style scoped>
.error-message {
  color: red;
  margin: 10px 0px;
}
</style>
