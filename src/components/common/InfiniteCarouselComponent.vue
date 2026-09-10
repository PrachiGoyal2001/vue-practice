<template>
  <div class="carousel-container">
    <div
      v-for="(image, index) in scrollImages"
      :key="`${image}-${index}`"
      class="img-wrapper"
      ref="allImagesEl"
    >
      <img :src="`src/assets/images/${image}`" />
    </div>
  </div>
</template>

<script setup>
import { ref, useTemplateRef, onMounted } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
    required: true,
  },
})

const activeImage = ref(0)
const scrollImages = ref(props.images)
const allImagesRef = useTemplateRef('allImagesEl')

const scrollImage = () => {
  setInterval(() => {
    if (activeImage.value === props.images.length) {
      activeImage.value = 0
    }
    activeImage.value = activeImage.value + 1
    allImagesRef.value[activeImage.value]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
    })
  }, 2000)
}

onMounted(() => {
  scrollImage()
})
</script>

<style scoped>
.carousel-container {
  display: flex;
  gap: 10px;
  overflow: hidden;
  margin-bottom: 10px;
}
.img-wrapper {
  min-width: 460px;
  height: 100%;
}
.img-wrapper img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}
.carousel-container::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
