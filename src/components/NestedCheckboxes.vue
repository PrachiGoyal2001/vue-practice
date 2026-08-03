<template>
  <div>
    <div v-for="(checkboxData, index) in checkboxesData" :key="checkboxData.id">
      <input
        type="checkbox"
        :id="checkboxData['label']"
        :checked="checkboxData['value']"
        @change="changeValue(checkboxData)"
        :indeterminate="checkboxData['isIndeterminate']"
      />
      <label :for="checkboxData['label']">{{ checkboxData.label }}</label>
      <NestedCheckboxes
        class="nested-checkbox"
        :formData="checkboxData?.children"
        :parentIndex="index"
        @changeParent="updateParent"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

import NestedCheckboxes from './NestedCheckboxes.vue'

const props = defineProps({
  formData: {
    type: Array,
    required: true,
    default: [],
  },
  parentIndex: {
    type: Number,
  },
})

const emit = defineEmits(['changeParent'])

const checkboxesData = ref(props.formData)

const changeValue = (checkboxData) => {
  let newValue = !checkboxData['value']
  updateAllChildren(checkboxData, newValue)
  emit('changeParent', { checkboxData, parentIndex: props.parentIndex })
}

const updateAllChildren = (checkboxData, newValue) => {
  checkboxData['value'] = newValue
  if (checkboxData['children']) {
    for (let child = 0; child < checkboxData['children'].length; child++) {
      updateAllChildren(checkboxData['children'][child], newValue)
    }
  }
}

const updateParent = ({ checkboxData, parentIndex }) => {
  let allSiblingValid = true
  console.log('checkboxesData.value[parentIndex]', parentIndex, checkboxesData.value[parentIndex])
  if (checkboxesData.value[parentIndex]?.['children']) {
    for (let child = 0; child < checkboxesData.value[parentIndex]['children'].length; child++) {
      if (
        checkboxesData.value[parentIndex]['children'][child] &&
        !checkboxesData.value[parentIndex]['children'][child]['value']
      ) {
        allSiblingValid = false
      }
      console.log('props', props.parentIndex, checkboxesData.value[parentIndex])
      if (allSiblingValid) {
        checkboxesData.value[parentIndex].value = true
      } else {
        checkboxesData.value[parentIndex].value = false
      }
      emit('changeParent', {
        checkboxData: checkboxesData.value[parentIndex],
        parentIndex: props.parentIndex,
      })
    }
  }
}
</script>

<style scoped>
.nested-checkbox {
  margin-left: 20px;
}
</style>
