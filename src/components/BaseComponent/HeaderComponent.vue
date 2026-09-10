<template>
  <div class="header-container">
    <div class="header-top-container">
      <div class="header-icon-container">
        <div class="header-top-icon-container bg-yellow">
          <img src="../../assets/images/flipcart1stLetter.webp" alt="Flipcart-Icon" />
          <span>Flipkart</span>
        </div>
        <div class="header-top-icon-container bg-grey">
          <img src="../../assets/images/travel.webp" alt="Travel-Icon" />
          <span>Travel</span>
        </div>
      </div>
      <div class="header-location-container">
        <MapMarker /> <span>Location not set </span>
        <span>Select delivery Location <ChevronRight class="chevron-right" /></span>
      </div>
    </div>
    <div class="header-bottom-container">
      <AutoCompleteComponent
        label="title"
        :options="searchResults"
        placeholder="Search for Products"
        @userProductSearchResult="userProductSearchResult"
        class="search-field"
      />
      <div class="action-btn">
        <!-- <button class="logout-btn" @click="logoutUser">Logout</button> -->
        <div class="login-container">
          <ActionLoginComponent :options="loginOptions" tooltip-label="Login">
            <template #button>
              <div class="login-btn">
                <AccountCircleOutline class="icon" />
                <div>Login</div>
              </div>
            </template>
            <template #options>
              <div class="dropdown-login-header">
                <div>New Customer?</div>
                <div>Sign Up</div>
              </div>
            </template>
          </ActionLoginComponent>
        </div>
        <ActionLoginComponent :options="moreOptions">
          <template #button>
            <div class="more-btn">More</div>
          </template>
          <template #options>
            <div class="dropdown-more-header">More</div>
          </template>
        </ActionLoginComponent>
        <div class="cart-btn">
          <div class="cart-icon">🛒</div>
          <div class="cart-quantity" v-if="getCartQuantity">{{ getCartQuantity }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, useTemplateRef, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useProductStore } from '../../stores/product'
import AutoCompleteComponent from '../common/AutoCompleteComponent.vue'
import MapMarker from 'vue-material-design-icons/MapMarker.vue'
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'
import ActionLoginComponent from '../HomeComponent/ActionComponent.vue'
import AccountCircleOutline from 'vue-material-design-icons/AccountCircleOutline.vue'
import HeartOutline from 'vue-material-design-icons/HeartOutline.vue'
import GiftOutline from 'vue-material-design-icons/GiftOutline.vue'
import Gift from 'vue-material-design-icons/Gift.vue'
import Store from 'vue-material-design-icons/Store.vue'
import BellCogOutline from 'vue-material-design-icons/BellCogOutline.vue'
import Headset from 'vue-material-design-icons/Headset.vue'

const loginOptions = [
  { name: 'My Profile', icon: AccountCircleOutline },
  { name: 'Wishlist', icon: HeartOutline },
  { name: 'Rewards', icon: GiftOutline },
  { name: 'Gift Cards', icon: Gift },
]

const moreOptions = [
  { name: 'Become a Seller', icon: Store },
  { name: 'Notification Settings', icon: BellCogOutline },
  { name: '24X7 Customer Care', icon: Headset },
]

const authStore = useAuthStore()
const productStore = useProductStore()
const router = useRouter()

const { cartDetails } = storeToRefs(productStore)

const searchResults = ref([])

const getCartQuantity = computed(() => cartDetails.value.length)

const logoutUser = async () => {
  await authStore.logoutUser()
  localStorage.removeItem('user_token')
  localStorage.removeItem('refresh_token')
  authStore.isUserAuthenticated = false
  router.push('/auth')
}

const userProductSearchResult = async (userSearch) => {
  if (userSearch) {
    searchResults.value = await useProductStore().productQuickSearch(userSearch)
  } else {
    searchResults.value = []
  }
}

const fetchCartProducts = async () => {
  await productStore.getCurrentUserCart()
}
fetchCartProducts()
</script>

<style scoped>
.header-container {
  border-bottom: 1px solid rgb(205, 200, 200);
  position: sticky;
  top: 0;
  z-index: 9999;
  background: white;
  padding: 10px 0px;
}
.header-top-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-icon-container {
  display: flex;
  gap: 10px;
  width: 100%;
}
.header-top-icon-container {
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 25px;
}
.bg-yellow {
  background-color: rgb(255, 229, 31);
}
.bg-grey {
  background-color: rgb(226, 217, 217);
}
.header-top-icon-container img:first-child {
  width: 25px;
  height: 25px;
}
.header-top-icon-container span {
  font-weight: bold;
  font-weight: 12px;
}
.header-location-container {
  white-space: nowrap;
  display: flex;
  gap: 2px;
  align-items: center;
}
.header-location-container {
  font-size: 16px;
  font-weight: bold;
}
.header-location-container span:nth-child(3) {
  display: flex;
  align-items: center;
  color: blue;
}
.header-location-container span:nth-child(2) {
  margin-right: 2px;
}
.chevron-right {
  font-size: 20px;
}
.header-bottom-container {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.search-field {
  width: 70%;
}
.cart-btn {
  cursor: pointer;
  position: relative;
}
.login-btn,
.more-btn {
  display: flex;
  gap: 10px;
  align-items: center;
  color: rgb(100, 95, 95);
}
.dropdown-more-header {
  font-weight: bold;
}
.logout-btn {
  padding: 10px;
  border-radius: 10px;
  background-color: #0080f1;
  border: none;
  color: #000;
  cursor: pointer;
}
.action-btn {
  display: flex;
  gap: 10px;
  align-items: center;
}
.cart-icon {
  font-size: 20px;
}
.cart-quantity {
  position: absolute;
  top: -4px;
  right: -8px;
  border-radius: 100%;
  background: rgb(230, 56, 56);
  width: 20px;
  height: 20px;
  text-align: center;
  color: #fff;
}

.dropdown-login-header {
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
}
.dropdown-login-header div:nth-child(2) {
  font-weight: bold;
  color: #0080f1;
}
:deep(.icon svg) {
  width: 20px;
  height: 20px;
}
.login-container {
  position: relative;
  height: 100%;
}
@media screen and (max-width: 768px) {
  .header-container {
    border-bottom-width: 0;
    padding-top: 0;
  }
  .header-top-container {
    flex-direction: column;
    align-items: flex-start;
    background: linear-gradient(#56adff, #deefff, #deefff);
    padding: 10px;
  }
  .header-top-icon-container {
    flex-direction: column;
    width: 50%;
    padding: 2px;
    margin-bottom: 10px;
  }
  .header-bottom-container {
    background: linear-gradient(#deefff, #ffffff, #ffffff);
  }
  .header-location-container {
    font-size: 14px;
    font-weight: bold;
  }
  .action-btn {
    display: none;
  }
  .search-field {
    width: 100%;
  }
}
</style>
