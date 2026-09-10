<template>
  <AuthComponent @userInfo="userInfo" />
</template>

<script setup>
import { useRouter } from 'vue-router'
import AuthComponent from '../components/AuthComponent/AuthComponent.vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const router = useRouter()

const userInfo = async ({ userDetails, isRegister }) => {
  let data = null
  if (isRegister.value) {
    data = await authStore.registerUser(userDetails.value) // It showed ... on await as return was not written in its function of Service and Store file
  } else {
    data = await authStore.loginUser(userDetails.value)
  }
  localStorage.setItem('user_token', data.accessToken)
  localStorage.setItem('refresh_token', data.refreshToken)
  authStore.isUserAuthenticated = true
  router.push('/')
}
</script>

<style scoped></style>
