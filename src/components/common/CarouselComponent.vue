<template>
  <div class="container">
    <div class="carousel-outside-container" ref="carouselContainerRef">
      <ChevronLeft class="arrows" @click="moveToLeft" v-if="showLeftArrow" />
      <div class="carousel-container">
        <div
          v-for="product in allProducts"
          :key="product._id"
          class="carousel-product"
          @click="moveToDetailPage(product._id)"
        >
          <img :src="product.images[0]" v-if="product.images.length" />
          <div>{{ product.title }}</div>
          <div>{{ product.price }}</div>
        </div>
      </div>
      <ChevronRight class="arrows arrow-right" @click="moveToRight" v-if="showRightArrow" />
    </div>
  </div>
</template>

<script setup>
import { useTemplateRef, ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'

const props = defineProps({
  allProducts: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const emits = defineEmits(['moveToDetailPage'])

const carouselContainerRef = useTemplateRef('carouselContainerRef')
const showRightArrow = ref(true)
const showLeftArrow = ref(false)

const moveToRight = () => {
  carouselContainerRef.value.scrollBy({
    left: 200,
    behavior: 'smooth',
  })
}
const moveToLeft = () => {
  carouselContainerRef.value.scrollBy({
    left: -200,
    behavior: 'smooth',
  })
}

const onScroll = (payload) => {
  const { scrollWidth, clientWidth, scrollLeft } = carouselContainerRef.value
  showRightArrow.value = Math.floor(scrollWidth - scrollLeft) > clientWidth
  showLeftArrow.value = scrollLeft !== 0
}

const moveToDetailPage = (id) => {
  emits('moveToDetailPage', id)
}

watch(
  () => props.allProducts,
  () => {
    nextTick(() => {
      const { scrollWidth, clientWidth } = carouselContainerRef.value
      if (scrollWidth === clientWidth) showRightArrow.value = false
      else showRightArrow.value = true
    })
  },
)

onMounted(() => {
  carouselContainerRef.value.addEventListener('scroll', onScroll)
})

// Using onUnmounted give Error for removeEventListener as at this time, carouselContainerRef does not Exists.
onBeforeUnmount(() => {
  carouselContainerRef.value.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.container {
  position: relative; /** Important for left and right arrow absolute Property */
}
.arrows {
  font-size: 40px;
  position: absolute;
}
.arrow-right {
  right: 0px;
}
.carousel-outside-container {
  border: 2px solid grey;
  border-radius: 20px;
  overflow: scroll;
  display: flex;
}
.carousel-outside-container::-webkit-scrollbar {
  height: 0;
  width: 0;
}
.carousel-container {
  display: flex;
  padding: 10px 0px;
}
.carousel-product {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
img {
  width: 200px;
  height: 200px;
}
@media screen and (max-width: 1024px) {
  .arrows {
    display: none;
  }
}
</style>
