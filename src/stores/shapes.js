import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShapesStore = defineStore('shapes', () => {
  const shapes = ref([])
  const currentTool = ref(null)

  const addShape = (shape) => {
    shapes.value.push({
      id: Date.now(),
      ...shape
    })
  }

  const removeShape = (id) => {
    shapes.value = shapes.value.filter(shape => shape.id !== id)
  }

  const updateShape = (id, newConfig) => {
    const shapeIndex = shapes.value.findIndex(shape => shape.id === id)
    if (shapeIndex !== -1) {
      shapes.value[shapeIndex].config = newConfig
    }
  }

  const setCurrentTool = (tool) => {
    currentTool.value = tool
  }

  return {
    shapes,
    currentTool,
    addShape,
    removeShape,
    updateShape,
    setCurrentTool
  }
}) 