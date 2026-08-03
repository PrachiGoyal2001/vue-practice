<template>
  <div>
    <div :style="getStyle">
      <div
        :style="{
          width: '40px',
          height: '40px',
          position: 'absolute',
          zIndex: 100,
          border: '2px solid black',
          borderRadius: '100%',
          display: 'flex',
          'justify-content': 'center',
          'align-items': 'center',
          'background-color': '#fff',
        }"
      >
        {{ percentage + '%' }}
      </div>
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
  '--percentage': `${props.percentage}%`,
  position: 'relative',
  width: '50px',
  height: '50px',
  'border-radius': '100%',
  border: '2px solid black',
  display: 'flex',
  'justify-content': 'center',
  'align-items': 'center',
  background: `conic-gradient(${getColor()} var(--percentage),#e5e7eb 0)`, //It means --percentage of progress bar will be
  // filled with getColor with remaining portain will be filled with #e5e7eb
  transition: '--percentage 0.6s ease-in-out',
}))

const getColor = () => {
  if (props.percentage < 40) return 'red'
  else if (props.percentage >= 40 && props.percentage < 80) return 'orange'
  else return 'green'
}
</script>

<style scoped>
/* CSS Variable can't be animated directly. The reason they animate because of @property rule */
@property --percentage {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 0%;
}
</style>
