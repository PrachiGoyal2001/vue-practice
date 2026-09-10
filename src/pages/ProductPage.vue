<template>
  <div class="all-containers">
    <TabComponent
      :tabDetails="allCategories"
      v-model="currentCategoryId"
      ref="tabEl"
      :hide-images="hideImages"
    >
      <InfiniteCarouselComponent :images="carouselImages" />
      <CarouselComponent :all-products="recommendedProducts" @moveToDetailPage="moveToDetailPage" />
      <CarouselComponent
        :all-products="trendingProducts"
        class="mt-8"
        @moveToDetailPage="moveToDetailPage"
      />
      <div>All Products</div>
      <InfiniteScrollComponent
        class="mt-8"
        :all-products="allProducts"
        :is-loading="isLoading"
        @loadMoreProducts="loadMoreProducts"
      />
    </TabComponent>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductStore } from '../stores/product.js'
import CarouselComponent from '../components/common/CarouselComponent.vue'
import InfiniteScrollComponent from '../components/common/InfiniteScrollComponent.vue'
import TabComponent from '../components/common/TabComponent.vue'
import InfiniteCarouselComponent from '@/components/common/InfiniteCarouselComponent.vue'

const productStore = useProductStore()

const { recommendedProducts, trendingProducts, allProducts, allCategories } =
  storeToRefs(productStore)

const router = useRouter()

const carouselImages = [
  'img1.webp',
  'img2.webp',
  'img3.webp',
  'img4.webp',
  'img5.webp',
  'img6.webp',
  'img7.webp',
]

const page = ref(1)
const isLoading = ref(false)
const currentCategoryId = ref(null)
const hideImages = ref(false)
const tabRef = useTemplateRef('tabEl')

const loadMoreProducts = async () => {
  isLoading.value = true
  await productStore.getAllProducts({ page: ++page.value, categoryId: currentCategoryId.value })
  isLoading.value = false
}

const moveToDetailPage = (id) => {
  router.push(`/product-detail/${id}`)
}

const fetchAllSections = () => {
  page.value = 1
  allProducts.value = []
  productStore.allRecommendedProducts(currentCategoryId.value)
  productStore.allTrendingProducts(currentCategoryId.value)
  productStore.getAllProducts({ page: page.value, categoryId: currentCategoryId.value })
}

watch(currentCategoryId, (newValue) => {
  if (newValue) {
    fetchAllSections()
  }
})

const onScroll = (event) => {
  if (window.scrollY !== 0) {
    hideImages.value = true
  } else {
    hideImages.value = false
  }
}

onMounted(async () => {
  await productStore.getAllCategories()
  currentCategoryId.value = allCategories.value[0]._id
  window.addEventListener('scroll', (event) => onScroll(event))
})
</script>

<style scoped>
.mt-8 {
  margin-top: 10px;
}
</style>
