import { useEffect, useRef } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router'
import { profile } from './data'
import { tabs } from './tabs'
import TabBar from './components/TabBar'
import Intro from './components/Intro'
import Hero from './components/Hero'
import Now from './components/Now'
import About from './components/About'
import Projects from './components/Projects'
import Arcade from './components/Arcade'
import Leadership from './components/Leadership'
import Toolbox from './components/Toolbox'
import Contact from './components/Contact'

function Layout() {
  const { pathname } = useLocation()
  const tab = '/' + (pathname.split('/')[1] || '')
  const first = useRef(true)

  // On every tab change: reset scroll, update the title, and move focus to the new heading
  // (skipped on first load so we don't steal focus from the page)
  useEffect(() => {
    const t = tabs.find((x) => x.path === tab)
    document.title = t?.title ? `${t.title} · ${profile.name}` : profile.name
    window.scrollTo(0, 0)
    if (first.current) {
      first.current = false
      return
    }
    document.querySelector('main h1')?.focus({ preventScroll: true })
  }, [tab])

  return (
    <>
      <Intro />
      <TabBar />
      <main className="page" key={tab}>
        <Outlet />
      </main>
      <Contact />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={
            <>
              <Hero />
              <Now />
            </>
          }
        />
        <Route path="about" element={<About />} />
        <Route path="projects/:id?" element={<Projects />} />
        <Route path="arcade" element={<Arcade />} />
        <Route path="experience" element={<Leadership />} />
        <Route path="skills" element={<Toolbox />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
