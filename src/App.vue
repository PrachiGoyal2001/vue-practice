<script setup>
import Tab from './components/Tab.vue'
import DynamicForm from './components/DynamicForm.vue'

const allTabs = ['Profile', 'Interest', 'Settings']
const formDetail = {
  Profile: {
    name: {
      label: 'name',
      value: '',
      type: 'text',
      placeholder: 'Enter your name',
      validator: function (val) {
        if (!val) return 'Name is Required'
      },
    },
    age: {
      label: 'age',
      value: '',
      type: 'number',
      placeholder: 'Enter your Age',
      validator: function (val) {
        if (!val) return 'Age is Required'
        else if (val < 18 || val > 50) 'Age must be between 18 to 50'
      },
    },
  },
  Interest: {
    'favourite-sport': {
      name: 'Favourite Sport',
      value: '',
      type: 'radio',
      options: ['Football', 'Hockey', 'Cricket'],
      validator: function (val) {
        if (!val) return 'Favourite sport is required'
      },
    },
    'favourite-Hobby': {
      name: 'Favourite Hobby',
      value: '',
      type: 'checkbox',
      options: ['To play Indoor Game', 'To play Outdoor Game'],
      validator: function (val) {
        if (!val) return 'Favourite Hobby is required'
      },
    },
  },
  Settings: {
    mode: {
      name: 'mode',
      value: '',
      type: 'select',
      placeholder: 'Enter your mode',
      options: ['Light Mode', 'Dark Mode'],
      validator: function (val) {
        if (!val) return 'Mode is Required'
      },
    },
  },
}
</script>

<template>
  <div>
    <Tab :all-tabs="allTabs">
      <template #tab-content="{ activeTab }">
        <DynamicForm :activeTab="activeTab" :formDetail="formDetail" />
      </template>
    </Tab>
  </div>
</template>
