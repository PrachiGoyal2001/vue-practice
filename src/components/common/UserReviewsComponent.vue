<template>
  <div class="user-reviews-container">
    <div v-if="isLoading">Loading....</div>
    <UserCommentComponent
      v-else
      v-model="userComment"
      type="Add Comment"
      @saveComment="addCommentOnTop"
      @cancelComment="cancelComment"
      @onFocus="addNewComment = true"
      :showActionButtons="addNewComment"
    />
    <ReviewComponent
      :all-product-reviews="productReviews"
      :product-id="productId"
      @deleteComment="deleteComment"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useProductStore } from '../../stores/product.js'
import ReviewComponent from './ReviewsComponent.vue'
import UserCommentComponent from './UserCommentComponent.vue'

const productStore = useProductStore()

const props = defineProps({
  allProductReviews: {
    type: Array,
    default: () => [],
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
})

const addNewComment = ref(false)
const userComment = ref('')
const productReviews = ref([])
const isLoading = ref(false)

const addCommentOnTop = async () => {
  isLoading.value = true
  const response = await productStore.addCommentOnTop(props.productId, {
    comment: userComment.value,
    rating: 0,
  })
  isLoading.value = false
  productReviews.value.unshift({ ...response, replies: [] })
  console.log(productReviews.value, 'productReviews')
  addNewComment.value = false
  userComment.value = ''
}

const deleteComment = async (reviewId) => {
  const index = productReviews.value.findIndex((reply) => reply._id === reviewId)
  productReviews.value.splice(index, 1)
}

const cancelComment = () => {
  addNewComment.value = false
}

watch(
  () => props.allProductReviews,
  (newValue) => {
    productReviews.value = newValue
  },
)
</script>

<style scoped>
.user-reviews-container {
  border: 2px solid black;
  margin-top: 20px;
  border-radius: 10px;
  padding: 10px;
}
.user-comment-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.comment-buttons {
  justify-self: flex-end;
}
</style>
