<template>
  <div class="min-h-screen bg-gray-100">
    <el-container class="block h-full">
      <EditorHeader 
        @save="saveCanvas"
        @download="downloadCanvas"
      />
      
      <el-container class="h-[calc(100vh-90px)] mt-4">
        <el-aside width="25rem">
          <Toolbar
            :current-tool="currentTool"
            @tool-change="setTool"
            @text-style-change="updateTextStyle"
            @image-select="handleImageSelect"
          />
        </el-aside>
        
        <el-main>
          <Canvas
            ref="canvas"
            :current-tool="currentTool"
            :text-style="textStyle"
            @shape-added="handleShapeAdded"
          />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useEditorStore } from './stores/editor'
import EditorHeader from './components/EditorHeader.vue'
import Toolbar from './components/Toolbar.vue'
import Canvas from './components/Canvas.vue'

const store = useEditorStore()
const canvas = ref(null)
const currentTool = ref('rectangle')
const textStyle = ref({
  fontSize: 16,
  fontFamily: 'Arial',
  color: '#000000'
})

const setTool = (tool) => {
  currentTool.value = tool
}

const updateTextStyle = (style) => {
  textStyle.value = style
}

const handleImageSelect = (image) => {
  // Handle image selection
  console.log('Selected image:', image)
}

const handleShapeAdded = (shape) => {
  store.addShape(shape)
}

const saveCanvas = () => {
  const data = canvas.value.stage.getStage().toJSON()
  localStorage.setItem('canvasData', JSON.stringify(data))
  ElMessage.success('Canvas saved successfully')
}

const downloadCanvas = () => {
  if (!canvas.value) return
  
  const dataURL = canvas.value.stage.getStage().toDataURL()
  const link = document.createElement('a')
  link.download = 'canvas-export.png'
  link.href = dataURL
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  ElMessage.success('Canvas downloaded successfully')
}
</script>

<style>
@import 'element-plus/dist/index.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
</style> 