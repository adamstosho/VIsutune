"use client"

import { useRef, useEffect } from "react"

const Visualizer = ({ strokes, isPlaying }) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")

    const resizeCanvas = () => {
      const container = canvas.parentElement
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight || 400
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      strokes.forEach((stroke, index) => {
        if (stroke.points.length < 2) return

        if (isPlaying) {
          const glowIntensity = Math.sin(Date.now() * 0.01 + index) * 0.5 + 0.5
          ctx.shadowColor = stroke.color
          ctx.shadowBlur = 10 + glowIntensity * 20
        } else {
          ctx.shadowBlur = 0
        }

        ctx.strokeStyle = stroke.color
        ctx.lineWidth = stroke.size
        ctx.lineCap = "round"
        ctx.lineJoin = "round"

        ctx.beginPath()
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y)

        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y)
        }

        ctx.stroke()
      })

      if (isPlaying) {
        updateParticles(ctx)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [strokes, isPlaying])

  const updateParticles = (ctx) => {
    if (Math.random() < 0.1 && strokes.length > 0) {
      const randomStroke = strokes[Math.floor(Math.random() * strokes.length)]
      if (randomStroke.points.length > 0) {
        const randomPoint = randomStroke.points[Math.floor(Math.random() * randomStroke.points.length)]
        particlesRef.current.push({
          x: randomPoint.x,
          y: randomPoint.y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 1.0,
          color: randomStroke.color,
          size: Math.random() * 3 + 1,
        })
      }
    }

    particlesRef.current = particlesRef.current.filter((particle) => {
      particle.x += particle.vx
      particle.y += particle.vy
      particle.life -= 0.02
      particle.vy += 0.1 

      if (particle.life > 0) {
        ctx.save()
        ctx.globalAlpha = particle.life
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        return true
      }
      return false
    })
  }

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ mixBlendMode: "screen" }} />
}

export default Visualizer
