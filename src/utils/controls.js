// Custom control renderer
export function renderCircleControl(ctx, left, top, styleOverride, fabricObject) {
    const size = this.cornerSize || 12
    ctx.save()
    ctx.beginPath()
    ctx.arc(left, top, size/2, 0, 2 * Math.PI, false)
    ctx.fillStyle = this.cornerColor || '#00a8ff'
    ctx.fill()
    ctx.lineWidth = 2
    ctx.strokeStyle = this.cornerStrokeColor || '#ffffff'
    ctx.stroke()
    ctx.restore()
  }
  
  // Custom rotation control renderer
  export function renderRotationControl(ctx, left, top, styleOverride, fabricObject) {
    const size = this.cornerSize || 16
    ctx.save()
    
    // Draw circle
    ctx.beginPath()
    ctx.arc(left, top, size, 0, 2 * Math.PI, false)
    ctx.fillStyle = '#00a8ff'
    ctx.fill()
    ctx.lineWidth = 2
    ctx.strokeStyle = '#ffffff'
    ctx.stroke()
    
    // Draw rotation icon
    ctx.beginPath()
    ctx.arc(left, top, size * 0.6, -Math.PI * 0.8, Math.PI * 0.8, false)
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 3
    ctx.stroke()
    
    // Draw arrow head
    const arrowSize = size * 0.3
    ctx.beginPath()
    ctx.moveTo(left + size * 0.6 * Math.cos(Math.PI * 0.8), top + size * 0.6 * Math.sin(Math.PI * 0.8))
    ctx.lineTo(left + size * 0.6 * Math.cos(Math.PI * 0.8) - arrowSize * Math.cos(Math.PI * 0.8 + Math.PI * 0.3), 
               top + size * 0.6 * Math.sin(Math.PI * 0.8) - arrowSize * Math.sin(Math.PI * 0.8 + Math.PI * 0.3))
    ctx.lineTo(left + size * 0.6 * Math.cos(Math.PI * 0.8) - arrowSize * Math.cos(Math.PI * 0.8 - Math.PI * 0.3),
               top + size * 0.6 * Math.sin(Math.PI * 0.8) - arrowSize * Math.sin(Math.PI * 0.8 - Math.PI * 0.3))
    ctx.closePath()
    ctx.fillStyle = '#ffffff'
    ctx.fill()
    
    ctx.restore()
  }
  
  // Configure default object properties
  export function configureObjectDefaults() {
    return {
      transparentCorners: false,
      cornerColor: '#00a8ff',
      cornerStrokeColor: '#ffffff',
      cornerSize: 12,
      cornerStyle: 'circle',
      padding: 10,
      borderColor: '#00a8ff',
      borderScaleFactor: 2,
      rotatingPointOffset: 60,
      hasControls: true,
      hasBorders: true
    }
  }
  
  // Configure control points
  export function configureControls() {
    const { scalingYOrSkewingX, scalingXOrSkewingY, rotationWithSnapping, scalingEqually } = window.fabric.controlsUtils
  
    return {
      mt: new window.fabric.Control({
        x: 0,
        y: -0.5,
        actionHandler: scalingYOrSkewingX,
        cursorStyle: 'ns-resize',
        render: renderCircleControl,
        actionName: 'scalingY',
        sizeX: 12,
        sizeY: 12
      }),
      mb: new window.fabric.Control({
        x: 0,
        y: 0.5,
        actionHandler: scalingYOrSkewingX,
        cursorStyle: 'ns-resize',
        render: renderCircleControl,
        actionName: 'scalingY',
        sizeX: 12,
        sizeY: 12
      }),
      ml: new window.fabric.Control({
        x: -0.5,
        y: 0,
        actionHandler: scalingXOrSkewingY,
        cursorStyle: 'ew-resize',
        render: renderCircleControl,
        actionName: 'scalingX',
        sizeX: 12,
        sizeY: 12
      }),
      mr: new window.fabric.Control({
        x: 0.5,
        y: 0,
        actionHandler: scalingXOrSkewingY,
        cursorStyle: 'ew-resize',
        render: renderCircleControl,
        actionName: 'scalingX',
        sizeX: 12,
        sizeY: 12
      }),
      mtr: new window.fabric.Control({
        x: 0,
        y: 0.5,
        actionHandler: rotationWithSnapping,
        cursorStyle: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'><path d=\'M7.11 8.53L5.7 7.11C4.8 8.27 4.24 9.61 4.06 11h2.02c.14-.87.49-1.72 1.03-2.47zM6.09 13H4.06c.18 1.39.74 2.73 1.64 3.89l1.41-1.42c-.52-.75-.87-1.59-1.02-2.47zm1.01 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03L7.1 18.32zM13 4.07V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93z\' fill=\'%23000000\'/></svg>") 12 12, auto',
        render: renderRotationControl,
        actionName: 'rotate',
        sizeX: 24,
        sizeY: 24,
        offsetY: 20
      }),
      bl: new window.fabric.Control({
        x: -0.5,
        y: 0.5,
        actionHandler: scalingEqually,
        cursorStyle: 'ne-resize',
        render: renderCircleControl,
        actionName: 'scaling',
        sizeX: 12,
        sizeY: 12
      }),
      br: new window.fabric.Control({
        x: 0.5,
        y: 0.5,
        actionHandler: scalingEqually,
        cursorStyle: 'nw-resize',
        render: renderCircleControl,
        actionName: 'scaling',
        sizeX: 12,
        sizeY: 12
      }),
      tl: new window.fabric.Control({
        x: -0.5,
        y: -0.5,
        actionHandler: scalingEqually,
        cursorStyle: 'nw-resize',
        render: renderCircleControl,
        actionName: 'scaling',
        sizeX: 12,
        sizeY: 12
      }),
      tr: new window.fabric.Control({
        x: 0.5,
        y: -0.5,
        actionHandler: scalingEqually,
        cursorStyle: 'ne-resize',
        render: renderCircleControl,
        actionName: 'scaling',
        sizeX: 12,
        sizeY: 12
      })
    }
  } 