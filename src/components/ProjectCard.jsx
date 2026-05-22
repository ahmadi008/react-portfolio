import TechBadge from './TechBadge'
import { ExternalLink } from 'lucide-react'

// Reusable component — receives one project object as a prop
export default function ProjectCard({ project }) {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '12px', padding: '24px',
        display: 'flex', flexDirection: 'column',
        gap: '16px', position: 'relative',
        transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-accent)'
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(249,115,22,0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >

      {/* Featured badge — conditional rendering with && */}
      {project.featured && (
        <span style={{
          position: 'absolute', top: '16px', right: '16px',
          padding: '3px 10px', fontSize: '10px', fontWeight: 700,
          fontFamily: 'var(--font-heading)', letterSpacing: '0.1em',
          textTransform: 'uppercase', color: '#000',
          backgroundColor: 'var(--accent-orange)', borderRadius: '20px',
        }}>
          Featured
        </span>
      )}

      {/* Project name */}
      <h3 style={{
        fontFamily: 'var(--font-heading)', fontSize: '1.2rem',
        fontWeight: 700, color: 'var(--text-primary)',
        paddingRight: project.featured ? '80px' : '0',
      }}>
        {project.name}
      </h3>

      {/* Description */}
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '0.9rem', lineHeight: 1.6,
      }}>
        {project.description}
      </p>

      {/* Tech stack badges — .map() rendering of TechBadge components */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {project.techStack.map((tech) => (
          <TechBadge key={tech} tech={tech} />
        ))}
      </div>

      {/* Project link */}
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          color: 'var(--accent-orange)', fontSize: '0.875rem',
          fontWeight: 500, marginTop: 'auto',
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        <ExternalLink size={14} />
        View Project
      </a>
    </div>
  )
}
