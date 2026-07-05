<template>
  <div>
    <div class="tab-containter">
      <div
        class="tab"
        v-for="(tab, index) in tabDetails"
        :key="`tab${index}`"
        :class="{ 'border-bottom': tab === currentTabId }"
        @click="currentTabId = tab"
      >
        {{ tab }}
      </div>
    </div>
    <div class="tab-content">
      <slot :lclData="currentTabId"></slot>
    </div>
  </div>
</template>
3
<script setup>
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  tabDetails: {
    type: Array,
    default: () => [],
  },
})
const currentTabId = ref(props.tabDetails?.[0])
</script>

<style scoped>
.tab-details {
  display: flex;
}
.tab {
  padding: 10px;
  cursor: pointer;
}
.border-bottom {
  border-bottom: 2px solid blue;
}
.tab-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
