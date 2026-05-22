import { useState, useEffect } from 'react'
import Navbar   from './components/Navbar'
import Header   from './components/Header'
import Profile  from './components/Profile'
import About    from './components/About'
import Projects from './components/Projects'
import Footer   from './components/Footer'

// ── Your personal data – edit these to update the whole site ──────────────
const PORTFOLIO = {
  name:           'Zahra Ahmadi',
  title:          'Frontend Developer',
  welcomeMessage: "Hello, I'm",
  bio: 'I graduated from the CS Faculty of Kabul University in 2022. ' +
       'In 2024, I worked on a real-world Joomla CMS project. ' +
       'Currently expanding my skills through the CodeWeekend bootcamp, ' +
       'with a future goal of building a career in AI and technology.',
}

export default function App() {
  // Stretch feature: dark / light theme toggle
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const r = document.documentElement
    if (isDark) {
      r.style.setProperty('--bg-primary',    '#080808')
      r.style.setProperty('--bg-card',       '#161616')
      r.style.setProperty('--text-primary',  '#E8E4DC')
      r.style.setProperty('--text-secondary','#A09C94')
      r.style.setProperty('--text-muted',    '#5a5750')
      r.style.setProperty('--border',        'rgba(255,255,255,0.07)')
    } else {
      r.style.setProperty('--bg-primary',    '#FAFAF8')
      r.style.setProperty('--bg-card',       '#FFFFFF')
      r.style.setProperty('--text-primary',  '#1A1814')
      r.style.setProperty('--text-secondary','#5C5850')
      r.style.setProperty('--text-muted',    '#9A9590')
      r.style.setProperty('--border',        'rgba(0,0,0,0.08)')
    }
  }, [isDark])

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh',
                  transition: 'background-color 0.3s' }}>

      {/* Navbar receives theme state + toggle handler as props */}
      <Navbar isDark={isDark} onToggleTheme={() => setIsDark(p => !p)} />

      <main>
        {/* Header: name and welcome message passed as props */}
        <Header name={PORTFOLIO.name} welcomeMessage={PORTFOLIO.welcomeMessage} />

        {/* Profile: all data comes from props */}
        <Profile name={PORTFOLIO.name} title={PORTFOLIO.title} bio={PORTFOLIO.bio} />

        {/* About: uses useState for Show More / Show Less */}
        <About />

        {/* Projects: renders array with .map() + conditional Featured badge */}
        <Projects />
      </main>

      {/* Footer: name prop used for dynamic copyright */}
      <Footer name={PORTFOLIO.name} />
    </div>
  )
}
