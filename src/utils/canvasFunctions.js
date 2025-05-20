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