<template>
  <div class="all-containers">
    <AccordianComponent title="Product in Cart" class="cart-container">
      <div v-for="cartDetail in cartDetails" :key="cartDetail._id" class="cart-detail-container">
        <div class="cart-detail">
          <img :src="cartDetail.product.thumbnail" />
          <div>
            <div>{{ cartDetail.product.title }}</div>
            <div>{{ cartDetail.product.description }}</div>
            <div>{{ cartDetail.product.rating }}⭐</div>
          </div>
          <!-- <button>Remove</button> -->
        </div>
      </div>
    </AccordianComponent>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '../stores/product.js'
import AccordianComponent from '../components/common/AccordianComponent.vue'

const productStore = useProductStore()

const { cartDetails } = storeToRefs(productStore)

const fetchCartProducts = async () => {
  if (!cartDetails) {
    await productStore.getCurrentUserCart()
  }
}

fetchCartProducts()
</script>

<style scoped>
.all-containers {
  max-width: calc(100% - 10vw);
  margin: 10px auto;
}
.cart-container {
  width: 60%;
}
.cart-detail {
  display: flex;
  gap: 10px;
}
.cart-detail-container {
  margin-bottom: 10px;
}
.cart-detail img {
  width: 100px;
  height: 100px;
  border: 1px solid rgb(200, 198, 198);
  border-radius: 5px;
}
@media screen and (max-width: 768px) {
  .cart-container {
    width: 100%;
  }
}
</style>
