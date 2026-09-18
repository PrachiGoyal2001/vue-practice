<template>
  <div>
    <div v-for="(field, key, index) in fields" :key="`${field}${index}`">
      <div v-if="showField(field, 'text')" class="mb-2">
        <label :for="field.label">{{ field.label }}</label>
        <input
          type="text"
          v-model="field.value"
          :placeholder="field.placeholder"
          :id="field.label"
        />
      </div>
      <div v-if="showField(field, 'number')" class="mb-2">
        <label :for="field.label">{{ field.label }} </label>
        <input
          type="number"
          v-model="field.value"
          :placeholder="field.placeholder"
          :id="field.label"
        />
      </div>
      <div v-if="showField(field, 'radio')" class="mb-2">
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
      <div v-if="showField(field, 'checkbox')" class="mb-2">
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
      <div v-if="showField(field, 'select')" class="mb-2">
        {{ field.label }}
        <select v-model="field.value">
          <option v-for="option in field.options" :key="option.value" :value="option.value">
            {{ option.value }}
          </option>
        </select>
      </div>
      <div
        class="error-message"
        v-if="
          isValidate && (!field.show || (field.show && field.show(formDetail?.[field.field].value)))
        "
      >
        {{ validator(field) }}
      </div>
    </div>
    <button v-if="showSubmitButton" @click="submitForm">Submit</button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  formDetail: {
    type: Object,
    required: true,
    default: () => {},
  },
  showSubmitButton: {
    type: Boolean,
    required: true,
    default: false,
  },
  isValidate: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['updatedFormDetail', 'submitForm'])

const fields = ref(props.formDetail)
const allRequiredFieldsFilled = ref(true)

const showField = (field, type) =>
  field.type === type && (!field.show || field.show(props.formDetail[field.field]?.value))

watch(
  fields,
  (newValue) => {
    emit('updatedFormDetail', newValue)
  },
  { deep: true },
)

watch(
  () => props.formDetail,
  (newValue) => {
    fields.value = newValue
  },
)

const validator = ({ value, rules = [] }) => {
  const errors = rules.filter((fn) => typeof fn(value) === 'string')
  return errors[0]?.(value)
}

const submitForm = () => {
  emit('submitForm')
}
</script>

<style scoped>
.error-message {
  color: red;
  margin: 10px 0px;
}
.mb-2 {
  margin-bottom: 10px;
}
</style>
