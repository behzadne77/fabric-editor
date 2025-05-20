import { useCanvasStore } from '@/stores/canvas'

// Selection and Object Management
export const deleteSelectedObject = () => {
  const canvasStore = useCanvasStore()
  const canvas = canvasStore.getCanvas()
  
  if (!canvas) return
  
  const activeObject = canvas.getActiveObject()
  if (activeObject) {
    canvas.remove(activeObject)
    canvas.requestRenderAll()
  }
}

export const bringToFront = () => {
  const canvasStore = useCanvasStore()
  const canvas = canvasStore.getCanvas()
  
  if (!canvas) return
  
  const activeObject = canvas.getActiveObject()
  if (activeObject) {
    activeObject.bringToFront()
    canvas.requestRenderAll()
  }
}

export const sendToBack = () => {
  const canvasStore = useCanvasStore()
  const canvas = canvasStore.getCanvas()
  
  if (!canvas) return
  
  const activeObject = canvas.getActiveObject()
  if (activeObject) {
    activeObject.sendToBack()
    canvas.requestRenderAll()
  }
}

// Shape Creation and Management
export const addShape = (shapeConfig) => {
  const canvasStore = useCanvasStore()
  const canvas = canvasStore.getCanvas()
  
  if (!canvas) return

  let fabricObject

  switch (shapeConfig.type) {
    case 'rectangle':
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

    case 'diamond':
      fabricObject = new window.fabric.Rect({
        ...shapeConfig.config,
        id: shapeConfig.id,
        left: shapeConfig.config.left || 100,
        top: shapeConfig.config.top || 100,
        width: shapeConfig.config.width || 100,
        height: shapeConfig.config.height || 100,
        angle: 45,
        fill: shapeConfig.config.fill || '#00a8ff',
        stroke: shapeConfig.config.stroke || '#000000',
        strokeWidth: shapeConfig.config.strokeWidth || 2
      })
      break

    case 'triangle':
      fabricObject = new window.fabric.Polygon(
        shapeConfig.config.points || [
          { x: 0, y: 100 },
          { x: 50, y: 0 },
          { x: 100, y: 100 }
        ],
        {
          ...shapeConfig.config,
          id: shapeConfig.id,
          left: shapeConfig.config.left || 100,
          top: shapeConfig.config.top || 100,
          fill: shapeConfig.config.fill || '#00a8ff',
          stroke: shapeConfig.config.stroke || '#000000',
          strokeWidth: shapeConfig.config.strokeWidth || 2
        }
      )
      break

    case 'polygon':
      fabricObject = new window.fabric.Polygon(
        generatePolygonPoints(
          shapeConfig.config.sides || 6,
          shapeConfig.config.radius || 50,
          shapeConfig.config.angle || 0
        ),
        {
          ...shapeConfig.config,
          id: shapeConfig.id,
          left: shapeConfig.config.left || 100,
          top: shapeConfig.config.top || 100,
          fill: shapeConfig.config.fill || '#00a8ff',
          stroke: shapeConfig.config.stroke || '#000000',
          strokeWidth: shapeConfig.config.strokeWidth || 2
        }
      )
      break

    case 'star':
      const points = []
      const numPoints = shapeConfig.config.numPoints || 5
      const innerRadius = shapeConfig.config.innerRadius || 20
      const outerRadius = shapeConfig.config.outerRadius || 40
      
      for (let i = 0; i < numPoints * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius
        const angle = (i * Math.PI) / numPoints
        points.push({
          x: radius * Math.cos(angle),
          y: radius * Math.sin(angle)
        })
      }
      
      fabricObject = new window.fabric.Polygon(points, {
        ...shapeConfig.config,
        id: shapeConfig.id,
        left: shapeConfig.config.left || 100,
        top: shapeConfig.config.top || 100,
        fill: shapeConfig.config.fill || '#00a8ff',
        stroke: shapeConfig.config.stroke || '#000000',
        strokeWidth: shapeConfig.config.strokeWidth || 2
      })
      break

    case 'heart':
      fabricObject = new window.fabric.Path(shapeConfig.config.path, {
        ...shapeConfig.config,
        id: shapeConfig.id,
        left: shapeConfig.config.left || 100,
        top: shapeConfig.config.top || 100,
        fill: shapeConfig.config.fill || '#00a8ff',
        stroke: shapeConfig.config.stroke || '#000000',
        strokeWidth: shapeConfig.config.strokeWidth || 2
      })
      break

    case 'comment':
      // Create the main comment box
      const commentBox = new window.fabric.Rect({
        ...shapeConfig.config,
        id: shapeConfig.id,
        left: shapeConfig.config.left || 100,
        top: shapeConfig.config.top || 100,
        width: shapeConfig.config.width || 100,
        height: shapeConfig.config.height || 80,
        rx: shapeConfig.config.rx || 10,
        ry: shapeConfig.config.ry || 10,
        fill: shapeConfig.config.fill || '#00a8ff',
        stroke: shapeConfig.config.stroke || '#000000',
        strokeWidth: shapeConfig.config.strokeWidth || 2
      })

      // Create the comment tail (triangle)
      const tailPoints = [
        { x: 0, y: 0 },
        { x: 20, y: 0 },
        { x: 10, y: 15 }
      ]
      
      const commentTail = new window.fabric.Polygon(tailPoints, {
        left: (shapeConfig.config.left || 100) + 20,
        top: (shapeConfig.config.top || 100) + (shapeConfig.config.height || 80),
        fill: shapeConfig.config.fill || '#00a8ff',
        stroke: shapeConfig.config.stroke || '#000000',
        strokeWidth: shapeConfig.config.strokeWidth || 2
      })

      // Create a group with both the box and tail
      fabricObject = new window.fabric.Group([commentBox, commentTail], {
        id: shapeConfig.id
      })
      break

    case 'cloud':
      fabricObject = new window.fabric.Path(shapeConfig.config.path, {
        ...shapeConfig.config,
        id: shapeConfig.id,
        left: shapeConfig.config.left || 100,
        top: shapeConfig.config.top || 100,
        fill: shapeConfig.config.fill || '#00a8ff',
        stroke: shapeConfig.config.stroke || '#000000',
        strokeWidth: shapeConfig.config.strokeWidth || 2
      })
      break
  }

  if (fabricObject) {
    canvas.add(fabricObject)
    canvas.requestRenderAll()
  }
}

// Helper function to generate polygon points
const generatePolygonPoints = (sides, radius, angle) => {
  const points = []
  for (let i = 0; i < sides; i++) {
    const angleRad = (angle + (i * 360 / sides)) * Math.PI / 180
    points.push({
      x: radius * Math.cos(angleRad),
      y: radius * Math.sin(angleRad)
    })
  }
  return points
}

// Canvas State Management
export const clearCanvas = () => {
  const canvasStore = useCanvasStore()
  const canvas = canvasStore.getCanvas()
  
  if (!canvas) return
  
  canvas.clear()
  canvas.requestRenderAll()
}

export const saveCanvasState = () => {
  const canvasStore = useCanvasStore()
  const canvas = canvasStore.getCanvas()
  
  if (!canvas) return
  
  return JSON.stringify(canvas.toJSON())
}

export const loadCanvasState = (json) => {
  const canvasStore = useCanvasStore()
  const canvas = canvasStore.getCanvas()
  
  if (!canvas) return
  
  canvas.loadFromJSON(json, () => {
    canvas.requestRenderAll()
  })
}

// Object Manipulation
export const duplicateSelectedObject = () => {
  const canvasStore = useCanvasStore()
  const canvas = canvasStore.getCanvas()
  
  if (!canvas) return
  
  const activeObject = canvas.getActiveObject()
  if (activeObject) {
    activeObject.clone((cloned) => {
      canvas.discardActiveObject()
      cloned.set({
        left: cloned.left + 10,
        top: cloned.top + 10,
        evented: true,
      })
      canvas.add(cloned)
      canvas.setActiveObject(cloned)
      canvas.requestRenderAll()
    })
  }
}

export const groupSelectedObjects = () => {
  const canvasStore = useCanvasStore()
  const canvas = canvasStore.getCanvas()
  
  if (!canvas) return
  
  const activeObjects = canvas.getActiveObjects()
  if (activeObjects.length > 1) {
    const group = new window.fabric.Group(activeObjects, {
      originX: 'center',
      originY: 'center'
    })
    canvas.discardActiveObject()
    canvas.add(group)
    canvas.setActiveObject(group)
    canvas.requestRenderAll()
  }
}

export const ungroupSelectedObjects = () => {
  const canvasStore = useCanvasStore()
  const canvas = canvasStore.getCanvas()
  
  if (!canvas) return
  
  const activeObject = canvas.getActiveObject()
  if (activeObject && activeObject.type === 'group') {
    const items = activeObject.getObjects()
    canvas.remove(activeObject)
    items.forEach(item => {
      canvas.add(item)
    })
    canvas.requestRenderAll()
  }
}

// Canvas View Management
export const zoomIn = () => {
  const canvasStore = useCanvasStore()
  const canvas = canvasStore.getCanvas()
  
  if (!canvas) return
  
  const zoom = canvas.getZoom()
  canvas.setZoom(zoom * 1.1)
  canvas.requestRenderAll()
}

export const zoomOut = () => {
  const canvasStore = useCanvasStore()
  const canvas = canvasStore.getCanvas()
  
  if (!canvas) return
  
  const zoom = canvas.getZoom()
  canvas.setZoom(zoom / 1.1)
  canvas.requestRenderAll()
}

export const resetZoom = () => {
  const canvasStore = useCanvasStore()
  const canvas = canvasStore.getCanvas()
  
  if (!canvas) return
  
  canvas.setZoom(1)
  canvas.requestRenderAll()
}

// Export Functions
export const exportToJSON = () => {
  const canvasStore = useCanvasStore()
  const canvas = canvasStore.getCanvas()
  
  if (!canvas) return
  
  return JSON.stringify(canvas.toJSON())
}

export const exportToImage = () => {
  const canvasStore = useCanvasStore()
  const canvas = canvasStore.getCanvas()
  
  if (!canvas) return
  
  return canvas.toDataURL({
    format: 'png',
    quality: 1
  })
} 