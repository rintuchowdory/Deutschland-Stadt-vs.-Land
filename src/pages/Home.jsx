import { Link } from 'react-router-dom'
import { regions, calcFairnessScore } from '../data/regions.js'

const S = {
  wrap:{maxWidth:1100,margin:'0 auto',padding:'0 1.5rem'},
  eyebrow:{fontFamily:'IBM Plex Mono',fontSize:10,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--muted)',marginBottom:16},
}

export default function Home() {
  const worst = [...regions].map(r=>({...r,score:calcFairnessScore(r).total})).sort((a,b)=>a.score-b.score).slice(0,4)
  const cityAvg = Math.round(regions.filter(r=>r.type==='city').reduce((s,r)=>s+calcFairnessScore(r).total,0)/8)
  const landAvg = Math.round(regions.filter(r=>r.type==='land').reduce((s,r)=>s+calcFairnessScore(r).total,0)/8)

  return (
    <div>
      <section style={{borderBottom:'1px solid var(--mid)',padding:'5rem 0 4rem'}}>
        <div style={S.wrap}>
          <div style={S.eyebrow}>Lebensqualitäts-Atlas Deutschland</div>
          <h1 style={{fontFamily:'Cormorant Garamond',fontSize:'clamp(2.8rem,6vw,5rem)',fontWeight:500,lineHeight:1.08,maxWidth:680,marginBottom:'2rem',color:'var(--ink)'}}>
            Gleiche Chancen<br/>
            <em style={{color:'var(--muted)'}}>für alle?</em>
          </h1>
          <p style={{fontSize:16,color:'var(--muted)',maxWidth:520,lineHeight:1.7,marginBottom:'2.5rem'}}>
            Ein datenbasierter Vergleich von Infrastruktur, Versorgung und Lebensqualität zwischen deutschen Stadt- und Landregionen — in 6 Dimensionen, für 16 Regionen.
          </p>
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            <Link to="/vergleich" className="btn-primary">Region vergleichen</Link>
            <Link to="/dashboard" className="btn-outline">Alle Daten ansehen</Link>
          </div>
        </div>
      </section>
      <section style={{padding:'3.5rem 0',borderBottom:'1px solid var(--mid)'}}>
        <div style={{...S.wrap,display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1px',background:'var(--mid)'}}>
          {[
            {val:`${cityAvg}`,unit:'Stadt-Score',sub:'Ø über 8 Städte'},
            {val:`${landAvg}`,unit:'Land-Score',sub:'Ø über 8 Kreise'},
            {val:`${cityAvg-landAvg}`,unit:'Punkte Gefälle',sub:'Stadt schlägt Land'},
            {val:'16',unit:'Regionen',sub:'verglichen'},
          ].map((s,i)=>(
            <div key={i} style={{background:'var(--paper)',padding:'2rem 1.5rem'}}>
              <div style={{fontFamily:'Cormorant Garamond',fontSize:'3rem',fontWeight:500,lineHeight:1,color:'var(--ink)',marginBottom:6}}>{s.val}</div>
              <div style={{fontSize:13,fontWeight:600,color:'var(--ink)',marginBottom:2}}>{s.unit}</div>
              <div style={{fontSize:12,color:'var(--muted)'}}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{padding:'4rem 0',borderBottom:'1px solid var(--mid)'}}>
        <div style={S.wrap}>
          <div style={S.eyebrow}>6 Dimensionen</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',background:'var(--mid)'}}>
            {[
              {icon:'🌐',title:'Internet & 5G',w:'20%',desc:'Glasfaser-Ausbau, Download-Speed, Mobilfunkabdeckung'},
              {icon:'🚌',title:'ÖPNV',w:'22%',desc:'Busverbindungen pro Tag, Bahnhöfe, letzte Abfahrt'},
              {icon:'🏥',title:'Ärzteversorgung',w:'22%',desc:'Hausärzte & Fachärzte pro 10.000 Einwohner, Klinik-Entfernung'},
              {icon:'🏫',title:'Bildung',w:'16%',desc:'Schulen, Universitäten, Bibliotheken'},
              {icon:'💼',title:'Arbeit',w:'13%',desc:'Durchschnittsgehalt, offene Stellen, Arbeitslosenquote'},
              {icon:'🏠',title:'Wohnen',w:'7%',desc:'Durchschnittsmiete — günstig = gut für Landregionen'},
            ].map((c,i)=>(
              <div key={i} style={{background:'var(--paper)',padding:'1.75rem 1.5rem'}}>
                <div style={{fontSize:22,marginBottom:10}}>{c.icon}</div>
                <div style={{fontSize:14,fontWeight:600,color:'var(--ink)',marginBottom:4}}>{c.title}</div>
                <div style={{fontFamily:'IBM Plex Mono',fontSize:10,color:'var(--city)',letterSpacing:'0.06em',marginBottom:8}}>Gewicht {c.w}</div>
                <div style={{fontSize:12,color:'var(--muted)',lineHeight:1.6}}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{padding:'4rem 0'}}>
        <div style={S.wrap}>
          <div style={S.eyebrow}>Schlusslicht — niedrigste Fairness-Scores</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'1px',background:'var(--mid)'}}>
            {worst.map((r,i)=>(
              <div key={r.id} style={{background:'var(--paper)',padding:'1.5rem',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div>
                  <div style={{fontSize:11,fontFamily:'IBM Plex Mono',color:'var(--muted)',marginBottom:4}}>#{i+1} unterversorgt</div>
                  <div style={{fontSize:16,fontWeight:500,color:'var(--ink)'}}>{r.name}</div>
                  <div style={{fontSize:12,color:'var(--muted)'}}>{r.bundesland} · {r.einwohner.toLocaleString('de-DE')} Einwohner</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontFamily:'Cormorant Garamond',fontSize:'2.2rem',fontWeight:500,color:'var(--danger)',lineHeight:1}}>{r.score}</div>
                  <div style={{fontSize:11,color:'var(--muted)'}}>/ 100</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{marginTop:'2rem',textAlign:'center'}}>
            <Link to="/karte" className="btn-outline">Alle Regionen auf der Karte →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
