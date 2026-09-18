<script setup>
import { ref } from 'vue'
import Tab from './components/Tab.vue'
import DynamicForm from './components/DynamicForm.vue'

const allTabs = ['Profile', 'Interest', 'Settings']
const formDetail = ref({
  Profile: {
    name: {
      label: 'name',
      isRequired: true,
      value: '',
      type: 'text',
      placeholder: 'Enter your name',
      rules: [
        (value) => !!value || 'Name is Required.',
        (value) => (value || '').length <= 10 || 'Max 10 characters',
      ],
    },
    age: {
      label: 'age',
      isRequired: true,
      value: '',
      type: 'number',
      placeholder: 'Enter your Age',
      rules: [
        (value) => !!value || 'Age is Required.',
        (value) => (value > 10 && value <= 50) || 'Age must be between 18 to 50',
      ],
    },
    school: {
      cbq: true,
      field: 'age',
      show: (value) => value > 10 && value <= 18,
      label: 'school',
      isRequired: true,
      value: '',
      type: 'text',
      placeholder: 'Enter your School name',
      rules: [(value) => !!value || 'School name is Required.'],
    },

    'favourite-subject': {
      cbq: true,
      field: 'age',
      show: (value) => value > 10 && value <= 18,
      label: 'Favourite Subject',
      isRequired: true,
      value: '',
      type: 'text',
      placeholder: 'Enter your Favourite Subject',
      rules: [(value) => !!value || 'Favourite Subject is Required.'],
    },
    college: {
      cbq: true,
      field: 'age',
      show: (value) => value > 18 && value <= 25,
      label: 'college',
      isRequired: true,
      value: '',
      type: 'text',
      placeholder: 'Enter your College name',
      rules: [(value) => !!value || 'College name is Required.'],
    },
    'best-profession': {
      cbq: true,
      field: 'age',
      show: (value) => value > 18 && value <= 25,
      label: 'Best Profession',
      isRequired: true,
      value: '',
      type: 'radio',
      placeholder: 'Enter your Best Profession',
      options: ['Singing', 'Dancing'],
      rules: [(value) => !!value || 'Favourite sport is required'],
    },
  },
  Interest: {
    'favourite-sport': {
      label: 'Favourite Sport',
      isRequired: true,
      value: '',
      type: 'radio',
      options: ['Football', 'Hockey', 'Cricket'],
      rules: [(value) => !!value || 'Favourite sport is required'],
    },
    'favourite-Hobby': {
      label: 'Favourite Hobby',
      value: [],
      isRequired: true,
      type: 'checkbox',
      options: [
        { label: 'To play Indoor Game', value: 'to_play_indoor_game' },
        { label: 'To play Outdoor Game', value: 'to_play_outdoor_game' },
      ],
      rules: [(value) => (value && value.length) || 'Favourite Hobby is required'],
    },
  },
  Settings: {
    mode: {
      label: 'mode',
      isRequired: true,
      value: '',
      type: 'select',
      placeholder: 'Enter your mode',
      options: [
        { label: 'Light Mode', value: 'light_mode' },
        { label: 'Dark Mode', value: 'dark_mode' },
      ],
      rules: [(value) => !!value || 'Required.'],
    },
  },
})

const isValidate = ref(false)
const allRequiredFieldsFilled = ref(true)

const updateFn = (value, activeTab) => {
  formDetail.value[activeTab] = value
  const activeTabFields = formDetail.value[activeTab]
  Object.keys(activeTabFields).forEach((key) => {
    if (
      typeof activeTabFields[key].show === 'function' &&
      !activeTabFields[key].show(activeTabFields[activeTabFields[key].field].value)
    ) {
      activeTabFields[key].value = activeTabFields[key].type === 'checkbox' ? [] : ''
    }
  })
}

const checkRequiredFieldsAdded = () => {
  Object.keys(formDetail.value).forEach((tabFields) => {
    const tabField = formDetail.value[tabFields]
    allRequiredFieldsFilled.value &&
      Object.keys(tabField).forEach((field) => {
        if (
          tabField[field].isRequired &&
          (!tabField[field].show ||
            (tabField[field].show && tabField[field].show(tabField[tabField[field].field].value)))
        ) {
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
  allRequiredFieldsFilled.value = true
  checkRequiredFieldsAdded()
  if (!allRequiredFieldsFilled.value) {
    isValidate.value = true
    return
  }
  console.log(formDetail.value)
}
</script>

<template>
  <div>
    <Tab :all-tabs="allTabs">
      <template #tab-content="{ activeTab }">
        <DynamicForm
          :formDetail="formDetail[activeTab]"
          :isValidate="isValidate"
          :activeTab="activeTab"
          :showSubmitButton="activeTab === Object.keys(formDetail).at(-1)"
          @setValidate="isValidate = true"
          @updatedFormDetail="updateFn($event, activeTab)"
          @submitForm="submitForm"
        />
      </template>
    </Tab>
  </div>
</template>
