import SmoothScroll from "@/components/providers/SmoothScroll"
import StarBackground from "@/components/background/StarBackground"
import "../styles/global.css"

export const metadata = {
  title: "Mika Tattoo | Tatuadora Fine Line y Blackwork en Medellín",
  description:
    "Tatuadora especializada en fine line y blackwork en Medellín. Diseños personalizados, minimalistas y de alta precisión. Agenda tu cita y lleva tu idea a la piel.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-background text-white">
        <StarBackground />
        <SmoothScroll>
          
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
