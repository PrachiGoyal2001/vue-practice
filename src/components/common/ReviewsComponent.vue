<template>
  <div v-for="review in allReviews" :key="review._id" class="all-reviews-container">
    <div v-if="loadingEditDelete === review._id">Loading....</div>
    <div class="review" v-else>
      <ReviewActions
        v-if="review.user.name === loginUser"
        :options="dropdownOptions"
        @selectedOption="selectedOption($event, review)"
        class="review-actions"
      />
      <div class="review-user-container">
        <span>{{ review.user.name }}</span>
        <span>{{ review.updatedAt.split('T')[0] }}</span>
      </div>
      <UserCommentComponent
        v-if="editComment === review._id"
        v-model="review.comment"
        type="Update Comment"
        @saveComment="updateComment($event, review)"
        @cancelComment="cancelComment('editComment')"
      />
      <div class="comment-container" v-else>
        {{ review.comment }}
      </div>
    </div>
    <div class="likes-container">
      <span> 👍 {{ review.rating }}</span>
      <span @click="showUserCommentId = review._id" class="addReply">Reply</span>
    </div>
    <div v-if="showUserCommentId === review._id">
      <div v-if="isLoading === review._id">Loading....</div>
      <UserCommentComponent
        v-else
        v-model="userComment"
        type="Add Comment"
        @saveComment="addComment($event, review._id, review.replies)"
        @cancelComment="cancelComment('addComment')"
      />
    </div>
    <div v-if="review.replies?.length" class="ml-2">
      <ReviewsComponent
        :all-product-reviews="review.replies"
        :product-id="productId"
        @deleteComment="deleteComment($event, review)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useProductStore } from '../../stores/product.js'
import DotsVertical from 'vue-material-design-icons/DotsVertical.vue'
import ReviewActions from './ReviewActions.vue'
import UserCommentComponent from './UserCommentComponent.vue'

const productStore = useProductStore()

const dropdownOptions = ['Edit', 'Delete']

const emit = defineEmits(['deleteComment'])

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

const loginUser = 'user1'

const allReviews = ref([])
const showUserCommentId = ref('')
const userComment = ref('')
const editComment = ref('')
const isLoading = ref('')
const loadingEditDelete = ref('')

const addComment = async (event, reviewId, replies) => {
  isLoading.value = reviewId
  const response = await productStore.addReplyToReviews({
    reviewId,
    comment: event,
  })
  isLoading.value = ''
  replies.unshift({ ...response, replies: [] })
  showUserCommentId.value = ''
  userComment.value = ''
}

const selectedOption = async (event, review) => {
  if (event === 'Edit') {
    editComment.value = review._id
  } else {
    loadingEditDelete.value = review._id
    await productStore.deleteComment(review._id)
    loadingEditDelete.value = ''
    emit('deleteComment', review._id)
  }
}

const updateComment = async (event, replies) => {
  loadingEditDelete.value = replies._id
  const response = await productStore.updateComment(replies._id, {
    comment: event,
    rating: replies.rating,
  })
  loadingEditDelete.value = ''
  replies = { ...response }
  editComment.value = ''
}

const deleteComment = async (event, review) => {
  const index = review.replies.findIndex((reply) => reply._id === event)
  review.replies.splice(index, 1)
}

const cancelComment = (option) => {
  if (option === 'addComment') showUserCommentId.value = ''
  else editComment.value = ''
}

watch(
  () => props.allProductReviews,
  (newValue) => {
    allReviews.value = newValue
  },
  {
    immediate: true,
  },
)
</script>

<style scoped>
.all-reviews-container {
  margin-top: 20px;
}
.review-actions {
  float: right;
}
.review-user-container {
  display: flex;
  gap: 10px;
  color: rgb(219, 202, 202);
}
.addReply {
  margin-left: 10px;
  cursor: pointer;
}
.three-dots-icon {
  cursor: pointer;
}
.ml-2 {
  margin-left: 15px;
}
</style>
