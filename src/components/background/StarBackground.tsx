"use client"

import { useEffect, useRef } from "react"

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const workerRef = useRef<Worker | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Detectar si el dispositivo realmente tiene mouse
    const canUseMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches

    let lastMouseTime = 0
    const MOUSE_FPS = 30

    // Crear worker de forma diferida (mejora TBT)
    const initWorker = () => {
      const worker = new Worker(
        new URL("../../workers/starWorker.ts", import.meta.url),
        { type: "module" }
      )

      workerRef.current = worker

      // Transferir canvas
      const offscreen = canvas.transferControlToOffscreen()

      worker.postMessage(
        {
          type: "init",
          data: {
            canvas: offscreen,
            width: window.innerWidth,
            height: window.innerHeight
          }
        },
        [offscreen]
      )

      // Activar interacción solo si aplica
      if (canUseMouse) {
        worker.postMessage({ type: "enableMouse" })
      }

      // Resize
      const handleResize = () => {
        worker.postMessage({
          type: "resize",
          data: {
            width: window.innerWidth,
            height: window.innerHeight
          }
        })
      }

      // Mouse optimizado
      const handleMouseMove = (e: MouseEvent) => {
        const now = performance.now()

        if (now - lastMouseTime < 1000 / MOUSE_FPS) return
        lastMouseTime = now

        worker.postMessage({
          type: "mouse",
          data: {
            x: e.clientX,
            y: e.clientY
          }
        })
      }

      window.addEventListener("resize", handleResize)

      if (canUseMouse) {
        window.addEventListener("mousemove", handleMouseMove)
      }

      // Cleanup
      return () => {
        worker.terminate()

        window.removeEventListener("resize", handleResize)

        if (canUseMouse) {
          window.removeEventListener("mousemove", handleMouseMove)
        }
      }
    }

    // Ejecutar cuando el navegador esté libre
    if ("requestIdleCallback" in window) {
      const id = (window as any).requestIdleCallback(initWorker)
      return () => (window as any).cancelIdleCallback(id)
    } else {
      const timeout = setTimeout(initWorker, 500)
      return () => clearTimeout(timeout)
    }

  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-50"
    />
  )
}