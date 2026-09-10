<template>
  <div class="product-container">
    <div class="product-carousel">
      <ProductCarousel :images="productImages" />
    </div>
    <div class="product-detail">
      <div class="product-title">{{ productDetail.title }}</div>
      <div>{{ productDetail.description }}</div>
      <p class="product-rating">{{ productDetail.rating }}</p>
      <div class="product-rating-wrapper">
        <RatingComponent
          v-for="i in Math.ceil(productDetail.rating)"
          :key="`star-${i}`"
          :id="`star${i}`"
          :ratingPercentage="getPercentage(i, productDetail.rating)"
        />
      </div>
      <div class="product-price">{{ productDetail.price }}</div>
      <button @click="addToCart">Add to Cart</button>
    </div>
  </div>
  <UserReviewsComponent :all-product-reviews="allProductReviews" :product-id="route.params.id" />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProductStore } from '../stores/product.js'
import { useRoute } from 'vue-router'
import ProductCarousel from '@/components/common/ProductCarousel.vue'
import UserReviewsComponent from '@/components/common/UserReviewsComponent.vue'
import { useRouter } from 'vue-router'
import Star from 'vue-material-design-icons/Star.vue'
import RatingComponent from '../components/common/RatingComponent.vue'

const productStore = useProductStore()
const router = useRouter()
const route = useRoute()

const productDetail = ref({})
const allProductReviews = ref([])

const productImages = computed(() => productDetail.value.images)

const fetchDetailPage = async () => {
  productDetail.value = await productStore.getProductDetail(route.params.id)
  allProductReviews.value = await productStore.getProductReviews(route.params.id)
}

const getPercentage = (currentRating, totalRating) => {
  if (currentRating <= totalRating) return 100
  let rating = 1 - (currentRating - totalRating)
  if (rating >= 0.5) return 100
  return rating * 100
}

fetchDetailPage()

const addToCart = async () => {
  const { _id, quantity, ...rest } = productDetail.value
  await productStore.addItemToCart({
    productId: _id,
    quantity,
  })
  router.push({ name: 'cart-page' })
}
</script>

<style scoped>
.product-container {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.product-carousel,
.product-detail {
  width: 50%;
}
.product-detail {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.product-title {
  font-weight: bold;
  font-size: 25px;
}
.product-rating {
  padding: 5px;
  background: rgb(229, 224, 224);
  border-radius: 5px;
  display: inline-block;
  width: 55px;
}
.product-carousel {
  border: 2px solid black;
  border-radius: 5px;
}
.product-price {
  font-weight: bold;
  font-size: 20px;
}
.product-rating-wrapper {
  display: flex;
  gap: 10px;
}

@media screen and (max-width: 768px) {
  .product-container {
    flex-direction: column;
  }
  .product-carousel,
  .product-detail {
    width: 100%;
  }
}
</style>
