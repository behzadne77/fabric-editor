import { useCanvasStore } from '@/stores/canvas'

export const addLine = (lineConfig) => {
  const canvasStore = useCanvasStore()
  const canvas = canvasStore.getCanvas()
  
  if (!canvas) return

  let fabricObject

  switch (lineConfig.type) {
    case 'straight':
      fabricObject = new window.fabric.Line(
        [
          lineConfig.config.x1 || 0,
          lineConfig.config.y1 || 0,
          lineConfig.config.x2 || 100,
          lineConfig.config.y2 || 0
        ],
        {
          ...lineConfig.config,
          id: lineConfig.id,
          left: lineConfig.config.left || 100,
          top: lineConfig.config.top || 100,
          stroke: lineConfig.config.stroke || '#000000',
          strokeWidth: lineConfig.config.strokeWidth || 2
        }
      )
      break

    case 'arrow':
      // Create the main line
      const mainLine = new window.fabric.Line(
        [
          lineConfig.config.x1 || 0,
          lineConfig.config.y1 || 0,
          lineConfig.config.x2 || 100,
          lineConfig.config.y2 || 0
        ],
        {
          ...lineConfig.config,
          stroke: lineConfig.config.stroke || '#000000',
          strokeWidth: lineConfig.config.strokeWidth || 2
        }
      )

      // Create arrow head
      const arrowHead = new window.fabric.Path(
        `M ${lineConfig.config.x2 || 100} ${lineConfig.config.y2 || 0} 
         L ${(lineConfig.config.x2 || 100) + 10} ${lineConfig.config.y2 || 0} 
         L ${lineConfig.config.x2 || 100} ${(lineConfig.config.y2 || 0) - 5} 
         L ${lineConfig.config.x2 || 100} ${(lineConfig.config.y2 || 0) + 5} Z`,
        {
          fill: lineConfig.config.stroke || '#000000',
          stroke: lineConfig.config.stroke || '#000000',
          strokeWidth: lineConfig.config.strokeWidth || 2
        }
      )

      // Group the line and arrow head
      fabricObject = new window.fabric.Group([mainLine, arrowHead], {
        id: lineConfig.id,
        left: lineConfig.config.left || 100,
        top: lineConfig.config.top || 100
      })
      break

    case 'double-arrow':
      // Create the main line
      const doubleLine = new window.fabric.Line(
        [
          lineConfig.config.x1 || 0,
          lineConfig.config.y1 || 0,
          lineConfig.config.x2 || 100,
          lineConfig.config.y2 || 0
        ],
        {
          ...lineConfig.config,
          stroke: lineConfig.config.stroke || '#000000',
          strokeWidth: lineConfig.config.strokeWidth || 2
        }
      )

      // Create start arrow head
      const startArrow = new window.fabric.Path(
        `M ${lineConfig.config.x1 || 0} ${lineConfig.config.y1 || 0} 
         L ${(lineConfig.config.x1 || 0) - 10} ${lineConfig.config.y1 || 0} 
         L ${lineConfig.config.x1 || 0} ${(lineConfig.config.y1 || 0) - 5} 
         L ${lineConfig.config.x1 || 0} ${(lineConfig.config.y1 || 0) + 5} Z`,
        {
          fill: lineConfig.config.stroke || '#000000',
          stroke: lineConfig.config.stroke || '#000000',
          strokeWidth: lineConfig.config.strokeWidth || 2
        }
      )

      // Create end arrow head
      const endArrow = new window.fabric.Path(
        `M ${lineConfig.config.x2 || 100} ${lineConfig.config.y2 || 0} 
         L ${(lineConfig.config.x2 || 100) + 10} ${lineConfig.config.y2 || 0} 
         L ${lineConfig.config.x2 || 100} ${(lineConfig.config.y2 || 0) - 5} 
         L ${lineConfig.config.x2 || 100} ${(lineConfig.config.y2 || 0) + 5} Z`,
        {
          fill: lineConfig.config.stroke || '#000000',
          stroke: lineConfig.config.stroke || '#000000',
          strokeWidth: lineConfig.config.strokeWidth || 2
        }
      )

      // Group all elements
      fabricObject = new window.fabric.Group([doubleLine, startArrow, endArrow], {
        id: lineConfig.id,
        left: lineConfig.config.left || 100,
        top: lineConfig.config.top || 100
      })
      break

    case 'dashed':
      fabricObject = new window.fabric.Line(
        [
          lineConfig.config.x1 || 0,
          lineConfig.config.y1 || 0,
          lineConfig.config.x2 || 100,
          lineConfig.config.y2 || 0
        ],
        {
          ...lineConfig.config,
          id: lineConfig.id,
          left: lineConfig.config.left || 100,
          top: lineConfig.config.top || 100,
          stroke: lineConfig.config.stroke || '#000000',
          strokeWidth: lineConfig.config.strokeWidth || 2,
          strokeDashArray: [5, 5]
        }
      )
      break

    case 'dotted':
      fabricObject = new window.fabric.Line(
        [
          lineConfig.config.x1 || 0,
          lineConfig.config.y1 || 0,
          lineConfig.config.x2 || 100,
          lineConfig.config.y2 || 0
        ],
        {
          ...lineConfig.config,
          id: lineConfig.id,
          left: lineConfig.config.left || 100,
          top: lineConfig.config.top || 100,
          stroke: lineConfig.config.stroke || '#000000',
          strokeWidth: lineConfig.config.strokeWidth || 2,
          strokeDashArray: [2, 2]
        }
      )
      break

    case 'curved':
      fabricObject = new window.fabric.Path(
        `M ${lineConfig.config.x1 || 0} ${lineConfig.config.y1 || 0} 
         Q ${(lineConfig.config.x1 + lineConfig.config.x2) / 2 || 50} 
           ${lineConfig.config.y1 - 50 || -50} 
           ${lineConfig.config.x2 || 100} 
           ${lineConfig.config.y2 || 0}`,
        {
          ...lineConfig.config,
          id: lineConfig.id,
          left: lineConfig.config.left || 100,
          top: lineConfig.config.top || 100,
          stroke: lineConfig.config.stroke || '#000000',
          strokeWidth: lineConfig.config.strokeWidth || 2,
          fill: 'transparent'
        }
      )
      break

    case 'zigzag':
      const points = []
      const segments = 5
      const width = lineConfig.config.x2 - lineConfig.config.x1 || 100
      const height = lineConfig.config.y2 - lineConfig.config.y1 || 0
      const segmentWidth = width / segments

      for (let i = 0; i <= segments; i++) {
        points.push({
          x: lineConfig.config.x1 + (i * segmentWidth) || (i * segmentWidth),
          y: lineConfig.config.y1 + (i % 2 === 0 ? 0 : 20) || (i % 2 === 0 ? 0 : 20)
        })
      }

      fabricObject = new window.fabric.Polyline(points, {
        ...lineConfig.config,
        id: lineConfig.id,
        left: lineConfig.config.left || 100,
        top: lineConfig.config.top || 100,
        stroke: lineConfig.config.stroke || '#000000',
        strokeWidth: lineConfig.config.strokeWidth || 2,
        fill: 'transparent'
      })
      break
  }

  if (fabricObject) {
    canvas.add(fabricObject)
    canvas.requestRenderAll()
  }
} 