<template>
  <div class="flex flex-col items-center gap-4">
    <el-button type="primary" @click="addText" block class="w-full">Add Text</el-button>
    
    <!-- Text Editing Controls -->
    <div v-if="isTextSelected" class="w-full">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Text Content</label>
        <el-input
          v-model="textState.content"
          type="textarea"
          :rows="3"
          @input="updateTextContent"
          placeholder="Enter text"
        />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Font Family</label>
        <el-select
          v-model="textState.fontFamily"
          class="w-full"
          @change="updateFontFamily"
        >
          <el-option
            v-for="font in fonts"
            :key="font.value"
            :label="font.family"
            :value="font.value"
            :style="{ fontFamily: font.value }"
          />
        </el-select>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
        <el-select
          v-model="textState.fontSize"
          class="w-full"
          @change="updateFontSize"
        >
          <el-option
            v-for="size in fontSizes"
            :key="size"
            :label="size + 'px'"
            :value="size"
          />
        </el-select>
      </div>

      <!-- Font Style Controls -->
      <div class="flex gap-2 mb-4">
        <el-button 
          :type="textState.isBold ? 'primary' : 'default'"
          @click="toggleBold"
        >
          <Icon icon="mdi:format-bold" />
        </el-button>
        <el-button 
          :type="textState.isItalic ? 'primary' : 'default'"
          @click="toggleItalic"
        >
          <Icon icon="mdi:format-italic" />
        </el-button>
        <el-button 
          :type="textState.isUnderline ? 'primary' : 'default'"
          @click="toggleUnderline"
        >
          <Icon icon="mdi:format-underline" />
        </el-button>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Font Color</label>
        <ColorPicker v-model="textState.color" @change="updateFontColor" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { createTextElement, addTextToCanvas } from '../../utils/text'
import { useCanvasStore } from '@/stores/canvas'
import { fonts, loadGoogleFonts } from '../../utils/fonts'
import { Icon } from '@iconify/vue'
import ColorPicker from '@/components/Base/ColorPicker.vue'

const canvasStore = useCanvasStore()
const isTextSelected = ref(false)

const fontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72]

const textState = reactive({
  content: '',
  fontSize: 24,
  color: '#222222',
  fontFamily: 'Arial',
  isBold: false,
  isItalic: false,
  isUnderline: false
})

onMounted(() => {
  loadGoogleFonts()
  const canvas = canvasStore.getCanvas()
  if (canvas) {
    canvas.on('selection:created', checkSelection)
    canvas.on('selection:updated', checkSelection)
    canvas.on('selection:cleared', () => {
      isTextSelected.value = false
    })
  }
})

const addText = () => {
  const textElement = createTextElement({
    text: 'New Text',
    x: 100,
    y: 100,
    fontSize: textState.fontSize,
    color: textState.color
  })
  addTextToCanvas(textElement)
}

const updateFontSize = (value) => {
  const canvas = canvasStore.getCanvas()
  if (!canvas) return

  const activeObject = canvas.getActiveObject()
  if (activeObject && activeObject.type === 'textbox') {
    activeObject.set('fontSize', value)
    canvas.requestRenderAll()
  }
}

const updateTextContent = (value) => {
  const canvas = canvasStore.getCanvas()
  if (!canvas) return

  const activeObject = canvas.getActiveObject()
  if (activeObject && activeObject.type === 'textbox') {
    activeObject.set('text', value)
    canvas.requestRenderAll()
  }
}

const updateFontColor = (value) => {
  console.log("value", value)
  const canvas = canvasStore.getCanvas()
  if (!canvas) return

  const activeObject = canvas.getActiveObject()
  if (activeObject && activeObject.type === 'textbox') {
    activeObject.set('fill', value)
    canvas.requestRenderAll()
  }
}

const updateFontFamily = (value) => {
  const canvas = canvasStore.getCanvas()
  if (!canvas) return

  const activeObject = canvas.getActiveObject()
  if (activeObject && activeObject.type === 'textbox') {
    activeObject.set('fontFamily', value)
    canvas.requestRenderAll()
  }
}

const toggleBold = () => {
  const canvas = canvasStore.getCanvas()
  if (!canvas) return

  const activeObject = canvas.getActiveObject()
  if (activeObject && activeObject.type === 'textbox') {
    textState.isBold = !textState.isBold
    activeObject.set('fontWeight', textState.isBold ? 'bold' : 'normal')
    canvas.requestRenderAll()
  }
}

const toggleItalic = () => {
  const canvas = canvasStore.getCanvas()
  if (!canvas) return

  const activeObject = canvas.getActiveObject()
  if (activeObject && activeObject.type === 'textbox') {
    textState.isItalic = !textState.isItalic
    activeObject.set('fontStyle', textState.isItalic ? 'italic' : 'normal')
    canvas.requestRenderAll()
  }
}

const toggleUnderline = () => {
  const canvas = canvasStore.getCanvas()
  if (!canvas) return

  const activeObject = canvas.getActiveObject()
  if (activeObject && activeObject.type === 'textbox') {
    textState.isUnderline = !textState.isUnderline
    activeObject.set('underline', textState.isUnderline)
    canvas.requestRenderAll()
  }
}

const checkSelection = () => {
  const canvas = canvasStore.getCanvas()
  if (!canvas) return

  const activeObject = canvas.getActiveObject()
  isTextSelected.value = activeObject && activeObject.type === 'textbox'
  
  if (isTextSelected.value) {
    textState.fontSize = activeObject.fontSize
    textState.content = activeObject.text
    textState.color = activeObject.fill
    textState.fontFamily = activeObject.fontFamily
    textState.isBold = activeObject.fontWeight === 'bold'
    textState.isItalic = activeObject.fontStyle === 'italic'
    textState.isUnderline = activeObject.underline
  }
}

onUnmounted(() => {
  const canvas = canvasStore.getCanvas()
  if (canvas) {
    canvas.off('selection:created', checkSelection)
    canvas.off('selection:updated', checkSelection)
    canvas.off('selection:cleared')
  }
})
</script> 