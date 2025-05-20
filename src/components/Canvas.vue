<template>
  <div class="relative w-full h-full">
    <SelectionMenu 
      :visible="!!canvasStore.selectedObject"
    />
    <div class="w-full h-[calc(100%-10px)] bg-white rounded-lg shadow-sm pt-8 flex justify-center items-center">
      <canvas ref="canvas" class="w-full h-full"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useShapesStore } from '../stores/shapes'
import { useCanvasStore } from '../stores/canvas'
import SelectionMenu from './SelectionMenu.vue'

const store = useShapesStore()
const canvas = ref(null)
const canvasStore = useCanvasStore()

// Initialize canvas
onMounted(() => {
  // Wait for fabric to be available
  const initCanvas = () => {
    if (window.fabric) {
      const fabricCanvas = new window.fabric.Canvas(canvas.value, {
        width: window.innerWidth - 400,
        height: window.innerHeight - 200,
        selection: true,
        preserveObjectStacking: true
      })

      // Configure custom controls
      window.fabric.Object.prototype.set({
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
      })

      // Customize control points
      window.fabric.Object.prototype.controls = {
        mt: new window.fabric.Control({
          x: 0,
          y: -0.5,
          actionHandler: window.fabric.controlsUtils.scalingYOrSkewingX,
          cursorStyle: 'ns-resize',
          render: renderCircleControl,
          actionName: 'scalingY',
          sizeX: 12,
          sizeY: 12
        }),
        mb: new window.fabric.Control({
          x: 0,
          y: 0.5,
          actionHandler: window.fabric.controlsUtils.scalingYOrSkewingX,
          cursorStyle: 'ns-resize',
          render: renderCircleControl,
          actionName: 'scalingY',
          sizeX: 12,
          sizeY: 12
        }),
        ml: new window.fabric.Control({
          x: -0.5,
          y: 0,
          actionHandler: window.fabric.controlsUtils.scalingXOrSkewingY,
          cursorStyle: 'ew-resize',
          render: renderCircleControl,
          actionName: 'scalingX',
          sizeX: 12,
          sizeY: 12
        }),
        mr: new window.fabric.Control({
          x: 0.5,
          y: 0,
          actionHandler: window.fabric.controlsUtils.scalingXOrSkewingY,
          cursorStyle: 'ew-resize',
          render: renderCircleControl,
          actionName: 'scalingX',
          sizeX: 12,
          sizeY: 12
        }),
        mtr: new window.fabric.Control({
          x: 0,
          y: -0.5,
          actionHandler: window.fabric.controlsUtils.rotationWithSnapping,
          cursorStyle: 'crosshair',
          render: renderCircleControl,
          actionName: 'rotate',
          sizeX: 12,
          sizeY: 12
        }),
        bl: new window.fabric.Control({
          x: -0.5,
          y: 0.5,
          actionHandler: window.fabric.controlsUtils.scalingEqually,
          cursorStyle: 'nwse-resize',
          render: renderCircleControl,
          actionName: 'scaling',
          sizeX: 12,
          sizeY: 12
        }),
        br: new window.fabric.Control({
          x: 0.5,
          y: 0.5,
          actionHandler: window.fabric.controlsUtils.scalingEqually,
          cursorStyle: 'nwse-resize',
          render: renderCircleControl,
          actionName: 'scaling',
          sizeX: 12,
          sizeY: 12
        }),
        tl: new window.fabric.Control({
          x: -0.5,
          y: -0.5,
          actionHandler: window.fabric.controlsUtils.scalingEqually,
          cursorStyle: 'nwse-resize',
          render: renderCircleControl,
          actionName: 'scaling',
          sizeX: 12,
          sizeY: 12
        }),
        tr: new window.fabric.Control({
          x: 0.5,
          y: -0.5,
          actionHandler: window.fabric.controlsUtils.scalingEqually,
          cursorStyle: 'nwse-resize',
          render: renderCircleControl,
          actionName: 'scaling',
          sizeX: 12,
          sizeY: 12
        })
      }

      canvasStore.initCanvas(fabricCanvas)
    } else {
      setTimeout(initCanvas, 100)
    }
  }

  initCanvas()
})

// Custom control renderer
function renderCircleControl(ctx, left, top, styleOverride, fabricObject) {
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
</script>

<style>
canvas {
  border: 1px solid #e2e8f0;
}
</style> 