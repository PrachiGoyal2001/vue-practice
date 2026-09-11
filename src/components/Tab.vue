<template>
  <div>
    <div class="all-tabs">
      <div
        v-for="(tab, index) in allTabs"
        :key="`${tab}-${index}`"
        class="tab"
        :class="{ 'active-tab': activeTab === tab }"
        @click="activeTab = tab"
      >
        {{ tab }}
      </div>
      <slot name="tab-content" :activeTab="activeTab" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  allTabs: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const activeTab = ref(props.allTabs?.[0])
</script>

<style scoped>
.all-tabs {
  display: flex;
  gap: 10px;
}
.active-tab {
  border-bottom: 2px solid blue;
}
.tab {
  cursor: pointer;
}
</style>
