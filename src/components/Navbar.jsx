import { Link, useLocation } from 'react-router-dom'

const links = [
  { to:'/',          label:'Start'      },
  { to:'/dashboard', label:'Dashboard'  },
  { to:'/vergleich', label:'Vergleich'  },
  { to:'/karte',     label:'Karte'      },
]

export default function Navbar() {
  const { pathname } = useLocation()
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
        <nav style={{display:'flex',gap:4}}>
          {links.map(l=>(
            <Link key={l.to} to={l.to} style={{
              padding:'4px 12px',fontSize:13,textDecoration:'none',borderRadius:2,
              background: pathname===l.to ? 'var(--ink)' : 'transparent',
              color: pathname===l.to ? 'var(--paper)' : 'var(--muted)',
              transition:'all 0.15s',
            }}>{l.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
