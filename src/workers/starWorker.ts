/// <reference lib="webworker" />

let canvas: OffscreenCanvas
let ctx: OffscreenCanvasRenderingContext2D

let width = 0
let height = 0

let stars: any[] = []
let mouse = { x: 0, y: 0 }

let useMouse = false

const STAR_COUNT = 80
const MAX_DIST = 100
const MAX_MOUSE_DIST = 120

// Inicializar estrellas
const createStars = () => {
  stars = Array.from({ length: STAR_COUNT }).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.3
  }))
}

// Distancia optimizada (sin sqrt)
const distanceSq = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = x1 - x2
  const dy = y1 - y2
  return dx * dx + dy * dy
}

const MAX_DIST_SQ = MAX_DIST * MAX_DIST
const MAX_MOUSE_DIST_SQ = MAX_MOUSE_DIST * MAX_MOUSE_DIST

// Loop principal
const animate = () => {
  if (!ctx) return

  ctx.clearRect(0, 0, width, height)

  // Dibujar estrellas
  for (let i = 0; i < stars.length; i++) {
    const s = stars[i]

    s.y -= s.speed

    if (s.y < 0) {
      s.y = height
      s.x = Math.random() * width
    }

    ctx.beginPath()
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2)
    ctx.fillStyle = "#c084fc"
    ctx.shadowColor = "#a855f7"
    ctx.fill()
  }

  // Conexiones
    const MAX_CONNECTIONS = 4

    for (let i = 0; i < stars.length; i++) {
        const s1 = stars[i]
        let connections = 0

        for (let j = i + 1; j < stars.length; j++) {
            if (connections >= MAX_CONNECTIONS) break

            const s2 = stars[j]

            const distSq = distanceSq(s1.x, s1.y, s2.x, s2.y)

            if (distSq < MAX_DIST_SQ) {
            const opacity = 1 - distSq / MAX_DIST_SQ

            ctx.beginPath()
            ctx.moveTo(s1.x, s1.y)
            ctx.lineTo(s2.x, s2.y)
            ctx.strokeStyle = `rgba(192,132,252,${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()

            connections++
            }
        }

        // Conexión con mouse SOLO si está activo
        if (useMouse) {
        const distMouseSq = distanceSq(s1.x, s1.y, mouse.x, mouse.y)

        if (distMouseSq < MAX_MOUSE_DIST_SQ) {
            const opacity = 1 - distMouseSq / MAX_MOUSE_DIST_SQ

            ctx.beginPath()
            ctx.moveTo(s1.x, s1.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(168,85,247,${opacity})`
            ctx.stroke()
        }
        }
    }

  requestAnimationFrame(animate)
}

// Listener principal
self.onmessage = (e: MessageEvent) => {
  const { type, data } = e.data

  switch (type) {
    case "init":
      canvas = data.canvas
      ctx = canvas.getContext("2d") as OffscreenCanvasRenderingContext2D

      width = data.width
      height = data.height

      canvas.width = width
      canvas.height = height

      createStars()
      animate()
      break

    case "resize":
      width = data.width
      height = data.height

      canvas.width = width
      canvas.height = height

      createStars()
      break

    case "mouse":
      mouse.x = data.x
      mouse.y = data.y
      break

    case "enableMouse":
      useMouse = true
      break
  }
}