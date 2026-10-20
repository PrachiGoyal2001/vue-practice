<script setup>
import { ref } from 'vue'
import FileExplorer from './components/FileExplorerComponent.vue'

const data = ref([
  {
    id: 1,
    name: 'public',
    type: 'folder',
    hide: false,
    subFolder: [{ id: 11, name: 'index.html', type: 'file', hide: false }],
  },
  {
    id: 2,
    name: 'src',
    type: 'folder',
    hide: false,
    subFolder: [
      { id: 21, name: 'App.js', type: 'file', hide: false },
      { id: 22, name: 'index.js', type: 'file', hide: false },
    ],
  },
  {
    id: 3,
    name: 'package.json',
    type: 'file',
    hide: false,
  },
])

const openModal = ref(false)
const addDetails = ref({})
const userInputName = ref('index')

const recursiveCheckSubFolder = (data, id, moveToNextDepth) => {
  data.forEach((detail) => {
    if (moveToNextDepth) {
      if (detail.id === id) {
        detail.hide = detail.hide ? false : true
        moveToNextDepth = false
      } else if (detail.subFolder?.length)
        recursiveCheckSubFolder(detail.subFolder, id, moveToNextDepth)
    }
  })
}

const toggleSubFolder = (id) => {
  recursiveCheckSubFolder(data.value, id, true)
}

const recursiveCheckSubFolderToDelete = (data, id, moveToNextDepth) => {
  data.forEach((detail, index) => {
    if (moveToNextDepth) {
      if (detail.id === id) {
        data.splice(index, 1)
        moveToNextDepth = false
      } else if (detail.subFolder?.length)
        recursiveCheckSubFolderToDelete(detail.subFolder, id, moveToNextDepth)
    }
  })
}

const deleteSelectedFile = (id) => {
  recursiveCheckSubFolderToDelete(data.value, id, true)
}

const recursiveCheckSubFolderToAdd = (data, newEntryDetail, moveToNextDepth) => {
  data.forEach((detail) => {
    if (moveToNextDepth) {
      if (detail.id === newEntryDetail.id) {
        const newId = Number(`${newEntryDetail.id}${detail.subFolder.length + 1}`)
        if (!detail.subFolder) data.subFolder = []
        detail.subFolder.push({
          ...newEntryDetail,
          hide: false,
          subFolder: [],
          id: newId,
        })
        moveToNextDepth = false
      } else if (detail.subFolder?.length) {
        recursiveCheckSubFolderToAdd(detail.subFolder, newEntryDetail, moveToNextDepth)
      }
    }
  })
}

const add = (newEntryDetail) => {
  recursiveCheckSubFolderToAdd(data.value, newEntryDetail, true)
}

const addToSelectedId = (details) => {
  openModal.value = true
  addDetails.value = { ...details }
}

const addToExplorer = () => {
  add({ ...addDetails.value, name: userInputName.value })
  closeModal()
}

const closeModal = () => {
  openModal.value = false
  userInputName.value = ''
  addDetails.value = {}
}
</script>

<template>
  <FileExplorer
    :structure="data"
    @toggle-subfolder="toggleSubFolder"
    @delete-selected-file="deleteSelectedFile"
    @add="add"
    @add-to-selected-id="addToSelectedId"
    class="mt-2"
  />
  <div v-if="openModal" class="mt-2">
    <div>Enter {{ addDetails.type }} name</div>
    <input v-model="userInputName" />
    <div>
      <button @click="addToExplorer">Add</button>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<style scoped>
.mt-2 {
  margin-top: 10px;
}
</style>
