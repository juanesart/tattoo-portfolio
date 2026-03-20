import About from "@/components/about/About"
import Contact from "@/components/contact/Contact"
import Hero from "@/components/hero/Hero"
import TattooGrid from "@/components/portfolio/TattooGrid"

export default function Home() {
  return (
    <main className="">
    
      <Hero />
      <TattooGrid />
      <About />
      <Contact />
    </main>
  )
}
