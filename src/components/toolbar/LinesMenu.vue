<template>
  <div class="flex flex-wrap gap-2 p-4">
    <el-button
      v-for="line in lines"
      :key="line.name"
      :type="store.currentTool === line.name ? 'primary' : 'default'"
      text
      bg
      class="!p-3 w-16 h-16 flex items-center justify-center"
      @click="handleLineClick(line)"
    >
      <svg width="40" height="40" viewBox="0 0 40 40" class="stroke-current">
        <!-- Straight Line -->
        <line v-if="line.name === 'straight'" x1="5" y1="20" x2="35" y2="20" stroke-width="2" />
        
        <!-- Arrow -->
        <g v-if="line.name === 'arrow'">
          <line x1="5" y1="20" x2="30" y2="20" stroke-width="2" />
          <path d="M30 20 L25 15 L25 25 Z" fill="none" stroke-width="2" />
        </g>
        
        <!-- Double Arrow -->
        <g v-if="line.name === 'double-arrow'">
          <line x1="8" y1="20" x2="32" y2="20" stroke-width="2" />
          <path d="M8 20 L13 15 L13 25 Z" fill="none" stroke-width="2" />
          <path d="M32 20 L27 15 L27 25 Z" fill="none" stroke-width="2" />
        </g>
        
        <!-- Dashed Line -->
        <line v-if="line.name === 'dashed'" x1="5" y1="20" x2="35" y2="20" stroke-width="2" stroke-dasharray="4" />
        
        <!-- Dotted Line -->
        <line v-if="line.name === 'dotted'" x1="5" y1="20" x2="35" y2="20" stroke-width="2" stroke-dasharray="2" />
        
        <!-- Curved Line -->
        <path v-if="line.name === 'curved'" d="M5 20 Q20 5 35 20" fill="none" stroke-width="2" />
        
        <!-- Zigzag Line -->
        <path v-if="line.name === 'zigzag'" d="M5 20 L15 10 L25 30 L35 20" fill="none" stroke-width="2" />
      </svg>
    </el-button>
  </div>
</template>

<script setup>
import { useShapesStore } from '../../stores/shapes'
import { addLine } from '../../utils/lineFunctions'

const store = useShapesStore()

const lines = [
  { name: 'straight' },
  { name: 'arrow' },
  { name: 'double-arrow' },
  { name: 'dashed' },
  { name: 'dotted' },
  { name: 'curved' },
  { name: 'zigzag' }
]

const handleLineClick = (line) => {
  store.setCurrentTool(line.name)
  
  const lineConfig = {
    id: Date.now().toString(),
    type: line.name,
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

  addLine(lineConfig)
}
</script>

<style scoped>
.stroke-current {
  stroke: currentColor;
}
</style> 