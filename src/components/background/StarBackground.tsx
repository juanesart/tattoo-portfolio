"use client"

import { useEffect, useRef } from "react"

type Star = {
  x: number
  y: number
  radius: number
  speed: number
}

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()

    const stars: Star[] = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2,
      speed: Math.random() * 0.3
    }))

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)

    const distance = (x1: number, y1: number, x2: number, y2: number) => {
      return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Dibujar estrellas
      stars.forEach((star) => {
        star.y -= star.speed

        if (star.y < 0) {
          star.y = canvas.height
          star.x = Math.random() * canvas.width
        }

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.shadowBlur = 10
        ctx.shadowColor = "#a855f7"
        ctx.fillStyle = "#c084fc"
        ctx.fill()
      })

      // Conexiones entre estrellas
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dist = distance(
            stars[i].x,
            stars[i].y,
            stars[j].x,
            stars[j].y
          )

          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(stars[i].x, stars[i].y)
            ctx.lineTo(stars[j].x, stars[j].y)
            ctx.strokeStyle = `rgba(192,132,252,${1 - dist / 100})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }

        // Conexión con el mouse
        const distToMouse = distance(
          stars[i].x,
          stars[i].y,
          mouse.current.x,
          mouse.current.y
        )

        if (distToMouse < 120) {
          ctx.beginPath()
          ctx.moveTo(stars[i].x, stars[i].y)
          ctx.lineTo(mouse.current.x, mouse.current.y)
          ctx.strokeStyle = `rgba(168,85,247,${1 - distToMouse / 120})`
          ctx.stroke()
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-50"
    />
  )
}