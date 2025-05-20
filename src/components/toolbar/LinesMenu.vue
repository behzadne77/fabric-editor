<template>
    <div class="flex flex-col gap-2 p-4">
      <el-button
        v-for="line in lines"
        :key="line.name"
        :type="store.currentTool === line.name ? 'primary' : 'default'"
        @click="handleLineClick(line)"
      >
        <Icon :icon="line.icon" class="mr-2 text-lg" />
        {{ line.label }}
      </el-button>
    </div>
  </template>
  
  <script setup>
  import { Icon } from '@iconify/vue'
  import { useShapesStore } from '../../stores/shapes'
  import { addShape } from '../../utils/canvasFunctions'
  
  const store = useShapesStore()
  
  const lines = [
    { name: 'straight', label: 'Straight Line', icon: 'mdi:vector-line' },
    { name: 'arrow', label: 'Arrow', icon: 'mdi:arrow-right' },
    { name: 'dashed', label: 'Dashed Line', icon: 'mdi:dots-horizontal' }
  ]
  
  const handleLineClick = (line) => {
    store.setCurrentTool(line.name)
    
    const lineConfig = {
      id: Date.now().toString(),
      type: 'line',
      config: {
        left: 100,
        top: 100,
        x1: 0,
        y1: 0,
        x2: 100,
        y2: 0,
        stroke: '#000000',
        strokeWidth: 2
      }
    }
  
    switch (line.name) {
      case 'straight':
        lineConfig.config.strokeDashArray = []
        break
      case 'arrow':
        lineConfig.config.strokeDashArray = []
        lineConfig.config.strokeLineCap = 'round'
        lineConfig.config.strokeLineJoin = 'round'
        // Add arrow head
        lineConfig.config.path = 'M 0,0 L 100,0 L 90,-5 M 100,0 L 90,5'
        break
      case 'dashed':
        lineConfig.config.strokeDashArray = [5, 5]
        break
    }
  
    addShape(lineConfig)
  }
  </script> 