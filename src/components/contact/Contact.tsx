"use client"

export default function Contact() {
  return (
    <section className="relative py-24 px-6 text-center">

      <div className="max-w-3xl mx-auto">

        <h2 className="text-3xl md:text-4xl font-light tracking-widest mb-6">
          Contacto
        </h2>

        <p className="text-zinc-400 mb-10">
          ¿Tienes una idea en mente? Hablemos y hagámosla realidad.
        </p>

        {/* Botones */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">

          <a
            href="https://wa.me/573001234567"
            target="_blank"
            className="px-6 py-3 border border-green-500 text-green-400 hover:bg-green-500/10 transition"
          >
            WhatsApp
          </a>

          <a
            href="https://instagram.com/tuusuario"
            target="_blank"
            className="px-6 py-3 border border-purple-500 text-purple-400 hover:bg-purple-500/10 transition"
          >
            Instagram
          </a>

          <a
            href="mailto:correo@email.com"
            className="px-6 py-3 border border-zinc-500 text-zinc-300 hover:bg-zinc-500/10 transition"
          >
            Email
          </a>

        </div>

        {/* Formulario (opcional) */}
        <form className="mt-12 grid gap-4 text-left">

          <input
            type="text"
            placeholder="Nombre"
            className="bg-transparent border border-zinc-700 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500"
          />

          <input
            type="email"
            placeholder="Email"
            className="bg-transparent border border-zinc-700 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500"
          />

          <textarea
            placeholder="Describe tu idea"
            rows={4}
            className="bg-transparent border border-zinc-700 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500"
          />

          <button
            type="submit"
            className="mt-4 px-6 py-3 border border-purple-500 hover:bg-purple-500/10 transition"
          >
            Enviar
          </button>

        </form>

      </div>
    </section>
  )
}