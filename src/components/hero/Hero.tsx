"use client"

import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center px-6">

      <div className="relative z-10">

        {/* LOGO */}
        <motion.img
          src="/logo.webp"
          alt="Tattoo Logo"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-32 h-32 md:w-40 mx-auto mb-6"
          fetchPriority="high"
        />

        {/* NOMBRE */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-6xl font-light tracking-widest"
        >
          Mika Tattoo
        </motion.h1>

        {/* TAGLINE */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-4 text-sm md:text-base text-zinc-400 tracking-[0.3em]"
        >
          FINE LINE • BLACKWORK
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-10"
        >
          <a
            href="#gallery"
            className="px-8 py-3 border border-purple-400 text-sm tracking-widest hover:bg-purple-500/10 transition-all duration-300"
          >
            VER TRABAJOS
          </a>
        </motion.div>        
      </div>
      {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 text-sm text-gray-500"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ↓ Scroll
        </motion.div>
    </section>
  )
}