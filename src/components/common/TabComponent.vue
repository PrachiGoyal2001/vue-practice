<template>
  <div>
    <div class="tab-container" :class="{ 'tab-container-opacity': hideImages }">
      <div
        class="tab"
        v-for="tab in tabDetails"
        :key="tab._id"
        :class="{ 'border-bottom': tab._id === modelValue }"
        @click="updateTabId(tab._id)"
      >
        <Transition name="slide-up">
          <div
            class="img-wrapper"
            :class="{ 'tab-img-background': tab._id === modelValue }"
            v-show="!hideImages"
          >
            <img :src="tab.image" :alt="tab.image" />
          </div>
        </Transition>
        <div class="tab-label">
          {{ tab.name }}
        </div>
      </div>
    </div>
    <div class="tab-content">
      <slot :lclData="modelValue"></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tabDetails: {
    type: Array,
    default: () => [],
  },
  hideImages: {
    type: Boolean,
    default: false,
  },
})

const modelValue = defineModel()

const updateTabId = (tabId) => {
  modelValue.value = tabId
}
</script>

<style scoped>
.tab-details {
  display: flex;
}
.tab {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10px;
  cursor: pointer;
  text-align: center;
}
.img-wrapper {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 6px;
  opacity: 1;
  margin: auto;
  transition:
    height 0.3s ease-in-out 0.2s,
    opacity 0.1s ease-in-out;
}
.tab-img-background {
  background: linear-gradient(#cfeaff, #eaf6ff, #ffffff);
}
.img-wrapper img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 5px;
}
.tab-label {
  width: 82px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 4px 0px;
}
.border-bottom.tab::after {
  position: absolute;
  content: '';
  width: stretch;
  bottom: 0;
  left: 0;
  border: 3px solid rgb(17, 98, 242);
  border-radius: 4px;
}
.tab-container {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  overflow: scroll;
  border-bottom: 1px solid rgb(205, 200, 200);
  position: sticky;
  z-index: 1000;
  background: white;
  top: 125px;
}
.tab-container::-webkit-scrollbar {
  height: 0;
  width: 0;
}
.img-wrapper.hide-images {
  opacity: 0;
  height: 0;
}
.tab-container-opacity {
  opacity: 0.9;
}
.img-wrapper {
  max-height: 50px; /* Adjust to match your image height */
  overflow: hidden;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  max-height: 0;
}

.slide-up-leave-active {
  transition:
    opacity 0.1s ease-in-out,
    max-height 0.25s ease-in-out 0.1s;
}

.slide-up-enter-active {
  transition:
    max-height 0.25s ease-in-out,
    opacity 0.1s ease-in-out 0.1s;
}
@media screen and (max-width: 768px) {
  .tab-container {
    border-bottom-width: 0;
    top: 171.6px;
  }
}
</style>
