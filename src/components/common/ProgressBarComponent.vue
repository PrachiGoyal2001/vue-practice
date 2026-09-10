<template>
  <div>
    <div
      :style="{
        width: '400px',
        height: '25px',
        border: '2px solid black',
        borderRadius: '10px',
        marginBottom: '10px',
        position: 'relative',
        color: 'black',
        zIndex: 9999,
        overflow: 'hidden',
      }"
    >
      <div
        :style="{
          width: '100%',
          height: '100%',
          textAlign: 'center',
          position: 'absolute',
          zIndex: 100,
        }"
      >
        {{ percentage }} %
      </div>
      <div :style="getStyle"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  percentage: {
    type: Number,
    required: true,
    default: 0,
  },
})

const getStyle = computed(() => ({
  height: '100%',
  position: 'absolute',
  zIndex: 99,
  width: `${props.percentage}%`,
  backgroundColor: getColor(),
  transition: 'width 0.3s ease-in',
}))

const getColor = () => {
  if (props.percentage < 40) return 'red'
  else if (props.percentage >= 40 && props.percentage < 80) return 'orange'
  else return 'green'
}
</script>

<style scoped></style>
