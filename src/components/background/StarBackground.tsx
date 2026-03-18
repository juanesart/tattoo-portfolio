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

    const stars: Star[] = Array.from({ length: 90 }).map(() => ({
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

    let lastTime = 0
    const fps = 30

    const animate = (time: number) => {
      if (time - lastTime < 1000 / fps) {
        requestAnimationFrame(animate)
        return
      }

      lastTime = time

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        star.y -= star.speed

        if (star.y < 0) {
          star.y = canvas.height
          star.x = Math.random() * canvas.width
        }

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = "#c084fc"
        ctx.fill()
      })

      const MAX_CONNECTIONS = 3

      for (let i = 0; i < stars.length; i++) {
        let connections = 0

        for (let j = i + 1; j < stars.length; j++) {
          if (connections >= MAX_CONNECTIONS) break

          const dx = stars[i].x - stars[j].x
          const dy = stars[i].y - stars[j].y
          const dist = dx * dx + dy * dy

          if (dist < 10000) {
            connections++

            ctx.beginPath()
            ctx.moveTo(stars[i].x, stars[i].y)
            ctx.lineTo(stars[j].x, stars[j].y)
            ctx.strokeStyle = `rgba(192,132,252,${1 - dist / 10000})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }

        const dx = stars[i].x - mouse.current.x
        const dy = stars[i].y - mouse.current.y
        const distMouse = dx * dx + dy * dy

        if (distMouse < 14400) {
          ctx.beginPath()
          ctx.moveTo(stars[i].x, stars[i].y)
          ctx.lineTo(mouse.current.x, mouse.current.y)
          ctx.strokeStyle = `rgba(168,85,247,${1 - distMouse / 14400})`
          ctx.stroke()
        }
      }

      requestAnimationFrame(animate)
    }
    

    animate(lastTime)

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