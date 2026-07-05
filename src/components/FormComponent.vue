<template>
  <form class="form">
    <div v-for="field in formDetails" :key="field.label">
      <div v-if="field.type === 'number'">
        <label>{{ field.label }}</label>
        <input type="number" v-model="field.value" />
      </div>
      <div v-if="field.type === 'email'">
        <label>{{ field.label }}</label>
        <input type="email" v-model="field.value" />
      </div>
      <div v-if="field.type === 'checkbox'">
        <p>{{ field.label }}</p>
        <div v-for="option in field.options" :key="option">
          <label :for="option">{{ option }}</label>
          <input
            type="checkbox"
            :id="option"
            :name="option"
            :value="option"
            v-model="field.value"
          />
        </div>
      </div>
      <div v-if="field.type === 'radio'">
        <p>{{ field.label }}</p>
        <div v-for="option in field.options" :key="option">
          <label :for="option">{{ option }}</label>
          <input type="radio" :id="option" :name="option" :value="option" v-model="field.value" />
        </div>
      </div>
      <div v-if="field.type === 'dropdown'">
        <label>{{ field.label }}</label>
        <select v-model="field.value">
          <option v-for="option in field.options" :key="option">{{ option }}</option>
        </select>
      </div>
      <p class="error" v-if="field.error">{{ field['error'] }}</p>
    </div>
    <button
      v-if="selectedTab === allTabs[allTabs.length - 1]"
      type="button"
      @click="getAllUserDetails"
    >
      Submit
    </button>
  </form>
</template>

<script setup>
import { ref, computed, reactive, onUpdated } from 'vue'

const props = defineProps({
  form: {
    type: Object,
    default: () => ({}),
  },
  selectedTab: {
    type: String,
  },
})
const isErrorPresent = ref(false)

const allTabs = Object.keys(props.form)

const formDetails = computed(() => props.form[props.selectedTab])
const getAllUserDetails = () => {
  isErrorPresent.value = false
  Object.keys(props.form).forEach((tab) => {
    props.form[tab].forEach((detail) => {
      if (detail.validate) {
        detail.validate(detail.value)
        if (detail.error) {
          isErrorPresent.value = true
        }
      }
    })
  })
  if (!isErrorPresent.value) {
    const allFields = Object.values(props.form)
      .flat()
      .reduce((acc, curr) => {
        acc[curr['field']] = curr['value']
        return acc
      }, {})
    console.log(allFields)
  }
}
</script>

<style scoped>
.tab {
  padding: 10px;
  cursor: pointer;
}
.selected-tab {
  border-bottom: 2px solid blue;
}
.tab-containter {
  display: flex;
}
.form {
  padding: 10px;
}
.error {
  color: red;
  font: bold;
}
</style>
