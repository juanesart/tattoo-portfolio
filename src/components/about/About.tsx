"use client"

import Image from "next/image"

export default function About() {
  return (
    <section className="relative py-24 px-6 max-w-6xl mx-auto">

      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* Imagen */}
        <div className="relative w-full h-[400px] md:h-[500px]">
          <Image
            src="/artist.webp"
            alt="Tattoo Artist"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover rounded-2xl"
          />
        </div>

        {/* Texto */}
        <div>
          <h2 className="text-3xl md:text-4xl font-light tracking-widest mb-6">
            Sobre mí
          </h2>

          <p className="text-zinc-400 leading-relaxed mb-6">
            Soy una artista especializada en tatuajes de estilo fine line y blackwork.
            Mi enfoque se centra en la precisión, el detalle y la creación de piezas
            únicas que conecten con la historia de cada persona.
          </p>

          <p className="text-zinc-400 leading-relaxed mb-6">
            Cada diseño es una colaboración, donde la idea del cliente se transforma
            en una obra permanente.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            {["Fine Line", "Blackwork", "Minimalism"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs border border-purple-500/40 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}