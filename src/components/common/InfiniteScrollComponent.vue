<template>
  <div class="infinite-scroll-container">
    <div class="all-product-container">
      <div
        v-for="product in allProducts"
        :key="product._id"
        class="product-container"
        ref="allProductRef"
      >
        <img :src="product.thumbnail" />
        <div class="product-title">{{ product.title }}</div>
        <div>{{ product.price }}</div>
        <div>{{ product.rating }}</div>
      </div>
    </div>
    <div v-if="isLoading">Load More..</div>
  </div>
</template>

<script setup>
import { nextTick, useTemplateRef, watch } from 'vue'

const props = defineProps({
  allProducts: {
    type: Array,
    required: true,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['loadMoreProducts'])

const allProductRef = useTemplateRef('allProductRef')

watch(
  () => props.allProducts.length,
  (newValue) => {
    if (newValue) {
      nextTick(() => {
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            observer.unobserve(entries[0].target)
            emit('loadMoreProducts')
          }
        })
        const lastElement = allProductRef.value[props.allProducts.length - 1]
        observer?.observe(lastElement)
      })
      return () => {
        // observer.unobserve(lastElement)
        observer.disconnect()
      }
    }
  },
)
</script>

<style scoped>
.infinite-scroll-container {
  display: flex;
  gap: 10px;
  flex-direction: column;
}
.all-product-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin: 10px auto;
  flex-wrap: wrap;
}
.product-container {
  display: flex;
  flex-direction: column;
  border: 2px solid grey;
  border-radius: 10px;
  align-items: center;
}
img {
  width: 100%;
  height: 100%;
}
.product-title {
  width: 90%; /** div in flex does not behave as Block element, flex automatically adjusts it. So, when set width,it move to left*/
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: center; /** To center div having width in flex, text-align:center is required  */
}
@media screen and (max-width: 1440px) {
  .all-product-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (max-width: 320px) {
  .all-product-container {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
