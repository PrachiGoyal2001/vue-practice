<!--1.) If checked any checkbox then
        1.) If it has its children tick all its children.(If children has children then tick that as well)
        2.) If no sibligs or If it has its siblings and all are tick then tick its parent also be ticked(If parent also have siblings and all are tick then tick its Parent as well)

2.) If unchecked any checkbox then
        1.) If it has children then uncheck all its children(If children has children unchecked them all)
        2.) If it has Parent and untick the Parent(recursively untick the Parent)-->

<script setup>
import { ref } from 'vue'
import NestedCheckboxes from './components/NestedCheckboxes.vue'

const CheckboxesData = [
  {
    id: 7,
    label: 'Vegetables',
    children: [
      { id: 8, label: 'Carrot' },
      { id: 9, label: 'Broccoli' },
    ],
  },
  {
    id: 1,
    label: 'Fruits',
    children: [
      { id: 2, label: 'Apple' },
      { id: 3, label: 'Banana' },
      {
        id: 4,
        label: 'Citrus',
        children: [
          {
            id: 5,
            label: 'Orange',
            children: [
              { id: 9, label: 'Orange1' },
              { id: 10, label: 'Lemon1' },
            ],
          },
          { id: 6, label: 'Lemon' },
        ],
      },
    ],
  },
]

const formData = ref(CheckboxesData)
</script>

<template>
  <div>
    {{ formData }}
    <NestedCheckboxes :formData="formData" />
  </div>
</template>

<style scoped></style>
