import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { findRegionByPLZ } from '../data/plz.js'
import { getRegionById, calcFairnessScore } from '../data/regions.js'

const S = { wrap:{maxWidth:680,margin:'0 auto',padding:'4rem 1.5rem'}, eyebrow:{fontFamily:'IBM Plex Mono',fontSize:10,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--muted)',marginBottom:8} }

export default function Finden() {
  const [plz, setPlz] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    const cleaned = plz.trim()
    if (!/^\d{5}$/.test(cleaned)) {
      setError('Bitte eine gültige 5-stellige Postleitzahl eingeben.')
      setResult(null)
      return
    }
    setError('')
    const match = findRegionByPLZ(cleaned)
    setResult(match)
  }

  const cityRegion = result ? getRegionById(result.city) : null
  const landRegion = result ? getRegionById(result.land) : null
  const cityScore  = cityRegion ? calcFairnessScore(cityRegion).total : null
  const landScore  = landRegion ? calcFairnessScore(landRegion).total : null

  return (
    <div style={S.wrap}>
      <div style={S.eyebrow}>Finde meine Region</div>
      <h1 style={{fontFamily:'Cormorant Garamond',fontSize:'2.6rem',fontWeight:500,marginBottom:'1rem',color:'var(--ink)'}}>Wo stehst du?</h1>
      <p style={{color:'var(--muted)',fontSize:15,lineHeight:1.7,marginBottom:'2rem'}}>
        Gib deine Postleitzahl ein — wir zeigen dir die nächstgelegene Stadt- und
        Landregion aus unserem Datensatz und vergleichen direkt deren Fairness-Scores.
      </p>

      <form onSubmit={handleSearch} style={{display:'flex',gap:10,marginBottom:'2rem'}}>
        <input
          type="text"
          inputMode="numeric"
          maxLength={5}
          placeholder="z.B. 52062"
          value={plz}
          onChange={e=>setPlz(e.target.value.replace(/\D/g,''))}
          className="select-field"
          style={{cursor:'text',fontFamily:'IBM Plex Mono',fontSize:16,letterSpacing:'0.05em'}}
        />
        <button type="submit" className="btn-primary" style={{whiteSpace:'nowrap',cursor:'pointer',border:'none'}}>Suchen</button>
      </form>

      {error && (
        <div style={{background:'#FDECEA',border:'1px solid #F5C6C0',color:'var(--danger)',padding:'0.75rem 1rem',borderRadius:2,fontSize:13,marginBottom:'1.5rem'}}>
          {error}
        </div>
      )}

      {result && (
        <div>
          <div style={{fontSize:12,fontFamily:'IBM Plex Mono',color:'var(--muted)',marginBottom:'1rem'}}>
            Gefunden: {result.label}
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:1,background:'var(--mid)',marginBottom:'1.5rem'}}>
            <div style={{background:'white',padding:'1.5rem'}}>
              <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:8}}>
                <span style={{width:8,height:8,borderRadius:'50%',background:'var(--city)',display:'inline-block'}}/>
                <span style={{fontSize:11,fontFamily:'IBM Plex Mono',letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--muted)'}}>Nächste Stadt</span>
              </div>
              <div style={{fontSize:18,fontWeight:500,color:'var(--ink)',marginBottom:6}}>{cityRegion.name}</div>
              <div style={{fontFamily:'Cormorant Garamond',fontSize:'2.4rem',fontWeight:500,color:'var(--city)',lineHeight:1}}>{cityScore}</div>
              <div style={{fontSize:11,color:'var(--muted)'}}>Fairness-Score / 100</div>
            </div>

            <div style={{background:'white',padding:'1.5rem'}}>
              <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:8}}>
                <span style={{width:8,height:8,borderRadius:'50%',background:'var(--land)',display:'inline-block'}}/>
                <span style={{fontSize:11,fontFamily:'IBM Plex Mono',letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--muted)'}}>Nächste Landregion</span>
              </div>
              <div style={{fontSize:18,fontWeight:500,color:'var(--ink)',marginBottom:6}}>{landRegion.name}</div>
              <div style={{fontFamily:'Cormorant Garamond',fontSize:'2.4rem',fontWeight:500,color:'var(--land)',lineHeight:1}}>{landScore}</div>
              <div style={{fontSize:11,color:'var(--muted)'}}>Fairness-Score / 100</div>
            </div>
          </div>

          <button
            onClick={()=>navigate('/vergleich')}
            className="btn-outline"
            style={{cursor:'pointer',border:'1px solid var(--ink)'}}
          >
            Detaillierten Vergleich ansehen →
          </button>
        </div>
      )}

      <div style={{marginTop:'3rem',padding:'1rem 1.25rem',background:'#FEF3E2',border:'1px solid #F0DCB8',borderRadius:2,fontSize:12,color:'var(--ink)',lineHeight:1.6}}>
        ⚠ Vereinfachte Zuordnung nach 1. PLZ-Ziffer (Demo). Phase 2 nutzt eine echte
        PLZ-zu-Landkreis-Datenbank für präzise Ergebnisse.
      </div>
    </div>
  )
}
