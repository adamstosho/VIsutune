"use client"

import { useRef, useEffect, useState, useCallback } from "react"

const CanvasDraw = ({ onStrokeComplete, isPlaying }) => {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentStroke, setCurrentStroke] = useState(null)
  const [brushColor, setBrushColor] = useState("#3b82f6")
  const [brushSize, setBrushSize] = useState(4)

  const colors = [
    "#3b82f6", // Blue - Lead synth
    "#ef4444", // Red - Bass
    "#10b981", // Green - Pad
    "#f59e0b", // Yellow - Pluck
    "#8b5cf6", // Purple - Bell
    "#ec4899", // Pink - Noise
  ]

  const getCanvasCoordinates = useCallback((e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0
    const clientY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    }
  }, [])

  const startDrawing = useCallback(
    (e) => {
      if (isPlaying) return // Don't allow drawing while playing

      const coords = getCanvasCoordinates(e)
      const stroke = {
        id: Date.now() + Math.random(),
        points: [coords],
        color: brushColor,
        size: brushSize,
        startTime: Date.now(),
        hue: Number.parseInt(brushColor.slice(1), 16) % 360, // Convert hex to hue
      }

      setCurrentStroke(stroke)
      setIsDrawing(true)
    },
    [getCanvasCoordinates, brushColor, brushSize, isPlaying],
  )

  const draw = useCallback(
    (e) => {
      if (!isDrawing || !currentStroke) return

      const coords = getCanvasCoordinates(e)
      const updatedStroke = {
        ...currentStroke,
        points: [...currentStroke.points, coords],
      }

      setCurrentStroke(updatedStroke)

      // Draw on canvas
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
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

    // Set canvas size
    const resizeCanvas = () => {
      const container = canvas.parentElement
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight || 400
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Mouse events
    canvas.addEventListener("mousedown", startDrawing)
    canvas.addEventListener("mousemove", draw)
    canvas.addEventListener("mouseup", stopDrawing)
    canvas.addEventListener("mouseout", stopDrawing)

    // Touch events
    canvas.addEventListener("touchstart", startDrawing)
    canvas.addEventListener("touchmove", draw)
    canvas.addEventListener("touchend", stopDrawing)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousedown", startDrawing)
      canvas.removeEventListener("mousemove", draw)
      canvas.removeEventListener("mouseup", stopDrawing)
      canvas.removeEventListener("mouseout", stopDrawing)
      canvas.removeEventListener("touchstart", startDrawing)
      canvas.removeEventListener("touchmove", draw)
      canvas.removeEventListener("touchend", stopDrawing)
    }
  }, [startDrawing, draw, stopDrawing])

  return (
    <div className="relative">
      <canvas ref={canvasRef} className="w-full h-96 lg:h-[500px] cursor-crosshair" style={{ touchAction: "none" }} />

      {/* Drawing Tools */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        {/* Color Palette */}
        <div className="flex gap-1 bg-black/50 p-2 rounded-lg">
          {colors.map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                brushColor === color ? "border-white scale-110" : "border-gray-600"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setBrushColor(color)}
            />
          ))}
        </div>

        {/* Brush Size */}
        <div className="bg-black/50 p-2 rounded-lg">
          <input
            type="range"
            min="2"
            max="12"
            value={brushSize}
            onChange={(e) => setBrushSize(Number.parseInt(e.target.value))}
            className="w-full"
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
