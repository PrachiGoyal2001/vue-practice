import axiosInstance from '../axios'

export const productService = () => {
  const quickSearch = async (payload) => {
    const { data } = await axiosInstance.get(`products/search?q=${payload}`)
    return data.data
  }
  const getRecommendedProducts = async (payload) => {
    const { data } = await axiosInstance.get(`products/recommended?category=${payload}`)
    return data.data
  }
  const getTrendingProducts = async (payload) => {
    const { data } = await axiosInstance.get(`products/trending?category=${payload}`)
    return data.data
  }
  const getAllProducts = async ({ categoryId, page }) => {
    const { data } = await axiosInstance.get(
      `products?category=${categoryId}&page=${page}&limit=20`,
    )
    return data.data
  }
  const getProductById = async (id) => {
    const { data } = await axiosInstance.get(`products/${id}`)
    return data.data
  }
  const fetchAllCategories = async () => {
    const { data } = await axiosInstance.get('categories')
    return data.data
  }
  const fetchProductReviews = async (productId) => {
    const { data } = await axiosInstance.get(`products/${productId}/reviews`)
    return data.data
  }
  const replyToReview = async ({ reviewId, comment }) => {
    const { data } = await axiosInstance.post(`reviews/${reviewId}/replies`, {
      comment,
    })
    return data.data
  }
  const updateComment = async (reviewId, updateObj) => {
    const { data } = await axiosInstance.patch(`reviews/${reviewId}`, updateObj)
    return data.data
  }
  const deleteComment = async (reviewId) => {
    const { data } = await axiosInstance.delete(`reviews/${reviewId}`)
    return data.data
  }
  const addCommentOnTop = async (productId, commentObj) => {
    const { data } = await axiosInstance.post(`products/${productId}/reviews`, commentObj)
    return data.data
  }
  const addItemToCart = async (productObj) => {
    const { data } = await axiosInstance.post('cart/items', productObj)
    return data.data
  }
  const getCurrentUserCart = async () => {
    const { data } = await axiosInstance.get('cart')
    return data.data
  }
  return {
    quickSearch,
    getRecommendedProducts,
    getTrendingProducts,
    getAllProducts,
    getProductById,
    fetchAllCategories,
    fetchProductReviews,
    replyToReview,
    updateComment,
    deleteComment,
    addCommentOnTop,
    addItemToCart,
    getCurrentUserCart,
  }
}
