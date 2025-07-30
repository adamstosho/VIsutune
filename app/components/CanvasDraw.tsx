"use client"

import { useRef, useEffect, useState, useCallback } from "react"

interface Stroke {
  id: number
  points: { x: number; y: number }[]
  color: string
  size: number
  startTime: number
  endTime?: number
  length?: number
  duration?: number
  hue: number
}

interface CanvasDrawProps {
  onStrokeComplete: (stroke: Stroke) => void
  isPlaying: boolean
}

const CanvasDraw = ({ onStrokeComplete, isPlaying }: CanvasDrawProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null)
  const [brushColor, setBrushColor] = useState("#3b82f6")
  const [brushSize, setBrushSize] = useState(4)

  const colors = [
    "#3b82f6", 
    "#ef4444", 
    "#10b981", 
    "#f59e0b", 
    "#8b5cf6", 
    "#ec4899", 
  ]

  const getCanvasCoordinates = useCallback((e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    let clientX = 0
    let clientY = 0

    if ("clientX" in e) {
      clientX = e.clientX
      clientY = e.clientY
    } else if (e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    }
  }, [])

  const startDrawing = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (isPlaying) return 

      const coords = getCanvasCoordinates(e)
      const stroke: Stroke = {
        id: Date.now() + Math.random(),
        points: [coords],
        color: brushColor,
        size: brushSize,
        startTime: Date.now(),
        hue: Number.parseInt(brushColor.slice(1), 16) % 360, 
      }

      setCurrentStroke(stroke)
      setIsDrawing(true)
    },
    [getCanvasCoordinates, brushColor, brushSize, isPlaying],
  )

  const draw = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDrawing || !currentStroke) return

      const coords = getCanvasCoordinates(e)
      const updatedStroke = {
        ...currentStroke,
        points: [...currentStroke.points, coords],
      }

      setCurrentStroke(updatedStroke)

      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const points = updatedStroke.points

      if (points.length > 1) {
        const lastPoint = points[points.length - 2]
        const currentPoint = points[points.length - 1]

        ctx.strokeStyle = updatedStroke.color
        ctx.lineWidth = updatedStroke.size
        ctx.lineCap = "round"
        ctx.lineJoin = "round"

        ctx.beginPath()
        ctx.moveTo(lastPoint.x, lastPoint.y)
        ctx.lineTo(currentPoint.x, currentPoint.y)
        ctx.stroke()
      }
    },
    [isDrawing, currentStroke, getCanvasCoordinates],
  )

  const stopDrawing = useCallback(() => {
    if (!isDrawing || !currentStroke) return

    const finalStroke = {
      ...currentStroke,
      endTime: Date.now(),
      length: currentStroke.points.length,
      duration: Date.now() - currentStroke.startTime,
    }

    onStrokeComplete(finalStroke)
    setCurrentStroke(null)
    setIsDrawing(false)
  }, [isDrawing, currentStroke, onStrokeComplete])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight || 400
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const handleMouseDown = (e: MouseEvent) => startDrawing(e)
    const handleMouseMove = (e: MouseEvent) => draw(e)
    const handleMouseUp = () => stopDrawing()
    const handleMouseOut = () => stopDrawing()

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      startDrawing(e)
    }
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      draw(e)
    }
    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault()
      stopDrawing()
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseup", handleMouseUp)
    canvas.addEventListener("mouseout", handleMouseOut)

    canvas.addEventListener("touchstart", handleTouchStart)
    canvas.addEventListener("touchmove", handleTouchMove)
    canvas.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseup", handleMouseUp)
      canvas.removeEventListener("mouseout", handleMouseOut)
      canvas.removeEventListener("touchstart", handleTouchStart)
      canvas.removeEventListener("touchmove", handleTouchMove)
      canvas.removeEventListener("touchend", handleTouchEnd)
    }
  }, [startDrawing, draw, stopDrawing])

  return (
    <div className="relative">
      <canvas ref={canvasRef} className="w-full h-96 lg:h-[500px] cursor-crosshair touch-none" />

      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <div className="flex gap-1 bg-black/50 p-2 rounded-lg">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              aria-label={`Select ${color} color`}
              title={`Select ${color} color`}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                brushColor === color ? "border-white scale-110" : "border-gray-600"
              }`}
              style={{ backgroundColor: color }}
              data-color={color}
              onClick={() => setBrushColor(color)}
            />
          ))}
        </div>

        <div className="bg-black/50 p-2 rounded-lg">
          <label htmlFor="brush-size" className="sr-only">Brush size</label>
          <input
            id="brush-size"
            type="range"
            min="2"
            max="12"
            value={brushSize}
            onChange={(e) => setBrushSize(Number.parseInt(e.target.value))}
            className="w-full slider"
            aria-label="Brush size"
            title="Adjust brush size"
          />
          <div className="text-xs text-center text-gray-300 mt-1">Size: {brushSize}px</div>
        </div>
      </div>

      {isPlaying && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
          <div className="bg-black/70 px-4 py-2 rounded-lg">
            <span className="text-green-400">♪ Playing Loop ♪</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default CanvasDraw
