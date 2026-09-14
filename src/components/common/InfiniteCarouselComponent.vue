<template>
  <div class="infinite-carousel-container">
    <div class="carousel-container">
      <div class="carousel-track" ref="carouselTrackEl">
        <div
          v-for="(image, index) in scrollImages.slice(4)"
          :key="`${image}-${index}`"
          class="img-wrapper"
          ref="allImagesEl"
        >
          <img :src="`src/assets/images/${image}`" :alt="`image${index + 1}`" />
        </div>
        <div
          v-for="(image, index) in scrollImages"
          :key="`${image}-${index}`"
          class="img-wrapper"
          ref="allImagesEl"
        >
          <img :src="`src/assets/images/${image}`" :alt="`image${index + 1}`" />
        </div>
        <div
          v-for="(image, index) in scrollImages.slice(0, 4)"
          :key="`${image}-${index}`"
          class="img-wrapper"
          ref="allImagesEl"
        >
          <img :src="`src/assets/images/${image}`" :alt="`image${index + 1}`" />
        </div>
      </div>
    </div>
    <div class="carousel-pill-container">
      <div
        v-for="i in scrollImages.length"
        :key="`scroll-${i}`"
        class="carousel-pill"
        :class="{
          active: activeDot === i,
          expanding: expandedDot === i,
          nextActive: nextDot === i,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, useTemplateRef, onMounted, onBeforeUnmount, computed } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
    required: true,
  },
})

let carouselInterval

const scrollImages = ref(props.images)
const noOfAppendCards = ref(3)
const activeImage = ref(noOfAppendCards.value)
const activeDot = ref(1)
const expandedDot = ref(null)
const nextDot = ref(null)

const imageWidth = () => {
  if (window.innerWidth > 768) return 33.33333
  return 100
}

const allImagesRef = useTemplateRef('allImagesEl')
const carouselTrackRef = useTemplateRef('carouselTrackEl')

const moveToNextDot = () => {
  expandedDot.value = activeDot.value
  nextDot.value = (activeDot.value + 1) % scrollImages.value.length

  setTimeout(() => {
    expandedDot.value = null
    if (activeDot.value === scrollImages.value.length) activeDot.value = 1
    else activeDot.value = activeDot.value + 1
  }, 300)
}

const moveCarousel = () => {
  carouselInterval = setInterval(() => {
    activeImage.value = activeImage.value + 1
    carouselTrackRef.value.style.transition = 'transform 0.3s ease-in-out'
    carouselTrackRef.value.style.transform = `translateX(-${imageWidth() * activeImage.value}%)`
    moveToNextDot()
  }, 3000)
}

const scrollCarousel = () => {
  if (activeImage.value >= scrollImages.value.length + noOfAppendCards.value) {
    carouselTrackRef.value.style.transition = 'none'
    activeImage.value = noOfAppendCards.value
    carouselTrackRef.value.style.transform = `translateX(-${imageWidth() * activeImage.value}%)`
  }
}

onMounted(() => {
  carouselTrackRef.value.style.transition = 'none'
  carouselTrackRef.value.style.transform = `translateX(-${imageWidth() * activeImage.value}%)`
  setTimeout(() => {
    moveCarousel()
  }, 3000)
  carouselTrackRef.value.addEventListener('transitionend', scrollCarousel)
})

onBeforeUnmount(() => {
  clearInterval(carouselInterval)
  carouselTrackRef.value.removeEventListener('transitionend', scrollCarousel)
})
</script>

<style scoped>
.infinite-carousel-container {
  margin-bottom: 10px;
}
.carousel-container {
  overflow: hidden;
  width: 100%;
}
.carousel-track {
  display: flex;
  margin-bottom: 10px;
  width: 100%;
}
.img-wrapper {
  min-width: 33.33333%;
  padding: 0px 5px;
  box-sizing: border-box; /** Check why this has been added */
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
.carousel-pill-container {
  display: flex;
  gap: 7px;
  justify-content: center;
}
.carousel-pill {
  position: relative;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #dbdbdb;
}
.carousel-pill::before {
  content: '';
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #dbdbdb;
  transition: width 0.3s ease;
}
.carousel-pill.active::before {
  content: '';
  width: 10px;
  margin-left: -2px;
  background: #878787;
  border-radius: 10px;
}
.carousel-pill.expanding::before {
  content: '';
  width: 16px;
  background: #878787;
  border-radius: 10px;
}
.carousel-pill.active,
.carousel-pill.expanding {
  z-index: 2;
}
.carousel-pill.nextActive {
  z-index: 3;
}
@media screen and (max-width: 768px) {
  .img-wrapper {
    min-width: 100%;
  }
}
</style>
