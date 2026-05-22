import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const hobbies = [
  'Learning new web technologies and AI tools',
  'Building personal web projects',
  'Reading about technology and innovation',
  'Problem-solving and creative thinking',
  'Participating in coding bootcamps and online courses',
  'Team collaboration and knowledge sharing',
]

const INITIAL_SHOWN = 3

export default function About() {
  // useState for Show More / Show Less
  const [showMore, setShowMore] = useState(false)

  // Conditional slice — shows 3 or all hobbies
  const displayedHobbies = showMore ? hobbies : hobbies.slice(0, INITIAL_SHOWN)

  return (
    <section id="about" style={{
      maxWidth: '1100px', margin: '0 auto',
      padding: '80px 24px', borderTop: '1px solid var(--border)',
    }}>

      <p style={{
        fontSize: '0.8rem', fontWeight: 600,
        letterSpacing: '0.15em', textTransform: 'uppercase',
        color: 'var(--accent-orange)', marginBottom: '8px',
      }}>
        About Me
      </p>
      <h2 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(1.8rem, 4vw, 3rem)',
        fontWeight: 800, color: 'var(--text-primary)',
        marginBottom: '40px', letterSpacing: '-0.02em',
      }}>
        My Story
      </h2>

      <div className="about-grid" style={{
        display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: '48px',
      }}>

        {/* Goals column */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-heading)', fontSize: '1.2rem',
            fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px',
          }}>
            Goals &amp; Journey
          </h3>
          <p style={{
            fontSize: '0.975rem', color: 'var(--text-secondary)',
            lineHeight: 1.8, marginBottom: '16px',
          }}>
            I graduated from the CS Faculty of Kabul University in 2022. In 2024,
            I worked on a real-world project using Joomla CMS, strengthening my
            web development skills.
          </p>
          <p style={{
            fontSize: '0.975rem', color: 'var(--text-secondary)', lineHeight: 1.8,
          }}>
            Currently expanding my knowledge through the CodeWeekend bootcamp.
            My future goal is to grow in AI and build a successful career in technology.
          </p>
        </div>

        {/* Hobbies column */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-heading)', fontSize: '1.2rem',
            fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px',
          }}>
            What I Enjoy
          </h3>

          {/* JSX list rendered with .map() */}
          <ul style={{
            listStyle: 'none', display: 'flex',
            flexDirection: 'column', gap: '10px', marginBottom: '20px',
          }}>
            {displayedHobbies.map((hobby) => (
              <li key={hobby} style={{
                display: 'flex', alignItems: 'flex-start',
                gap: '12px', fontSize: '0.95rem',
                color: 'var(--text-secondary)', lineHeight: 1.5,
              }}>
                <span style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  backgroundColor: 'var(--accent-orange)',
                  marginTop: '7px', flexShrink: 0, display: 'inline-block',
                }} />
                {hobby}
              </li>
            ))}
          </ul>

          {/* Show More / Show Less button — useState toggle */}
          <button
            onClick={() => setShowMore(!showMore)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'none', border: '1px solid var(--border)',
              borderRadius: '8px', padding: '8px 16px',
              fontSize: '0.875rem', fontWeight: 500,
              color: 'var(--accent-orange)', cursor: 'pointer',
              transition: 'border-color 0.2s, background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-orange)'
              e.currentTarget.style.backgroundColor = 'var(--accent-orange-muted)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            {showMore ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {showMore ? 'Show Less' : `Show More (${hobbies.length - INITIAL_SHOWN} more)`}
          </button>
        </div>
      </div>
    </section>
  )
}
