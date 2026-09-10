<template>
  <ToastComponent />
  <div class="container-width">
    <HeaderComponent v-if="!isAuthPage" />
    <router-view />
  </div>
</template>

<script setup>
import ToastComponent from './components/common/ToastComponent.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed, defineAsyncComponent } from 'vue'

const HeaderComponent = defineAsyncComponent(
  () => import('./components/BaseComponent/HeaderComponent.vue'),
)

const route = useRoute()
const router = useRouter()
const isAuthPage = computed(() => {
  return route.path === '/auth'
})
</script>

<style scoped>
.container-width {
  max-width: calc(100% - 10vw);
  margin: auto;
}
@media screen and (max-width: 768px) {
  .container-width {
    max-width: 100%;
    margin: 0px;
  }
}
</style>
