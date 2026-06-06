import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Star, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';

const ALL_PROJECTS = [
  { id:1, title:'School Portal',      desc:'Full school management with Joomla CMS.',         details:'Student registration, timetable, announcements. Deployed at a real school.', tech:['Joomla','PHP','MySQL','CSS'], featured:true,  priority:'high',   color:'#F44321' },
  { id:2, title:'Freelance Invoice',  desc:'Web app for generating freelance invoices.',       details:'Multi-client support, custom line items, PDF export. Built with vanilla JS.', tech:['HTML','CSS','JavaScript'], featured:true,  priority:'high',   color:'#2563EB' },
  { id:3, title:'Reading Championship',desc:'Interactive school reading competition platform.',  details:'Leaderboards, progress tracking, book reviews. Fully responsive.', tech:['HTML','CSS','JavaScript'], featured:false, priority:'medium', color:'#10B981' },
  { id:4, title:'Movie Theater Page', desc:'Cinema listing page with movie cards & showtimes.', details:'Responsive grid with CSS animations. Includes search/filter.',    tech:['HTML','CSS'],               featured:false, priority:'medium', color:'#8B5CF6' },
  { id:5, title:'Personal Webpage',   desc:'My first personal portfolio — the foundation!',     details:'Evolved from a simple HTML page to this full React portfolio.',    tech:['HTML','CSS'],               featured:false, priority:'low',    color:'#F97316' },
];

const ALL_TAGS = ['All','HTML','CSS','JavaScript','React','Joomla','PHP'];

const UPDATES = [
  'Added TypeScript to the Freelance Invoice App',
  'School Portal now has a mobile-responsive layout',
  'Reading Championship hit 200 student registrations',
  'New React hooks portfolio project coming soon...',
  'Movie Theater Page got a dark mode update!',
  'Exploring Next.js for the next big project',
];

export default function Projects() {
  const sectionRef  = useRef(null);
  const [filter,    setFilter]    = useState('All');
  const [expanded,  setExpanded]  = useState(new Set());
  const [updateIdx, setUpdateIdx] = useState(0);
  const [updateAnim,setUpdateAnim]= useState(false);
  const [newUpdate, setNewUpdate] = useState(UPDATES[0]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Polling every 15s — cleanup with clearInterval
  useEffect(() => {
    const interval = setInterval(() => {
      const next = (updateIdx + 1) % UPDATES.length;
      setUpdateAnim(true);
      setTimeout(() => { setUpdateIdx(next); setNewUpdate(UPDATES[next]); setUpdateAnim(false); }, 400);
    }, 15000);
    return () => clearInterval(interval); // cleanup!
  }, [updateIdx]);

  const toggle = (id) => setExpanded(prev => {
    const s = new Set(prev);
    s.has(id) ? s.delete(id) : s.add(id);
    return s;
  });

  const filtered = ALL_PROJECTS.filter(p => filter === 'All' || p.tech.includes(filter));

  return (
    <section ref={sectionRef} id="projects" style={{ padding:'100px 24px', background:'var(--color-bg-alt)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div className="reveal" style={{ textAlign:'center', marginBottom:40 }}>
          <p style={{ fontFamily:'var(--font-body)', fontSize:13, letterSpacing:4, textTransform:'uppercase', color:'var(--color-primary)', fontWeight:600, marginBottom:8 }}>Portfolio</p>
          <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(36px,6vw,64px)', fontWeight:700, color:'var(--color-text)' }}>Projects</h2>
        </div>

        {/* Live update ticker — polling result */}
        <div className="reveal" style={{ background:'var(--color-surface)', border:'1px solid var(--color-border)',
          borderLeft:'4px solid var(--color-primary)', borderRadius:'var(--radius)',
          padding:'12px 16px', marginBottom:32, display:'flex', alignItems:'center', gap:10, boxShadow:'var(--shadow-sm)' }}>
          <RefreshCw size={14} style={{ color:'var(--color-primary)', animation:'pulse 2s ease infinite', flexShrink:0 }} />
          <span style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--color-text-muted)' }}>Live update</span>
          <span style={{ fontFamily:'var(--font-body)', fontSize:14, fontWeight:600, color:'var(--color-text)',
            transition:'opacity 0.4s, transform 0.4s', opacity:updateAnim?0:1, transform:updateAnim?'translateY(-8px)':'translateY(0)' }}>
            {newUpdate}
          </span>
          <span style={{ marginLeft:'auto', fontFamily:'var(--font-body)', fontSize:12, color:'var(--color-text-muted)' }}>refreshes every 15s</span>
        </div>

        {/* Filter buttons */}
        <div className="reveal" style={{ display:'flex', gap:8, flexWrap:'wrap', justifyContent:'center', marginBottom:40 }}>
          {ALL_TAGS.map(tag => (
            <button key={tag} onClick={() => setFilter(tag)}
              style={{ padding:'7px 18px', borderRadius:100, border:'1px solid',
                borderColor: filter===tag ? 'var(--color-primary)' : 'var(--color-border)',
                background: filter===tag ? 'var(--color-primary)' : 'var(--color-surface)',
                color: filter===tag ? '#fff' : 'var(--color-text-muted)',
                fontFamily:'var(--font-body)', fontSize:13, fontWeight:500, cursor:'pointer', transition:'all 0.2s' }}>
              {tag}
            </button>
          ))}
        </div>

        {/* Empty state — conditional rendering */}
        {filtered.length === 0 && (
          <div style={{ textAlign:'center', padding:'60px 24px', background:'var(--color-surface)',
            borderRadius:'var(--radius-lg)', border:'2px dashed var(--color-border)' }}>
            <p style={{ fontFamily:'var(--font-heading)', fontSize:24, color:'var(--color-text-muted)' }}>
              No projects with this tech stack yet
            </p>
            <button onClick={() => setFilter('All')}
              style={{ marginTop:16, padding:'8px 24px', background:'var(--color-primary)', color:'#fff',
                border:'none', borderRadius:8, fontFamily:'var(--font-body)', cursor:'pointer' }}>
              Show all
            </button>
          </div>
        )}

        {/* Project grid — rendered with .map() */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:24 }}>
          {filtered.map((p, i) => (
            <div key={p.id} className="reveal" style={{ transitionDelay:`${i*80}ms` }}>
              <div style={{ background:'var(--color-surface)', borderRadius:'var(--radius-lg)',
                border:'1px solid var(--color-border)', padding:24, height:'100%', display:'flex',
                flexDirection:'column', boxShadow:'var(--shadow-sm)', transition:'all 0.3s ease' }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='var(--shadow-lg)'; e.currentTarget.style.borderColor=p.color; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='var(--shadow-sm)'; e.currentTarget.style.borderColor='var(--color-border)'; }}>

                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
                  <div style={{ width:4, height:40, borderRadius:2, background:p.color, flexShrink:0 }} />
                  <h3 style={{ fontFamily:'var(--font-heading)', fontSize:22, fontWeight:600, color:'var(--color-text)', flex:1 }}>{p.title}</h3>
                  {/* Conditional: Featured badge */}
                  {p.featured && (
                    <span style={{ padding:'3px 10px', borderRadius:100, background:'rgba(249,115,22,0.15)',
                      border:'1px solid #F97316', color:'#EA580C', fontFamily:'var(--font-body)',
                      fontSize:11, fontWeight:700, display:'flex', alignItems:'center', gap:4 }}>
                      <Star size={10} fill="currentColor" /> Featured
                    </span>
                  )}
                  {/* Conditional: high-priority dot */}
                  {p.priority==='high' && (
                    <span style={{ width:8, height:8, borderRadius:'50%', background:'#10B981',
                      boxShadow:'0 0 6px #10B98180' }} title="High priority" />
                  )}
                </div>

                <p style={{ fontFamily:'var(--font-body)', fontSize:14, color:'var(--color-text-muted)',
                  lineHeight:1.7, marginBottom:16, flex:1 }}>{p.desc}</p>

                {/* Tech tags */}
                <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:16 }}>
                  {p.tech.map(t => (
                    <span key={t} style={{ padding:'3px 10px', borderRadius:6,
                      background:'var(--color-bg-alt)', border:'1px solid var(--color-border)',
                      fontFamily:'var(--font-body)', fontSize:12, fontWeight:500, color:'var(--color-text-muted)' }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* View Details toggle */}
                <button onClick={() => toggle(p.id)}
                  style={{ display:'flex', alignItems:'center', gap:6, background:'transparent',
                    border:'1px solid var(--color-border)', borderRadius:8, padding:'7px 14px',
                    fontFamily:'var(--font-body)', fontSize:13, fontWeight:500, color:'var(--color-text-muted)',
                    cursor:'pointer', transition:'all 0.2s', width:'100%', justifyContent:'center' }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor=p.color; e.currentTarget.style.color=p.color; }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--color-border)'; e.currentTarget.style.color='var(--color-text-muted)'; }}>
                  {expanded.has(p.id) ? <><ChevronUp size={14}/> Hide Details</> : <><ChevronDown size={14}/> View Details</>}
                </button>

                {/* Expandable detail */}
                {expanded.has(p.id) && (
                  <div style={{ marginTop:12, padding:14, background:'var(--color-bg-alt)',
                    borderRadius:8, borderLeft:`3px solid ${p.color}`, animation:'fadeInUp 0.3s ease' }}>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:13, color:'var(--color-text)', lineHeight:1.7, marginBottom:10 }}>
                      {p.details}
                    </p>
                    <a href="#" style={{ display:'inline-flex', alignItems:'center', gap:4, color:p.color,
                      fontFamily:'var(--font-body)', fontSize:13, fontWeight:600, textDecoration:'none' }}>
                      <ExternalLink size={13}/> View Live
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
