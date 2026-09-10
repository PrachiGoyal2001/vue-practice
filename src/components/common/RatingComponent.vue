<template>
  <div class="star-rating-wrapper">
    <!-- 1. Define the dynamic gradient globally or per star -->
    <svg width="0" height="0" style="position: absolute">
      <defs>
        <linearGradient :id="gradientId" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop :offset="percentageString" stop-color="#FFD700" />
          <stop :offset="percentageString" stop-color="#E0E0E0" />
        </linearGradient>
      </defs>
    </svg>

    <!-- 2. Render the MDI Star component and force its fill via CSS -->
    <StarIcon class="rating-star" :style="{ fill: `url(#${gradientId})` }" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import StarIcon from 'vue-material-design-icons/Star.vue'

const props = defineProps({
  // Accept a percentage (0 to 100) or calculate it from a 0-5 rating scale
  ratingPercentage: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 100,
  },
  // Ensure unique IDs if multiple partial stars are rendered on the same page
  id: {
    type: String,
    default: () => `star-grad-${Math.random().toString(36).substr(2, 9)}`,
  },
})

const gradientId = computed(() => props.id)
const percentageString = computed(() => `${props.ratingPercentage}%`)
</script>

<style scoped>
/* Target the inner SVG path injected by vue-material-design-icons */
.rating-star :deep(svg) {
  /* Let the linear gradient dictate the color fill */
  fill: inherit;
  height: 30px;
  width: 30px;
}
</style>
