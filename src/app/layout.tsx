import SmoothScroll from "@/components/providers/SmoothScroll"
import StarBackground from "@/components/background/StarBackground"
import "../styles/global.css"

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
