import { defineStore } from 'pinia'
import { productService } from '../services/product'
import { ref } from 'vue'

export const useProductStore = defineStore('productstore', () => {
  const recommendedProducts = ref([])
  const trendingProducts = ref([])
  const allProducts = ref([])
  const allCategories = ref([])
  const cartDetails = ref([])

  const productQuickSearch = (payload) => {
    return productService().quickSearch(payload)
  }
  const allRecommendedProducts = async (payload) => {
    recommendedProducts.value = await productService().getRecommendedProducts(payload)
  }
  const allTrendingProducts = async (payload) => {
    trendingProducts.value = await productService().getTrendingProducts(payload)
  }
  const getAllProducts = async (payload) => {
    const data = await productService().getAllProducts(payload)
    allProducts.value.push(...data)
  }
  const getProductDetail = (payload) => {
    return productService().getProductById(payload)
  }
  const getAllCategories = async () => {
    allCategories.value = await productService().fetchAllCategories()
  }
  const getProductReviews = async (payload) => {
    return productService().fetchProductReviews(payload)
  }
  const addReplyToReviews = async (payload) => {
    return productService().replyToReview(payload)
  }
  const updateComment = async (reviewId, updateObj) => {
    return productService().updateComment(reviewId, updateObj)
  }
  const deleteComment = async (reviewId) => {
    return productService().deleteComment(reviewId)
  }
  const addCommentOnTop = async (productId, commentObj) => {
    return productService().addCommentOnTop(productId, commentObj)
  }
  const addItemToCart = async (productObj) => {
    const { items } = await productService().addItemToCart(productObj)
    cartDetails.value = items
  }
  const getCurrentUserCart = async () => {
    const { items } = await productService().getCurrentUserCart()
    cartDetails.value = items
  }
  return {
    recommendedProducts,
    trendingProducts,
    allProducts,
    allCategories,
    cartDetails,
    productQuickSearch,
    allRecommendedProducts,
    allTrendingProducts,
    getAllProducts,
    getProductDetail,
    getAllCategories,
    getProductReviews,
    addReplyToReviews,
    updateComment,
    deleteComment,
    addCommentOnTop,
    addItemToCart,
    getCurrentUserCart,
  }
})
