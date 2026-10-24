<template>
  <div>
    <div class="toys">
      <div draggable="true" class="toy teddy">🧸</div>
      <div draggable="true" class="toy car">🚗</div>
      <div draggable="true" class="toy suitcase">🧳</div>
      <div draggable="true" class="toy train">🚅</div>
    </div>

    <div class="basket" ref="basketRef"></div>
  </div>
</template>

<script setup>
import { onMounted, useTemplateRef } from 'vue'

const basketRef = useTemplateRef('basketRef')

onMounted(() => {
  const toys = document.querySelectorAll('.toy')
  const basket = basketRef.value
  if (!basket) return
  toys.forEach((toy) => {
    toy.addEventListener('drag', () => {
      console.log('drag')
    })
    toy.addEventListener('dragstart', (e) => {
      // Here we set css to transparent dragged image
      console.log('dragstart')
      if (e.dataTransfer) {
        e.dataTransfer.setData('text/plain', e.target.innerHTML)
      }
    })
  })
  basket.addEventListener('dragenter', (e) => {
    console.log('dragenter')
    basket.style.backgroundColor = 'lightgreen'
  })
  basket.addEventListener('dragleave', (e) => {
    console.log('dragleave')
    basket.style.backgroundColor = 'yellow'
  })
  basket.addEventListener('dragover', (e) => {
    e.preventDefault()
  })
  basket.addEventListener('drop', (e) => {
    console.log('drop')
    e.preventDefault() // Browser default behaviour to open file which is dragged.To get prevent from it, we use preventDefault
    if (e.dataTransfer) {
      const toyEmoji = e.dataTransfer.getData('text')
      const newToy = document.createElement('div')
      newToy.innerHTML = toyEmoji
      newToy.style.fontSize = '50px'
      newToy.style.display = 'inline-block'
      newToy.style.margin = '5px'
      basket.appendChild(newToy)
    }
    basket.style.backgroundColor = 'lavender'
  })
})
</script>

<style scoped>
.toys {
  font-size: 100px;
  display: flex;
  gap: 150px;
}
.basket {
  width: 300px;
  height: 300px;
  background: black;
}
</style>
