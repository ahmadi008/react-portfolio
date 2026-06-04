import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import FeedbackWall from './components/FeedbackWall';
import Contact from './components/Contact';
import Confetti from './components/Confetti';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

function PortfolioApp() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const confettiFired = useRef(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Confetti fires once on first load
  useEffect(() => {
    if (!confettiFired.current) {
      confettiFired.current = true;
      const t = setTimeout(() => {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      }, 1000);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <FeedbackWall />
        <Contact />
      </main>

      <footer style={{ background:'var(--color-surface)', borderTop:'1px solid var(--color-border)', padding:'40px 24px', textAlign:'center' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <p style={{ fontFamily:'var(--font-heading)', fontSize:32, fontWeight:700, color:'var(--color-primary)', marginBottom:12 }}>
            Zahra Ahmadi
          </p>
          <p style={{ fontFamily:'var(--font-body)', fontSize:14, color:'var(--color-text-muted)', marginBottom:24 }}>
            Frontend Developer · Building with passion
          </p>
          <div style={{ display:'flex', gap:16, justifyContent:'center', marginBottom:24 }}>
            {[
              { icon: <Github size={18}/>, href:'https://github.com/ahmadi008', label:'GitHub' },
              { icon: <Linkedin size={18}/>, href:'#', label:'LinkedIn' },
              { icon: <Mail size={18}/>, href:'#contact', label:'Email' },
            ].map(s => (
              <a key={s.label} href={s.href} aria-label={s.label}
                style={{ width:38, height:38, display:'flex', alignItems:'center', justifyContent:'center',
                  borderRadius:8, border:'1px solid var(--color-border)', color:'var(--color-text-muted)',
                  textDecoration:'none', transition:'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color='var(--color-primary)'; e.currentTarget.style.borderColor='var(--color-primary)'; e.currentTarget.style.transform='translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.color='var(--color-text-muted)'; e.currentTarget.style.borderColor='var(--color-border)'; e.currentTarget.style.transform=''; }}
              >{s.icon}</a>
            ))}
          </div>
          <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--color-text-muted)' }}>
            © {new Date().getFullYear()} Zahra Ahmadi. Built with React & Vite.
          </p>
        </div>
      </footer>

      <Confetti active={showConfetti} />

      {showBackToTop && (
        <button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
          aria-label="Back to top"
          style={{ position:'fixed', bottom:88, right:24, width:44, height:44, borderRadius:'50%',
            background:'var(--color-primary)', color:'#fff', border:'none', cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'var(--shadow-md)', zIndex:500, animation:'scaleIn 0.3s ease', transition:'transform 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.transform='scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform=''}
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
