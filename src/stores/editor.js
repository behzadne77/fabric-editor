import { defineStore } from 'pinia'

export const useEditorStore = defineStore('editor', {
  state: () => ({
    shapes: [],
    selectedShape: null,
    currentTool: 'rectangle',
    canvasConfig: {
      width: 800,
      height: 600,
    },
  }),
  
  actions: {
    addShape(shape) {
      this.shapes.push(shape)
    },
    
    removeShape(shapeId) {
      this.shapes = this.shapes.filter(shape => shape.id !== shapeId)
    },
    
    updateShape(shapeId, updates) {
      const shape = this.shapes.find(s => s.id === shapeId)
      if (shape) {
        Object.assign(shape, updates)
      }
    },
    
    setSelectedShape(shape) {
      this.selectedShape = shape
    },
    
    setCurrentTool(tool) {
      this.currentTool = tool
    },
    
    clearCanvas() {
      this.shapes = []
      this.selectedShape = null
    },
    
    saveCanvas() {
      return JSON.stringify({
        shapes: this.shapes,
        canvasConfig: this.canvasConfig,
      })
    },
    
    loadCanvas(data) {
      const parsed = JSON.parse(data)
      this.shapes = parsed.shapes
      this.canvasConfig = parsed.canvasConfig
    },
  },
}) 