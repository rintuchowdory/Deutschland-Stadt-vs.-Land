import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{borderTop:'1px solid var(--mid)',marginTop:'4rem'}}>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'2.5rem 1.5rem',display:'grid',gridTemplateColumns:'2fr 1fr 1fr',gap:'2rem'}}>
        <div>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
            <div style={{width:18,height:18,display:'flex',borderRadius:1,overflow:'hidden'}}>
              <div style={{flex:1,background:'var(--city)'}}/>
              <div style={{flex:1,background:'var(--land)'}}/>
            </div>
            <span style={{fontFamily:'IBM Plex Mono',fontSize:11,letterSpacing:'0.08em',textTransform:'uppercase'}}>Stadt&thinsp;/&thinsp;Land</span>
          </div>
          <p style={{fontSize:13,color:'var(--muted)',lineHeight:1.7,maxWidth:380}}>
            Ein datenbasierter Atlas, der Infrastruktur und Lebensqualität zwischen
            deutschen Stadt- und Landregionen vergleicht. Entstanden als Portfolio-Projekt
            zum Üben von React, Datenvisualisierung und API-Design.
          </p>
        </div>

        <div>
          <div style={{fontSize:11,fontFamily:'IBM Plex Mono',letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--muted)',marginBottom:10}}>Projekt</div>
          <div style={{display:'flex',flexDirection:'column',gap:8,fontSize:13}}>
            <Link to="/methodik" style={{color:'var(--ink)',textDecoration:'none'}}>Methodik</Link>
            <Link to="/finden" style={{color:'var(--ink)',textDecoration:'none'}}>Region finden</Link>
            <Link to="/dashboard" style={{color:'var(--ink)',textDecoration:'none'}}>Dashboard</Link>
          </div>
        </div>

        <div>
          <div style={{fontSize:11,fontFamily:'IBM Plex Mono',letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--muted)',marginBottom:10}}>Quellen (geplant)</div>
          <div style={{display:'flex',flexDirection:'column',gap:8,fontSize:13,color:'var(--muted)'}}>
            <a href="https://www.destatis.de" target="_blank" rel="noreferrer" style={{color:'var(--muted)',textDecoration:'none'}}>Destatis GENESIS</a>
            <a href="https://www.bundesnetzagentur.de" target="_blank" rel="noreferrer" style={{color:'var(--muted)',textDecoration:'none'}}>Bundesnetzagentur</a>
            <a href="https://www.openstreetmap.org" target="_blank" rel="noreferrer" style={{color:'var(--muted)',textDecoration:'none'}}>OpenStreetMap</a>
          </div>
        </div>
      </div>

      <div style={{borderTop:'1px solid var(--mid)',padding:'1.25rem 1.5rem'}}>
        <div style={{maxWidth:1100,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
          <span style={{fontSize:12,color:'var(--muted)'}}>
            Portfolio-Projekt von{' '}
            <a href="https://github.com/rintuchowdory" target="_blank" rel="noreferrer" style={{color:'var(--ink)',textDecoration:'underline'}}>Rintu Chowdory</a>
          </span>
          <a href="https://github.com/rintuchowdory/Deutschland-Stadt-vs.-Land" target="_blank" rel="noreferrer" style={{fontSize:12,color:'var(--ink)',textDecoration:'none',fontFamily:'IBM Plex Mono'}}>
            GitHub Repository →
          </a>
        </div>
      </div>
    </footer>
  )
}
