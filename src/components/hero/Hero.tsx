"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Hero() {
  const [animate, setAnimate] = useState(false)

  // Delay para no afectar LCP
  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-6">

      <div className="relative z-10">

        {/* LOGO optimizado */}
        <div className="w-32 md:w-40 mx-auto mb-6">
          <Image
            src="/logo.webp"
            alt="Tattoo Logo"
            width={160}
            height={160}
            priority
            quality={80}
            className="w-full h-auto"
          />
        </div>

        {/* NOMBRE */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={animate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-light tracking-widest"
        >
          Mika Tattoo
        </motion.h1>

        {/* TAGLINE */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={animate ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-4 text-sm md:text-base text-zinc-400 tracking-[0.3em]"
        >
          FINE LINE • BLACKWORK
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={animate ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10"
        >
          <a
            href="#gallery"
            className="px-8 py-3 border border-purple-400 text-sm tracking-widest hover:bg-purple-500/10 transition-colors duration-300"
          >
            VER TRABAJOS
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator (más liviano) */}
      <motion.div
        className="absolute bottom-10 text-sm text-gray-500"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ↓ Scroll
      </motion.div>
    </section>
  )
}