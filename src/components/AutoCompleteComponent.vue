<template>
  <div class="dropdown-wrapper">
    <div class="all-tag-wrapper">
      <div v-for="tag in allTags" :key="`${tag.id}`" class="tag">
        {{ tag[label] }}
        <span @click="removeTag(tag)" class="remove-tag">❌</span>
      </div>
    </div>
    <div v-click-outside class="input-options-wrapper">
      <input
        v-model="userInput"
        ref="inputRef"
        @input="debouceSearch"
        @keydown.down.prevent="focusOptionsWrapper"
        @focus="showOptions = true"
      />
      <div
        v-if="showOptions"
        class="allOptions"
        ref="allOptionsRef"
        tabindex="-1"
        @keydown.down.prevent="moveToNextOption"
        @keydown.up.prevent="moveToPrevOption"
        @keydown.enter.prevent="addToTag"
      >
        <div v-if="allFilteredOptions.length">
          <div
            v-for="(option, index) in allFilteredOptions"
            :key="option.id"
            class="option"
            :class="{ 'highlighted-option': index === highlightedOptionIndex }"
            @click="addOption(index)"
            :id="option.id"
          >
            {{ option[label] }}
          </div>
        </div>
        <div v-else>
          <div class="option">No Options</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, useTemplateRef, watch } from 'vue'

const userInput = defineModel({
  default: '',
})
const props = defineProps({
  options: {
    type: Array,
    default: [],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
})

const showOptions = ref(false)
const highlightedOptionIndex = ref(null)
const allTags = ref([])
const allOptionsRef = useTemplateRef('allOptionsRef')
const inputRef = useTemplateRef('inputRef')
const allFilteredOptions = ref([])

const ClickOutside = (event, el) => {
  if (!el.contains(event.target)) {
    showOptions.value = false
  }
}

const vClickOutside = {
  mounted: (el) => window.addEventListener('click', (event) => ClickOutside(event, el)),
  unmounted: (el) => window.removeEventListener('click', (event) => ClickOutside(event, el)),
}

const filteredOptions = () => {
  const allOptions = props.options.filter(
    (option) => !allTags.value.find((tag) => tag.id === option.id),
  )
  allFilteredOptions.value = allOptions.filter((option) =>
    option[props.label].toLowerCase().includes(userInput.value),
  )
}

let timer = null

const debouceSearch = () => {
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    filteredOptions()
    showOptions.value = true
  }, 500)
}

watch(
  allTags,
  () => {
    filteredOptions()
  },
  { immediate: true, deep: true },
)

watch(highlightedOptionIndex, (newValue) => {
  if (newValue) {
    const optionIndex = document.getElementById(`${allFilteredOptions.value[newValue].id}`)
    optionIndex?.scrollIntoView({
      block: 'nearest',
    })
  }
})

const focusOptionsWrapper = () => {
  allOptionsRef.value.focus()
  moveToNextOption()
}

const moveToNextOption = () => {
  if (highlightedOptionIndex.value === null) {
    highlightedOptionIndex.value = 0
    return
  }
  highlightedOptionIndex.value =
    highlightedOptionIndex.value < allFilteredOptions.value.length - 1
      ? highlightedOptionIndex.value + 1
      : 0
}

const moveToPrevOption = () => {
  if (highlightedOptionIndex.value === 0) {
    highlightedOptionIndex.value = null
    inputRef.value.focus()
  } else {
    highlightedOptionIndex.value = highlightedOptionIndex.value - 1
  }
}

const addToTag = () => {
  if (highlightedOptionIndex.value >= 0) {
    allTags.value.push(allFilteredOptions.value[highlightedOptionIndex.value])
  }
  showOptions.value = false
}

const removeTag = ({ id }) => {
  allTags.value = allTags.value.filter((tag) => tag.id !== id)
}

const addOption = (index) => {
  highlightedOptionIndex.value = index
  addToTag()
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.dropdown-wrapper {
  width: 250px;
}
input {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid rgb(212, 205, 205);
}
.allOptions {
  width: 100%;
  border: 2px solid rgb(212, 205, 205);
  border-radius: 10px;
  padding: 2px;
  max-height: 400px;
  overflow-y: auto;
  position: absolute;
  z-index: 1000;
  background: #fff;
}
.option {
  padding: 10px 5px;
  border-radius: 10px;
  cursor: pointer;
}
.option:hover {
  background-color: rgb(108, 108, 233);
}
.highlighted-option {
  background-color: rgb(108, 108, 233);
}
.all-tag-wrapper {
  display: flex;
  flex-wrap: wrap;
}
.tag {
  padding: 10px 5px;
  border-radius: 50px;
  background-color: rgb(108, 108, 233);
  margin: 4px;
  display: flex;
  align-items: center;
  gap: 5px;
}
.remove-tag {
  cursor: pointer;
  font-size: 12px;
}
.input-options-wrapper {
  position: relative;
}
</style>
