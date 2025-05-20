import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { configureObjectDefaults, configureControls } from '../units/controls'

export const useCanvasStore = defineStore('canvas', () => {
  const canvas = ref(null)
  let fabricCanvas = reactive({})
  const selectedObject = ref(null)

  const initCanvas = (fabricObject) => {
    fabricCanvas = fabricObject

    // Configure fabric defaults
    window.fabric.Object.prototype.set(configureObjectDefaults())
    window.fabric.Object.prototype.controls = configureControls()

    // Add selection event listeners
    fabricCanvas.on('selection:created', (e) => {
      selectedObject.value = e.selected[0]
    })

    fabricCanvas.on('selection:updated', (e) => {
      selectedObject.value = e.selected[0]
    })

    fabricCanvas.on('selection:cleared', () => {
      selectedObject.value = null
    })
  }
  
  const getCanvas = () => {
    return fabricCanvas
  }

  const addShape = (shapeConfig) => {
    if (!fabricCanvas) return

    let fabricObject

    switch (shapeConfig.type) {
      case 'circle':
        fabricObject = new window.fabric.Circle({
          ...shapeConfig.config,
          id: shapeConfig.id,
          left: shapeConfig.config.left || 100,
          top: shapeConfig.config.top || 100,
          radius: shapeConfig.config.radius || 50,
          fill: shapeConfig.config.fill || '#00a8ff',
          stroke: shapeConfig.config.stroke || '#000000',
          strokeWidth: shapeConfig.config.strokeWidth || 2
        })
        break

      case 'square':
        fabricObject = new window.fabric.Rect({
          ...shapeConfig.config,
          id: shapeConfig.id,
          left: shapeConfig.config.left || 100,
          top: shapeConfig.config.top || 100,
          width: shapeConfig.config.width || 100,
          height: shapeConfig.config.height || 100,
          fill: shapeConfig.config.fill || '#00a8ff',
          stroke: shapeConfig.config.stroke || '#000000',
          strokeWidth: shapeConfig.config.strokeWidth || 2
        })
        break

      case 'star':
        fabricObject = new window.fabric.Star({
          ...shapeConfig.config,
          id: shapeConfig.id,
          left: shapeConfig.config.left || 100,
          top: shapeConfig.config.top || 100,
          numPoints: 5,
          innerRadius: shapeConfig.config.innerRadius || 20,
          outerRadius: shapeConfig.config.outerRadius || 40,
          fill: shapeConfig.config.fill || '#00a8ff',
          stroke: shapeConfig.config.stroke || '#000000',
          strokeWidth: shapeConfig.config.strokeWidth || 2
        })
        break

      case 'triangle':
        fabricObject = new window.fabric.Triangle({
          ...shapeConfig.config,
          id: shapeConfig.id,
          left: shapeConfig.config.left || 100,
          top: shapeConfig.config.top || 100,
          width: shapeConfig.config.width || 100,
          height: shapeConfig.config.height || 100,
          fill: shapeConfig.config.fill || '#00a8ff',
          stroke: shapeConfig.config.stroke || '#000000',
          strokeWidth: shapeConfig.config.strokeWidth || 2
        })
        break

      case 'ellipse':
        fabricObject = new window.fabric.Ellipse({
          ...shapeConfig.config,
          id: shapeConfig.id,
          left: shapeConfig.config.left || 100,
          top: shapeConfig.config.top || 100,
          rx: shapeConfig.config.radiusX || 50,
          ry: shapeConfig.config.radiusY || 30,
          fill: shapeConfig.config.fill || '#00a8ff',
          stroke: shapeConfig.config.stroke || '#000000',
          strokeWidth: shapeConfig.config.strokeWidth || 2
        })
        break
    }
    console.log("Fabric Object", fabricObject)

    if (fabricObject) {
      fabricCanvas.add(fabricObject)
      fabricCanvas.requestRenderAll()
    }
  }

  return {
    canvas,
    fabricCanvas,
    selectedObject,
    initCanvas,
    addShape,
    getCanvas
  }
}) 