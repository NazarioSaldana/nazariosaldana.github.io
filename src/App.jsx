import { useEffect } from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import About from './components/About'
import Now from './components/Now'
import Projects from './components/Projects'
import Arcade from './components/Arcade'
import Leadership from './components/Leadership'
import Toolbox from './components/Toolbox'
import Contact from './components/Contact'

function App() {
  // Fade sections in as they scroll into view
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <About />
        <Now />
        <Projects />
        <Arcade />
        <Leadership />
        <Toolbox />
      </main>
      <Contact />
    </>
  )
}

export default App
