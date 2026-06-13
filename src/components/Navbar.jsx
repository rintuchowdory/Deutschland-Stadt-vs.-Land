import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const links = [
  { to:'/',          label:'Start'      },
  { to:'/dashboard', label:'Dashboard'  },
  { to:'/vergleich', label:'Vergleich'  },
  { to:'/karte',     label:'Karte'      },
  { to:'/finden',    label:'Finden'     },
  { to:'/methodik',  label:'Methodik'   },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <header style={{borderBottom:'1px solid var(--mid)',background:'var(--paper)',position:'sticky',top:0,zIndex:50}}>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'0 1.5rem',height:52,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Link to="/" style={{textDecoration:'none',display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:22,height:22,display:'flex',borderRadius:1,overflow:'hidden'}}>
            <div style={{flex:1,background:'var(--city)'}}/>
            <div style={{flex:1,background:'var(--land)'}}/>
          </div>
          <span style={{fontFamily:'IBM Plex Mono',fontSize:11,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--ink)'}}>
            Stadt&thinsp;/&thinsp;Land
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{display:'flex',gap:4}} className="desktop-nav">
          {links.map(l=>(
            <Link key={l.to} to={l.to} style={{
              padding:'4px 12px',fontSize:13,textDecoration:'none',borderRadius:2,
              background: pathname===l.to ? 'var(--ink)' : 'transparent',
              color: pathname===l.to ? 'var(--paper)' : 'var(--muted)',
              transition:'all 0.15s',
            }}>{l.label}</Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={()=>setOpen(!open)}
          className="mobile-toggle"
          style={{display:'none',border:'none',background:'transparent',fontSize:18,cursor:'pointer',color:'var(--ink)'}}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="mobile-nav" style={{display:'none',flexDirection:'column',borderTop:'1px solid var(--mid)',padding:'0.5rem 1.5rem 1rem'}}>
          {links.map(l=>(
            <Link key={l.to} to={l.to} onClick={()=>setOpen(false)} style={{
              padding:'10px 0',fontSize:14,textDecoration:'none',
              color: pathname===l.to ? 'var(--ink)' : 'var(--muted)',
              fontWeight: pathname===l.to ? 600 : 400,
              borderBottom:'1px solid var(--mid)',
            }}>{l.label}</Link>
          ))}
        </nav>
      )}

      <style>{`
        @media (max-width: 720px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
          .mobile-nav { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
