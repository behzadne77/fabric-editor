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
      // Calculate the arrow head points
      const x1 = lineConfig.config.x1 || 0
      const y1 = lineConfig.config.y1 || 0
      const x2 = lineConfig.config.x2 || 100
      const y2 = lineConfig.config.y2 || 0

      // Calculate angle for arrow head
      const angle = Math.atan2(y2 - y1, x2 - x1)
      const arrowSize = 10

      // Calculate arrow head points
      const arrowX1 = x2 - arrowSize * Math.cos(angle - Math.PI / 6)
      const arrowY1 = y2 - arrowSize * Math.sin(angle - Math.PI / 6)
      const arrowX2 = x2 - arrowSize * Math.cos(angle + Math.PI / 6)
      const arrowY2 = y2 - arrowSize * Math.sin(angle + Math.PI / 6)

      // Create path for line and arrow
      const pathData = `M ${x1} ${y1} L ${x2} ${y2} M ${x2} ${y2} L ${arrowX1} ${arrowY1} M ${x2} ${y2} L ${arrowX2} ${arrowY2}`

      fabricObject = new window.fabric.Path(pathData, {
        id: lineConfig.id,
        left: lineConfig.config.left || 100,
        top: lineConfig.config.top || 100,
        stroke: lineConfig.config.stroke || '#000000',
        strokeWidth: lineConfig.config.strokeWidth || 2,
        fill: 'transparent'
      })
      break

    case 'double-arrow':
      // Calculate the arrow head points
      const dx1 = lineConfig.config.x1 || 0
      const dy1 = lineConfig.config.y1 || 0
      const dx2 = lineConfig.config.x2 || 100
      const dy2 = lineConfig.config.y2 || 0

      // Calculate angle for arrow heads
      const arrowAngle = Math.atan2(dy2 - dy1, dx2 - dx1)
      const dArrowSize = 10

      // Calculate start arrow head points
      const startArrowX1 = dx1 + dArrowSize * Math.cos(arrowAngle + Math.PI / 6)
      const startArrowY1 = dy1 + dArrowSize * Math.sin(arrowAngle + Math.PI / 6)
      const startArrowX2 = dx1 + dArrowSize * Math.cos(arrowAngle - Math.PI / 6)
      const startArrowY2 = dy1 + dArrowSize * Math.sin(arrowAngle - Math.PI / 6)

      // Calculate end arrow head points
      const endArrowX1 = dx2 - dArrowSize * Math.cos(arrowAngle - Math.PI / 6)
      const endArrowY1 = dy2 - dArrowSize * Math.sin(arrowAngle - Math.PI / 6)
      const endArrowX2 = dx2 - dArrowSize * Math.cos(arrowAngle + Math.PI / 6)
      const endArrowY2 = dy2 - dArrowSize * Math.sin(arrowAngle + Math.PI / 6)

      // Create path for line and both arrows
      const doublePathData = `M ${dx1} ${dy1} L ${dx2} ${dy2} 
        M ${dx1} ${dy1} L ${startArrowX1} ${startArrowY1} 
        M ${dx1} ${dy1} L ${startArrowX2} ${startArrowY2}
        M ${dx2} ${dy2} L ${endArrowX1} ${endArrowY1}
        M ${dx2} ${dy2} L ${endArrowX2} ${endArrowY2}`

      fabricObject = new window.fabric.Path(doublePathData, {
        id: lineConfig.id,
        left: lineConfig.config.left || 100,
        top: lineConfig.config.top || 100,
        stroke: lineConfig.config.stroke || '#000000',
        strokeWidth: lineConfig.config.strokeWidth || 2,
        fill: 'transparent'
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