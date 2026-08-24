import { motion } from 'framer-motion'
import { Nav } from '../components/Nav'
import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { Expertise } from '../components/Expertise'
import { Focus } from '../components/Focus'
import { Experience } from '../components/Experience'
import { Projects } from '../components/Projects'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'

export function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <Nav />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Focus />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </motion.div>
  )
}
