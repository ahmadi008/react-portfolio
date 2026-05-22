import ProjectCard from './ProjectCard'

// Array of project objects
const projects = [
  {
    id: 1,
    name: 'School Portal',
    description: 'A school portal system for managing student information and academic resources. Built with Joomla CMS during a real-world project.',
    link: 'https://ahmadi008.github.io/school-portal/',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Joomla'],
    featured: true,
  },
  {
    id: 2,
    name: 'Freelance Invoice App',
    description: 'A professional invoice generator for freelancers to create, manage, and track client invoices with a clean, practical UI.',
    link: 'https://ahmadi008.github.io/freelance-invoice-app/',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    featured: true,
  },
  {
    id: 3,
    name: 'Reading Championship',
    description: 'An interactive reading challenge platform designed to encourage reading habits and track progress in a competitive format.',
    link: 'https://ahmadi008.github.io/reading-championship/',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    featured: false,
  },
  {
    id: 4,
    name: 'Movie Theater Page',
    description: 'A movie theater landing page featuring listings, showtime schedules, and an attractive booking interface design.',
    link: 'https://ahmadi008.github.io/movie-theater-page/',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    featured: false,
  },
  {
    id: 5,
    name: 'Personal Webpage',
    description: 'A personal website showcasing skills, background, and early portfolio work — a foundation that continues to evolve.',
    link: 'https://ahmadi008.github.io/personal-webpage/',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    featured: false,
  },
]

export default function Projects() {
  return (
    <section id="projects" style={{
      maxWidth: '1100px', margin: '0 auto',
      padding: '80px 24px', borderTop: '1px solid var(--border)',
    }}>

      <p style={{
        fontSize: '0.8rem', fontWeight: 600,
        letterSpacing: '0.15em', textTransform: 'uppercase',
        color: 'var(--accent-orange)', marginBottom: '8px',
      }}>
        Portfolio
      </p>
      <h2 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(1.8rem, 4vw, 3rem)',
        fontWeight: 800, color: 'var(--text-primary)',
        marginBottom: '12px', letterSpacing: '-0.02em',
      }}>
        Projects
      </h2>
      <p style={{
        fontSize: '0.975rem', color: 'var(--text-muted)',
        marginBottom: '48px', maxWidth: '480px',
      }}>
        A selection of work I have built. Featured projects are my most polished work.
      </p>

      {/* Render project cards with .map() */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
      }}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
