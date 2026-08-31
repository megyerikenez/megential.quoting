import { CalculatorTeaser } from '../sections/CalculatorTeaser'
import { Footer } from '../sections/Footer'
import { Hero } from '../sections/Hero'
import { Nav } from '../sections/Nav'
import { Process } from '../sections/Process'
import { Services } from '../sections/Services'

export function Landing() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Process />
        <CalculatorTeaser />
      </main>
      <Footer />
    </>
  )
}
