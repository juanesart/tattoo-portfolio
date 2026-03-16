"use client"

import { useEffect, useRef } from "react"

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize);
    resize();

    const stars = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2,
      speed: Math.random() * 0.3
    }))

    function animate() {
        if (!canvas || !ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        stars.forEach((star) => {
            star.y -= star.speed

            if (star.y < 0) {
            star.y = canvas.height
            star.x = Math.random() * canvas.width
            }

            ctx.beginPath()
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
            ctx.fillStyle = "rgba(192,132,252,0.8)"
            ctx.fill()
        })

        requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
    }

  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-40"
    />
  )
}