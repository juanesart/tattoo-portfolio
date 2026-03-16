"use client"

import { motion, AnimatePresence } from "framer-motion"

type Tattoo = {
  id: number
  title: string
  image: string
}

type Props = {
  tattoo: Tattoo | null
  tattoos: Tattoo[]
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export default function TattooModal({
  tattoo,
  tattoos,
  onClose,
  onNext,
  onPrev
}: Props) {
  return (
    <AnimatePresence>
      {tattoo && (
        <motion.div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >

          <motion.div
            className="relative max-w-5xl w-full"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >

            <img
              src={tattoo.image}
              alt={tattoo.title}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-white text-3xl"
            >
              ✕
            </button>

            {/* Prev */}
            <button
              onClick={onPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-4xl px-4"
            >
              ‹
            </button>

            {/* Next */}
            <button
              onClick={onNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white text-4xl px-4"
            >
              ›
            </button>

            <p className="text-center mt-6 text-lg">
              {tattoo.title}
            </p>

          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}