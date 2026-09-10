<template>
  <div class="auth-form">
    <input type="text" v-model="userDetails.name" placeholder="Your name...." v-if="isRegister" />
    <input type="email" v-model="userDetails.email" placeholder="Your Email...." />
    <input type="password" v-model="userDetails.password" placeholder="Your Password...." />
    <button @click="loginOrSignupUser">{{ isRegister ? 'Register' : 'Login' }}</button>
    <div v-if="!isRegister" class="toggle-form">
      Don't have Account? <span @click="changeForm('register')">Signup</span>
    </div>
    <div class="toggle-form" v-else>
      Already Have Account? <span @click="changeForm('login')">Login</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const userDetails = ref({})

const isRegister = ref(false)

const emit = defineEmits(['userInfo'])

const changeForm = (value) => {
  if (value === 'register') {
    isRegister.value = true
  } else {
    isRegister.value = false
  }
}

const loginOrSignupUser = () => {
  emit('userInfo', { userDetails, isRegister })
}
</script>

<style scoped>
.auth-form {
  border: 2px solid #8f8484;
  border-radius: 10px;
  width: 500px;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding: 50px 10px;
  gap: 10px;
  height: 400px;
  justify-content: center;
  margin-top: 60px;
}
input {
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #d1cfcf;
}
button {
  padding: 10px;
  border-radius: 10px;
  background-color: rgb(65, 65, 219);
  border: none;
  color: #fff;
}
.toggle-form {
  text-align: center;
}
.toggle-form span {
  cursor: pointer;
  font-weight: bold;
}
</style>
