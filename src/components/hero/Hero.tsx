"use client"

import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">

      {/* Logo */}
      <motion.img
        src="/logo.png"
        alt="Tattoo Artist Logo"
        className="w-48 md:w-64 mb-10 opacity-90"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Title */}
      <motion.h1
        className="text-4xl md:text-6xl font-light text-gray-200 tracking-wide"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Arte que vive en la piel
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="mt-6 text-gray-400 max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Diseños únicos inspirados en la naturaleza, el cosmos y la expresión personal.
      </motion.p>

      {/* CTA */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="mt-10 px-8 py-3 rounded-full backdrop-blur-sm bg-white/10 hover:bg-primary-dark text-amber-50 duration-300"
      >
        Ver portafolio
      </motion.button>

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