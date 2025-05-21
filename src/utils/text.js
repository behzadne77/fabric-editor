import { useCanvasStore } from '@/stores/canvas'
// Utility functions for text elements on the canvas

export function createTextElement({ text = 'New Text', x = 100, y = 100, fontSize = 24, color = '#222' } = {}) {
  return {
    type: 'text',
    text,
    x,
    y,
    fontSize,
    color,
    id: `text-id_${Date.now()}_${Math.floor(Math.random() * 10000)}`
  }
}

// Text Management
export const addTextToCanvas = (textElement) => {
  const canvasStore = useCanvasStore()
  const canvas = canvasStore.getCanvas()
  
  if (!canvas) return
  
  const fabricText = new window.fabric.Textbox(textElement.text, {
    left: textElement.x,
    top: textElement.y,
    fontSize: textElement.fontSize,
    fill: textElement.color,
    id: textElement.id,
    width: 200, // Default width for textbox
    editable: true,
    cursorColor: '#000',
    cursorWidth: 2,
    padding: 5
  })
  
  canvas.add(fabricText)
  canvas.setActiveObject(fabricText)
  canvas.requestRenderAll()
} 