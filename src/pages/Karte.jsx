import { useState } from 'react'
import { regions, calcFairnessScore } from '../data/regions.js'

const S = { wrap:{maxWidth:1100,margin:'0 auto',padding:'3rem 1.5rem'}, eyebrow:{fontFamily:'IBM Plex Mono',fontSize:10,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--muted)',marginBottom:8} }

function toSVG(lat,lon) {
  const x = ((lon - 5.9) / (15.0 - 5.9)) * 540 + 30
  const y = ((55.1 - lat) / (55.1 - 47.2)) * 480 + 30
  return [x, y]
}

function scoreColor(score) {
  if (score >= 70) return '#1D6B4A'
  if (score >= 45) return '#C47A1A'
  return '#B53A2F'
}

export default function Karte() {
  const [hovered, setHovered] = useState(null)
  const [filter, setFilter] = useState('all')
  const scored = regions.map(r => ({...r, score: calcFairnessScore(r).total}))
  const filtered = filter === 'all' ? scored : scored.filter(r => r.type === filter)

  return (
    <div style={S.wrap}>
      <div style={S.eyebrow}>Geografische Verteilung</div>
      <h1 style={{fontFamily:'Cormorant Garamond',fontSize:'2.6rem',fontWeight:500,marginBottom:'0.5rem',color:'var(--ink)'}}>Karte</h1>
      <p style={{color:'var(--muted)',fontSize:14,marginBottom:'2rem'}}>Fairness-Score je Region — Ampel-Codierung nach Versorgungsqualität.</p>
      <div style={{display:'flex',gap:8,marginBottom:'1.5rem'}}>
        {[['all','Alle'],['city','Städte'],['land','Landkreise']].map(([v,l])=>(
          <button key={v} onClick={()=>setFilter(v)} style={{padding:'4px 14px',fontSize:12,fontFamily:'IBM Plex Mono',border:'1px solid var(--mid)',borderRadius:2,cursor:'pointer',background:filter===v?'var(--ink)':'transparent',color:filter===v?'var(--paper)':'var(--muted)',transition:'all 0.15s'}}>{l}</button>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:'1.5rem',alignItems:'start'}}>
        <div style={{background:'white',border:'1px solid var(--mid)',position:'relative'}}>
          <svg viewBox="0 0 600 540" style={{width:'100%',display:'block'}}>
            <path d="M180,30 L220,25 L280,35 L340,28 L390,40 L430,55 L460,90 L520,100 L560,140 L555,180 L530,200 L545,240 L530,280 L510,310 L490,350 L460,380 L430,420 L400,460 L370,490 L340,510 L300,515 L270,500 L240,480 L210,460 L180,430 L160,400 L140,370 L120,340 L100,300 L90,260 L95,220 L80,180 L90,140 L110,110 L130,80 L155,55 Z" fill="#F5F3EE" stroke="#E8E4DC" strokeWidth={1.5}/>
            {filtered.map(r => {
              const [x,y] = toSVG(r.coords[0], r.coords[1])
              const col = scoreColor(r.score)
              const isH = hovered?.id === r.id
              return (
                <g key={r.id} onMouseEnter={()=>setHovered(r)} onMouseLeave={()=>setHovered(null)} style={{cursor:'pointer'}}>
                  <circle cx={x} cy={y} r={isH?14:10} fill={col} opacity={0.15}/>
                  <circle cx={x} cy={y} r={isH?8:6} fill={col} stroke="white" strokeWidth={1.5}/>
                  {isH && (
                    <g>
                      <rect x={x+12} y={y-22} width={130} height={42} rx={2} fill="white" stroke="#E8E4DC" strokeWidth={1}/>
                      <text x={x+20} y={y-8} fontSize={11} fontWeight={600} fill="#0D0D0D" fontFamily="IBM Plex Sans,sans-serif">{r.name}</text>
                      <text x={x+20} y={y+8} fontSize={10} fill="#9A9489" fontFamily="IBM Plex Mono,monospace">Score: {r.score}/100</text>
                    </g>
                  )}
                </g>
              )
            })}
          </svg>
          <div style={{position:'absolute',bottom:12,left:12,background:'white',border:'1px solid var(--mid)',padding:'8px 12px',borderRadius:2}}>
            {[['#1D6B4A','≥70 Gut versorgt'],['#C47A1A','45–69 Durchschnitt'],['#B53A2F','<45 Abgehängt']].map(([c,l])=>(
              <div key={l} style={{display:'flex',alignItems:'center',gap:6,fontSize:10,fontFamily:'IBM Plex Mono',marginBottom:3}}>
                <span style={{width:8,height:8,borderRadius:'50%',background:c,display:'inline-block'}}/>{l}
              </div>
            ))}
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'1px',background:'var(--mid)'}}>
          {scored.sort((a,b)=>b.score-a.score).map(r=>(
            <div key={r.id} onMouseEnter={()=>setHovered(r)} onMouseLeave={()=>setHovered(null)} style={{background:hovered?.id===r.id?'var(--mid)':'white',padding:'12px 14px',cursor:'pointer',transition:'background 0.1s'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:2}}>
                    <span style={{width:6,height:6,borderRadius:'50%',background:r.type==='city'?'var(--city)':'var(--land)',display:'inline-block'}}/>
                    <span style={{fontSize:12,fontWeight:500,color:'var(--ink)'}}>{r.name}</span>
                  </div>
                  <div style={{fontSize:10,fontFamily:'IBM Plex Mono',color:'var(--muted)'}}>{r.bundesland}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontFamily:'Cormorant Garamond',fontSize:'1.4rem',fontWeight:500,color:scoreColor(r.score),lineHeight:1}}>{r.score}</div>
                  <div style={{height:3,background:scoreColor(r.score),width:Math.round(r.score/2)+'px',marginLeft:'auto',marginTop:3,borderRadius:1}}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
