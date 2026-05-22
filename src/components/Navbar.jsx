import { useState } from 'react'
import { Menu, X, Moon, Sun } from 'lucide-react'

// Static nav links – no routing yet
const navLinks = [
  { label: 'Home',     href: '#home' },
  { label: 'About',    href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
]

// Props: isDark (boolean), onToggleTheme (function)
export default function Navbar({ isDark, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      backgroundColor: isDark ? 'rgba(8,8,8,0.85)' : 'rgba(250,248,244,0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      transition: 'background-color 0.3s',
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto', padding: '0 24px',
        height: '64px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <a href="#home" style={{
          fontFamily: 'var(--font-heading)', fontSize: '1.3rem',
          fontWeight: 800, color: 'var(--text-primary)',
        }}>
          ZA<span style={{ color: 'var(--accent-orange)' }}>.</span>
        </a>

        {/* Desktop links – .map() list rendering */}
        <div className="hidden-mobile"
             style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: '0.9rem', fontWeight: 500,
                color: 'var(--text-secondary)',
                transition: 'color 0.2s', cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-orange)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {link.label}
            </a>
          ))}

          {/* Theme toggle – conditional rendering with ternary */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            style={{
              background: 'none', border: '1px solid var(--border)',
              borderRadius: '8px', padding: '6px 8px', cursor: 'pointer',
              color: 'var(--text-secondary)', display: 'flex', alignItems: 'center',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-orange)'
              e.currentTarget.style.color = 'var(--accent-orange)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Mobile hamburger button */}
        <button
          className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-primary)', display: 'none', padding: '4px',
          }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown – conditional rendering with && */}
      {menuOpen && (
        <div style={{
          padding: '16px 24px', display: 'flex', flexDirection: 'column',
          gap: '16px', borderTop: '1px solid var(--border)',
          backgroundColor: isDark ? 'rgba(8,8,8,0.97)' : 'rgba(250,248,244,0.97)',
        }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: '1rem', fontWeight: 500,
                color: 'var(--text-secondary)', cursor: 'pointer',
              }}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onToggleTheme}
            style={{
              background: 'none', border: '1px solid var(--border)',
              borderRadius: '8px', padding: '8px 12px', cursor: 'pointer',
              color: 'var(--text-secondary)', display: 'flex',
              alignItems: 'center', gap: '8px', width: 'fit-content',
              fontSize: '0.875rem',
            }}
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      )}
    </nav>
  )
}
