"use client"

import { motion } from "framer-motion"
import tattoos from "@/data/tattoos.json"
import { useState } from "react"
import TattooModal from "./TattooModal"

export default function TattooGrid() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const selectedTattoo =
    selectedIndex !== null ? tattoos[selectedIndex] : null
     const nextTattoo = () => {
     if (selectedIndex === null) return
        setSelectedIndex((selectedIndex + 1) % tattoos.length)
    }

    const prevTattoo = () => {
    if (selectedIndex === null) return
    setSelectedIndex(
            (selectedIndex - 1 + tattoos.length) % tattoos.length
        )
    }
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  return (
    <section id="gallery" className="py-32 px-6 ">

      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl md:text-4xl mb-16 text-center font-light">
          Portafolio
        </h2>

        <div className="grid md:grid-cols-3 gap-6 group">

          {tattoos.map((tattoo, index) => (
            <motion.div
                key={tattoo.id}
                onClick={() => setSelectedIndex(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`
                    relative overflow-hidden rounded-xl cursor-pointer
                    transition-all duration-300
                    ${hoveredIndex !== null && hoveredIndex !== index ? "opacity-100" : "opacity-30"}
                    ${hoveredIndex === index ? "ring-2 ring-primary scale-[1.02]" : ""}
                    ${hoveredIndex === index ? "shadow-[0_0_50px_rgba(168,85,247,0.40)]" : ""}
                `}
            >

              <img
                src={tattoo.image}
                alt={tattoo.title}
                className={`
                    w-full h-100 object-cover
                    transition-transform duration-700
                    ${hoveredIndex === index ? "scale-110" : "scale-100"}
                `}
              />

            <div className={`
                    absolute inset-0 bg-black/40
                    flex items-center justify-center
                    transition-opacity duration-300
                    ${hoveredIndex === index ? "opacity-100" : "opacity-0"}
                `}
            >

                <p className="text-lg tracking-wide">
                  {tattoo.title}
                </p>

              </div>

            </motion.div>
          ))}

        </div>

    </div>
    <TattooModal
        tattoo={selectedTattoo}
        tattoos={tattoos}
        onClose={() => setSelectedIndex(null)}
        onNext={nextTattoo}
        onPrev={prevTattoo}
    />

    </section>
  )
}