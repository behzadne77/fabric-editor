import { useCanvasStore } from '@/stores/canvas'

// Helper function to generate polygon points
const generatePolygonPoints = (sides, radius) => {
  const points = []
  for (let i = 0; i < sides; i++) {
    const angle = (i * 2 * Math.PI) / sides - Math.PI / 2
    points.push({
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle)
    })
  }
  return points
}

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
        fill: shapeConfig.config.fill || 'transparent',
        stroke: shapeConfig.config.stroke || '#000000',
        strokeWidth: shapeConfig.config.strokeWidth || 2
      })
      break

    case 'diamond':
      fabricObject = new window.fabric.Path(
        'M 0 -50 L 50 0 L 0 50 L -50 0 Z',
        {
          ...shapeConfig.config,
          id: shapeConfig.id,
          left: shapeConfig.config.left || 100,
          top: shapeConfig.config.top || 100,
          fill: shapeConfig.config.fill || 'transparent',
          stroke: shapeConfig.config.stroke || '#000000',
          strokeWidth: shapeConfig.config.strokeWidth || 2
        }
      )
      break

    case 'triangle':
      fabricObject = new window.fabric.Triangle({
        ...shapeConfig.config,
        id: shapeConfig.id,
        left: shapeConfig.config.left || 100,
        top: shapeConfig.config.top || 100,
        width: shapeConfig.config.width || 100,
        height: shapeConfig.config.height || 100,
        fill: shapeConfig.config.fill || 'transparent',
        stroke: shapeConfig.config.stroke || '#000000',
        strokeWidth: shapeConfig.config.strokeWidth || 2
      })
      break

    case 'polygon':
      const sides = shapeConfig.config.sides || 6
      const radius = shapeConfig.config.radius || 50
      const points = generatePolygonPoints(sides, radius)
      
      fabricObject = new window.fabric.Polygon(points, {
        ...shapeConfig.config,
        id: shapeConfig.id,
        left: shapeConfig.config.left || 100,
        top: shapeConfig.config.top || 100,
        fill: shapeConfig.config.fill || 'transparent',
        stroke: shapeConfig.config.stroke || '#000000',
        strokeWidth: shapeConfig.config.strokeWidth || 2
      })
      break

    case 'star':
      const starPoints = []
      const starRadius = shapeConfig.config.radius || 50
      const starSpikes = shapeConfig.config.spikes || 5
      
      for (let i = 0; i < starSpikes * 2; i++) {
        const radius = i % 2 === 0 ? starRadius : starRadius / 2
        const angle = (i * Math.PI) / starSpikes - Math.PI / 2
        starPoints.push({
          x: radius * Math.cos(angle),
          y: radius * Math.sin(angle)
        })
      }
      
      fabricObject = new window.fabric.Polygon(starPoints, {
        ...shapeConfig.config,
        id: shapeConfig.id,
        left: shapeConfig.config.left || 100,
        top: shapeConfig.config.top || 100,
        fill: shapeConfig.config.fill || 'transparent',
        stroke: shapeConfig.config.stroke || '#000000',
        strokeWidth: shapeConfig.config.strokeWidth || 2
      })
      break

    case 'heart':
      fabricObject = new window.fabric.Path(
        'M 0 0 C -25 -25 -50 -25 -50 0 C -50 25 -25 50 0 75 C 25 50 50 25 50 0 C 50 -25 25 -25 0 0 Z',
        {
          ...shapeConfig.config,
          id: shapeConfig.id,
          left: shapeConfig.config.left || 100,
          top: shapeConfig.config.top || 100,
          scaleX: 0.5,
          scaleY: 0.5,
          fill: shapeConfig.config.fill || 'transparent',
          stroke: shapeConfig.config.stroke || '#000000',
          strokeWidth: shapeConfig.config.strokeWidth || 2
        }
      )
      break

    case 'comment':
      fabricObject = new window.fabric.Path(
        'M 0 0 L 100 0 L 100 60 L 80 60 L 70 80 L 60 60 L 0 60 Z',
        {
          ...shapeConfig.config,
          id: shapeConfig.id,
          left: shapeConfig.config.left || 100,
          top: shapeConfig.config.top || 100,
          fill: shapeConfig.config.fill || 'transparent',
          stroke: shapeConfig.config.stroke || '#000000',
          strokeWidth: shapeConfig.config.strokeWidth || 2
        }
      )
      break

    case 'cloud':
      fabricObject = new window.fabric.Path(
        'M 20 40 C 10 40 0 35 0 25 C 0 15 10 10 20 10 C 25 0 35 0 40 10 C 55 10 65 15 65 25 C 65 35 55 40 40 40 Z',
        {
          ...shapeConfig.config,
          id: shapeConfig.id,
          left: shapeConfig.config.left || 100,
          top: shapeConfig.config.top || 100,
          fill: shapeConfig.config.fill || 'transparent',
          stroke: shapeConfig.config.stroke || '#000000',
          strokeWidth: shapeConfig.config.strokeWidth || 2
        }
      )
      break
  }

  if (fabricObject) {
    canvas.add(fabricObject)
    canvas.requestRenderAll()
  }
} 