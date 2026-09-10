<template>
  <div>
    <div class="slide-container">
      <ChevronLeft class="slide-left-btn" @click="slideImage('left')" v-if="activeIndex" />
      <Transition :name="slideRight ? 'slide-right' : 'slide-left'">
        <img :src="images[activeIndex]" :key="`${images[activeIndex]}`" class="slide-img" />
      </Transition>
      <ChevronRight
        class="slide-right-btn"
        @click="slideImage('right')"
        v-if="images && activeIndex < images.length - 1"
      />
    </div>
    <div class="image-container">
      <img
        v-for="(image, index) in images"
        :key="`image-${index}`"
        :src="image"
        :alt="`image-${index}`"
        :class="{ 'image-active': activeIndex === index }"
        @click="updateImage(index)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'

defineProps({
  images: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const activeIndex = ref(0)
const slideRight = ref(false)

const updateImage = (index) => {
  if (index > activeIndex.value) slideRight.value = false
  else slideRight.value = true
  activeIndex.value = index
}
const slideImage = (direction) => {
  if (direction === 'right') {
    slideRight.value = false
    activeIndex.value += 1
  } else {
    slideRight.value = true
    activeIndex.value -= 1
  }
}
</script>

<style scoped>
.slide-container {
  position: relative;
  height: 450px;
  width: 100%;
  overflow: hidden; /* Crucial: cuts off the image as it slides out */
}
.slide-container img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.slide-left-btn,
.slide-right-btn {
  display: none;
  z-index: 1;
}
.slide-left-leave-to,
.slide-right-leave-to {
  opacity: 0;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translateX(100%); /* Slides completely out to the right */
}
.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-100%); /* Slides completely out to the left */
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease-in-out;
}
.image-container {
  display: flex;
  gap: 10px;
  overflow: scroll;
  margin: 10px;
}
.image-container img {
  width: 100px;
  height: 100px;
  cursor: pointer;
}
.image-container::-webkit-scrollbar {
  height: 0;
  width: 0;
}
.image-active {
  border: 2px solid rgb(168, 163, 163);
  border-radius: 5px;
}
@media screen and (max-width: 768px) {
  .slide-right-btn {
    display: block;
    font-size: 30px;
    position: absolute;
    top: 50%;
  }
  .slide-left-btn {
    display: block;
    font-size: 30px;
    position: absolute;
    top: 50%;
  }
  .slide-right-btn {
    right: 0px;
  }
  .image-container {
    display: none;
  }
}
</style>
