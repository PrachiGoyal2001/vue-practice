import { ref } from 'vue'
import { defineStore } from 'pinia'
import { loginService } from '../services/auth'

export const useAuthStore = defineStore('authStore', () => {
  const isUserAuthenticated = ref(false)

  const registerUser = (userDetails) => {
    return loginService().registerUser(userDetails)
  }
  const loginUser = (userDetails) => {
    return loginService().loginUser(userDetails)
  }
  const logoutUser = () => {
    loginService().logoutUser()
  }
  return { isUserAuthenticated, registerUser, loginUser, logoutUser }
})
