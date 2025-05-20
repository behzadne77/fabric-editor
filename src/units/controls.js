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
    rotatingPointOffset: 40,
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
      y: -0.5,
      actionHandler: rotationWithSnapping,
      cursorStyle: 'crosshair',
      render: renderCircleControl,
      actionName: 'rotate',
      sizeX: 12,
      sizeY: 12
    }),
    bl: new window.fabric.Control({
      x: -0.5,
      y: 0.5,
      actionHandler: scalingEqually,
      cursorStyle: 'nwse-resize',
      render: renderCircleControl,
      actionName: 'scaling',
      sizeX: 12,
      sizeY: 12
    }),
    br: new window.fabric.Control({
      x: 0.5,
      y: 0.5,
      actionHandler: scalingEqually,
      cursorStyle: 'nwse-resize',
      render: renderCircleControl,
      actionName: 'scaling',
      sizeX: 12,
      sizeY: 12
    }),
    tl: new window.fabric.Control({
      x: -0.5,
      y: -0.5,
      actionHandler: scalingEqually,
      cursorStyle: 'nwse-resize',
      render: renderCircleControl,
      actionName: 'scaling',
      sizeX: 12,
      sizeY: 12
    }),
    tr: new window.fabric.Control({
      x: 0.5,
      y: -0.5,
      actionHandler: scalingEqually,
      cursorStyle: 'nwse-resize',
      render: renderCircleControl,
      actionName: 'scaling',
      sizeX: 12,
      sizeY: 12
    })
  }
} 