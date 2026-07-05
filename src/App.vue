<script setup>
import { nextTick, reactive, ref } from 'vue'
import FormComponent from './components/FormComponent.vue'
import TabComponent from './components/TabComponent.vue'

const form = reactive({
  Profile: [
    {
      value: null,
      field: 'age',
      label: 'age',
      type: 'number',
      validate(val) {
        this.error = ''
        if (!val) {
          this.error = 'Age Field is required'
          return
        }
        if (val < 18 || val >= 50) {
          this.error = 'Age should be in between 18 to 50'
          return
        }
      },
      error: '',
    },
    {
      value: null,
      field: 'email',
      label: 'email',
      type: 'email',
      validate(val) {
        this.error = ''
        if (!val) {
          this.error = 'Email Field is required'
          return
        }
        if (val.length < 3 || !val.includes('@')) {
          this.error = 'Email Should be valid'
          return
        }
      },
      error: '',
    },
  ],
  Interest: [
    {
      value: null,
      field: 'favourite_game',
      label: 'Favourite Game',
      type: 'radio',
      options: ['Football', 'Cricket', 'Hockey'],
      validate(val) {
        this.error = ''
        if (!val) {
          this.error = 'Favourite Game Field is required'
          return
        }
      },
      error: '',
    },
    {
      value: [],
      field: 'favourite_movie',
      label: 'Favourite Movie',
      type: 'checkbox',
      options: ['Movie1', 'Movie2', 'Movie3'],
      validate(val) {
        this.error = ''
        if (val.length === 0) {
          this.error = 'Favourite Movie Field is required'
          return
        }
      },
      error: '',
    },
    {
      value: null,
      field: 'favourite_color',
      label: 'Favourite Color',
      type: 'dropdown',
      options: ['Blue', 'Orange', 'Green'],
      validate(val) {
        this.error = ''
        if (!val) {
          this.error = 'Favourite Color Field is required'
          return
        }
      },
      error: '',
    },
  ],
  Settings: [
    {
      value: null,
      field: 'mode',
      label: 'Mode',
      type: 'dropdown',
      options: ['lightmode', 'darkmode'],
      validate(val) {
        this.error = ''
        if (!val) {
          this.error = 'Mode Field is required'
          return
        }
      },
      error: '',
    },
  ],
})
</script>
<template>
  <TabComponent :tab-details="Object.keys(form)" #default="dataFromSlot">
    <FormComponent :selectedTab="dataFromSlot?.lclData" :form="form" />
  </TabComponent>
</template>

<style scoped></style>
