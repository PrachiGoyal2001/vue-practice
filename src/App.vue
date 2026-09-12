<script setup>
import Tab from './components/Tab.vue'
import DynamicForm from './components/DynamicForm.vue'

const allTabs = ['Profile', 'Interest', 'Settings']
const formDetail = {
  Profile: {
    name: {
      label: 'name',
      isRequired: true,
      value: '',
      type: 'text',
      placeholder: 'Enter your name',
      validator: function () {
        if (!this.value) return 'Name is Required'
      },
    },
    age: {
      label: 'age',
      isRequired: true,
      value: '',
      type: 'number',
      placeholder: 'Enter your Age',
      validator: function () {
        if (!this.value) return 'Age is Required'
        if (this.value < 18 || this.value > 50) return 'Age must be between 18 to 50'
      },
    },
  },
  Interest: {
    'favourite-sport': {
      label: 'Favourite Sport',
      isRequired: true,
      value: '',
      type: 'radio',
      options: ['Football', 'Hockey', 'Cricket'],
      validator: function () {
        if (!this.value) return 'Favourite sport is required'
      },
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
      validator: function () {
        if (!this.value.length) return 'Favourite Hobby is required'
      },
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
      validator: function () {
        if (!this.value) return 'Mode is Required'
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
