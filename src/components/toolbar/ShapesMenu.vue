<template>
  <div class="flex flex-wrap gap-2 p-4">
    <el-button
      v-for="shape in shapes"
      :key="shape.name"
      :type="store.currentTool === shape.name ? 'primary' : 'default'"
      text
      bg
      class="!p-3 text-5xl w-16 h-16"
      @click="handleShapeClick(shape)"
    >
      <Icon :icon="shape.icon" size="44" />
    </el-button>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useShapesStore } from '../../stores/shapes'
import { addShape } from '../../utils/canvasFunctions'

const store = useShapesStore()

const shapes = [
  { name: 'rectangle', icon: 'mdi:square-outline' },
  { name: 'diamond', icon: 'mdi:diamond-outline' },
  { name: 'triangle', icon: 'mdi:triangle-outline' },
  { name: 'polygon', icon: 'mdi:hexagon-outline' },
  { name: 'star', icon: 'mdi:star-outline' },
  { name: 'heart', icon: 'mdi:heart-outline' },
  { name: 'comment', icon: 'mdi:comment-outline' },
  { name: 'cloud', icon: 'mdi:cloud-outline' }
]

const handleShapeClick = (shape) => {
  store.setCurrentTool(shape.name)
  
  const shapeConfig = {
    id: Date.now().toString(),
    type: shape.name,
    config: {
      left: 100,
      top: 100,
      fill: '#00a8ff',
      stroke: '#000000',
      strokeWidth: 2,
      width: 100,
      height: 100
    }
  }

  switch (shape.name) {
    case 'rectangle':
      // Rectangle is already configured with default width and height
      break
    case 'diamond':
      shapeConfig.config.angle = 45
      break
    case 'triangle':
      shapeConfig.config.points = [
        { x: 0, y: 100 },
        { x: 50, y: 0 },
        { x: 100, y: 100 }
      ]
      break
    case 'polygon':
      shapeConfig.config.radius = 50
      shapeConfig.config.sides = 6
      shapeConfig.config.angle = 0
      break
    case 'star':
      shapeConfig.config.numPoints = 5
      shapeConfig.config.innerRadius = 20
      shapeConfig.config.outerRadius = 40
      break
    case 'heart':
      shapeConfig.config.path = 'M 50,30 A 20,20 0 0,1 90,30 A 20,20 0 0,1 130,30 Q 130,60 90,90 Q 50,60 50,30 Z'
      break
    case 'comment':
      shapeConfig.config.rx = 10
      shapeConfig.config.ry = 10
      break
    case 'cloud':
      shapeConfig.config.path = 'M 25,60 Q 20,60 20,55 Q 20,50 25,50 Q 30,50 30,45 Q 30,40 35,40 Q 40,40 40,45 Q 45,45 45,50 Q 50,50 50,55 Q 50,60 45,60 Z'
      break
  }

  addShape(shapeConfig)
}
</script> 
