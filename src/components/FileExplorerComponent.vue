<template>
  <div>
    <div v-for="file in fileStructure" :key="file.id">
      <div class="ml-2" v-if="file.type === 'file'">
        {{ file.name }} and {{ file.id }}
        <DeleteIcon class="cursor-pointer" @click="deleteSelectedFile(file.id)" />
      </div>
      <div class="ml-2" v-else>
        <div>
          <span class="cursor-pointer" @click="toggleSubFolder(file.id)">
            <ChevronUpIcon v-if="!file.hide" />
            <ChevronDownIcon v-else />
          </span>
          {{ file.name }} and {{ file.id }}
          <FolderIcon class="cursor-pointer" @click="addToSelectedId('folder', file.id)" />
          <FileIcon class="cursor-pointer" @click="addToSelectedId('file', file.id)" />
          <DeleteIcon class="cursor-pointer" @click="deleteSelectedFile(file.id)" />
        </div>
        <FileExplorer
          v-if="file.subFolder && !file.hide"
          class="ml-2"
          :structure="file.subFolder"
          @toggle-subfolder="toggleSubFolder"
          @delete-selected-file="deleteSelectedFile"
          @add-to-selected-id="addSelectedId"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'
import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue'
import ChevronUpIcon from 'vue-material-design-icons/ChevronUp.vue'
import FolderIcon from 'vue-material-design-icons/Folder.vue'
import FileIcon from 'vue-material-design-icons/File.vue'
import FileExplorer from '../../src/components/FileExplorerComponent.vue'

const props = defineProps({
  structure: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['toggleSubfolder', 'deleteSelectedFile', 'addToSelectedId'])

const fileStructure = ref(props.structure)

const toggleSubFolder = (id) => {
  emit('toggleSubfolder', id)
}

const deleteSelectedFile = (id) => {
  emit('deleteSelectedFile', id)
}

const addSelectedId = ({ type, id }) => {
  emit('addToSelectedId', { type, id })
}

const addToSelectedId = (type, id) => {
  emit('addToSelectedId', { type, id })
}
</script>

<style scoped>
.ml-2 {
  margin-left: 10px;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
