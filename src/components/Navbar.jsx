import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Sunset } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const NAV_LINKS = [
  { href:'#home',     label:'Home' },
  { href:'#about',    label:'About' },
  { href:'#skills',   label:'Skills' },
  { href:'#projects', label:'Projects' },
  { href:'#feedback', label:'Feedback' },
  { href:'#contact',  label:'Contact' },
];

const THEMES = [
  { value:'light',  icon:<Sun size={16}/>,    label:'Light' },
  { value:'dark',   icon:<Moon size={16}/>,   label:'Dark' },
  { value:'sunset', icon:<Sunset size={16}/>, label:'Sunset' },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active, setActive]       = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive:true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section tracking with IntersectionObserver
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.replace('#',''));
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin:'-40% 0px -55% 0px' }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior:'smooth' });
  };

  const navBase = { position:'fixed', top:0, left:0, right:0, zIndex:100, transition:'all 0.3s' };
  const navScrolled = scrolled ? {
    background:'rgba(248,250,252,0.92)',
    backdropFilter:'blur(12px)',
    borderBottom:'1px solid var(--color-border)',
    boxShadow:'var(--shadow-sm)',
  } : { background:'transparent' };

  return (
    <header style={{ ...navBase, ...navScrolled }}>
      <nav style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px',
        height:64, display:'flex', alignItems:'center', justifyContent:'space-between' }}>

        {/* Logo */}
        <a href="#home" onClick={e=>{ e.preventDefault(); scrollTo('#home'); }}
          style={{ fontFamily:'var(--font-heading)', fontSize:28, fontWeight:700,
            color:'var(--color-primary)', textDecoration:'none', cursor:'pointer' }}>
          ZA.
        </a>

        {/* Desktop links */}
        <ul style={{ display:'flex', gap:8, listStyle:'none', alignItems:'center' }}
          className="desktop-nav">
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={e=>{ e.preventDefault(); scrollTo(l.href); }}
                style={{ padding:'6px 14px', borderRadius:8, fontFamily:'var(--font-body)',
                  fontWeight:500, fontSize:15, textDecoration:'none', cursor:'pointer', transition:'all 0.2s',
                  color: active===l.href.replace('#','') ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  background: active===l.href.replace('#','') ? 'rgba(37,99,235,0.1)' : 'transparent' }}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Theme switcher */}
        <div style={{ display:'flex', gap:4, alignItems:'center' }}>
          <div style={{ display:'flex', gap:2, background:'var(--color-bg-alt)',
            borderRadius:10, padding:3, border:'1px solid var(--color-border)' }}>
            {THEMES.map(opt => (
              <button key={opt.value} onClick={() => setTheme(opt.value)} title={opt.label + ' theme'}
                style={{ display:'flex', alignItems:'center', justifyContent:'center',
                  width:32, height:28, borderRadius:8, border:'none', cursor:'pointer', transition:'all 0.2s',
                  background: theme===opt.value ? 'var(--color-primary)' : 'transparent',
                  color: theme===opt.value ? '#fff' : 'var(--color-text-muted)' }}>
                {opt.icon}
              </button>
            ))}
          </div>
          <button onClick={() => setMenuOpen(o=>!o)} aria-label="Menu"
            className="mobile-menu-btn"
            style={{ display:'none', width:36, height:36, alignItems:'center', justifyContent:'center',
              background:'var(--color-bg-alt)', border:'1px solid var(--color-border)',
              borderRadius:8, cursor:'pointer', color:'var(--color-text)' }}>
            {menuOpen ? <X size={18}/> : <Menu size={18}/>}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div style={{ position:'absolute', top:64, left:0, right:0, background:'var(--color-surface)',
          borderBottom:'1px solid var(--color-border)', padding:'12px 24px 20px', boxShadow:'var(--shadow-md)' }}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={e=>{ e.preventDefault(); scrollTo(l.href); }}
              style={{ display:'block', padding:'10px 0', fontFamily:'var(--font-body)',
                fontWeight:500, fontSize:16, textDecoration:'none', cursor:'pointer',
                color: active===l.href.replace('#','') ? 'var(--color-primary)' : 'var(--color-text)',
                borderBottom:'1px solid var(--color-border)' }}>
              {l.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
