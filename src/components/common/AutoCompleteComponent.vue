<template>
  <div class="dropdown-wrapper">
    <div v-click-outside class="input-options-wrapper">
      <input
        v-model="userInput"
        ref="inputRef"
        @input="debouceSearch"
        @keydown.down.prevent="focusOptionsWrapper"
        :placeholder="placeholder"
      />
      <div
        v-if="showOptions && allFilteredOptions.length"
        class="allOptions"
        ref="dropdownContainerRef"
        tabindex="-1"
        @keydown.down.prevent="moveToNextOption"
        @keydown.up.prevent="moveToPrevOption"
        @keydown.enter.prevent="updateUserSearchOnEnter"
      >
        <div
          v-for="(option, index) in allFilteredOptions"
          :key="option._id"
          :id="option._id"
          class="option"
          :class="{ 'highlighted-option': index === highlightedOptionIndex }"
          ref="dropwdownOptionsRef"
          @click="updateUserSearch(option.title)"
        >
          {{ option[label] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, useTemplateRef, watch, nextTick } from 'vue'
import SearchIcon from 'vue-material-design-icons/ChevronDown.vue'

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
  placeholder: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['userProductSearchResult'])

const inputRef = useTemplateRef('inputRef')
const dropdownContainerRef = useTemplateRef('dropdownContainerRef')
const dropwdownOptionsRef = useTemplateRef('dropwdownOptionsRef')

const userInput = ref('')
const showOptions = ref(false)
const highlightedOptionIndex = ref(null)

const ClickOutside = (event, el) => {
  if (!el.contains(event.target)) {
    showOptions.value = false
  }
}

const vClickOutside = {
  mounted: (el) => window.addEventListener('click', (event) => ClickOutside(event, el)),
  unmounted: (el) => window.removeEventListener('click', (event) => ClickOutside(event, el)),
}

const allFilteredOptions = computed(() => props.options)

let timer = null

const debouceSearch = () => {
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    emit('userProductSearchResult', userInput.value)
    showOptions.value = true
    highlightedOptionIndex.value = 0
  }, 500)
}
// when type 1st word, at that time below watch called first and then api get called
watch(highlightedOptionIndex, async (newValue) => {
  if (newValue !== null && allFilteredOptions.value.length) {
    // If not check for allFilteredOptions.value.length, then scrollIntoView does not go on 0th Index
    const optionIndex = dropwdownOptionsRef.value.find(
      (option) => option.getAttribute('id') === `${allFilteredOptions.value[newValue]._id}`,
    )
    optionIndex?.scrollIntoView({
      block: 'nearest',
    })
  }
})

const focusOptionsWrapper = () => {
  if (dropdownContainerRef.value) {
    dropdownContainerRef.value.focus()
    moveToNextOption()
  }
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

const updateUserSearchOnEnter = () => {
  const productTitle = allFilteredOptions.value[highlightedOptionIndex.value].title
  updateUserSearch(productTitle)
}

const updateUserSearch = (title) => {
  userInput.value = title
  showOptions.value = false
}
</script>

<style scoped>
.dropdown-wrapper {
  width: 250px;
}
input {
  width: stretch;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #2ea1ff;
}
input:focus {
  outline: none;
}
input::placeholder {
  font-size: 15px;
}
input::before {
  background: url('../../assets/images/flipcart1stLetter.webp');
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
