import { useState, useMemo } from 'react'
import { cityRegions, landRegions, calcFairnessScore } from '../data/regions.js'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'

const DIMS = [
  {key:'internet',label:'Internet'},
  {key:'oepnv',label:'ÖPNV'},
  {key:'aerzte',label:'Ärzte'},
  {key:'bildung',label:'Bildung'},
  {key:'arbeit',label:'Arbeit'},
  {key:'wohnen',label:'Wohnen'},
]

const S = { wrap:{maxWidth:1100,margin:'0 auto',padding:'3rem 1.5rem'}, eyebrow:{fontFamily:'IBM Plex Mono',fontSize:10,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--muted)',marginBottom:8} }

function ScoreCircle({score,label,color}) {
  const r=42, c=2*Math.PI*r, dash=(score/100)*c
  return (
    <div style={{textAlign:'center'}}>
      <svg width={108} height={108} viewBox="0 0 108 108">
        <circle cx={54} cy={54} r={r} fill="none" stroke="#E8E4DC" strokeWidth={7}/>
        <circle cx={54} cy={54} r={r} fill="none" stroke={color} strokeWidth={7}
          strokeDasharray={`${dash} ${c}`} strokeLinecap="round" transform="rotate(-90 54 54)"
          style={{transition:'stroke-dasharray 0.5s ease'}}/>
        <text x={54} y={58} textAnchor="middle" fontSize={22} fontWeight={500} fill={color} fontFamily="Cormorant Garamond,serif">{score}</text>
      </svg>
      <div style={{fontSize:13,fontWeight:600,color:'var(--ink)',marginTop:4}}>{label}</div>
      <div style={{fontSize:11,color:'var(--muted)'}}>{score>=70?'🟢 Gut versorgt':score>=45?'🟡 Durchschnitt':'🔴 Abgehängt'}</div>
    </div>
  )
}

export default function Vergleich() {
  const [cityId, setCityId] = useState(cityRegions[0].id)
  const [landId, setLandId] = useState(landRegions[0].id)
  const city = useMemo(()=>cityRegions.find(r=>r.id===cityId),[cityId])
  const land = useMemo(()=>landRegions.find(r=>r.id===landId),[landId])
  const cs = useMemo(()=>calcFairnessScore(city),[city])
  const ls = useMemo(()=>calcFairnessScore(land),[land])
  const radarData = DIMS.map(d=>({dim:d.label, Stadt:cs.dims[d.key], Land:ls.dims[d.key]}))
  const metrics = [
    {label:'Internetgeschwindigkeit', cityV:city.metrics.internet.speed+' Mbit/s', landV:land.metrics.internet.speed+' Mbit/s', cityR:city.metrics.internet.speed, landR:land.metrics.internet.speed, max:290},
    {label:'Glasfaser-Ausbau', cityV:city.metrics.internet.glasfaser+'%', landV:land.metrics.internet.glasfaser+'%', cityR:city.metrics.internet.glasfaser, landR:land.metrics.internet.glasfaser, max:100},
    {label:'Bus-Verbindungen/Tag', cityV:city.metrics.oepnv.busseProTag, landV:land.metrics.oepnv.busseProTag, cityR:city.metrics.oepnv.busseProTag, landR:land.metrics.oepnv.busseProTag, max:850},
    {label:'Hausärzte / 10.000 EW', cityV:city.metrics.aerzte.hausaerztePro10k, landV:land.metrics.aerzte.hausaerztePro10k, cityR:city.metrics.aerzte.hausaerztePro10k, landR:land.metrics.aerzte.hausaerztePro10k, max:10},
    {label:'Ø Miete €/m²', cityV:city.metrics.wohnen.mietePro_m2+'€', landV:land.metrics.wohnen.mietePro_m2+'€', cityR:city.metrics.wohnen.mietePro_m2, landR:land.metrics.wohnen.mietePro_m2, max:23},
    {label:'Ø Gehalt €/Monat', cityV:city.metrics.arbeit.avgGehalt+'€', landV:land.metrics.arbeit.avgGehalt+'€', cityR:city.metrics.arbeit.avgGehalt, landR:land.metrics.arbeit.avgGehalt, max:4400},
  ]
  const gap = cs.total - ls.total
  return (
    <div style={S.wrap}>
      <div style={S.eyebrow}>Direkter Vergleich</div>
      <h1 style={{fontFamily:'Cormorant Garamond',fontSize:'2.6rem',fontWeight:500,marginBottom:'2rem',color:'var(--ink)'}}>Region vergleichen</h1>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:1,background:'var(--mid)',marginBottom:'2.5rem'}}>
        {[{regions:cityRegions,val:cityId,set:setCityId,label:'Stadtregion',color:'var(--city)'},{regions:landRegions,val:landId,set:setLandId,label:'Landregion',color:'var(--land)'}].map((x,i)=>(
          <div key={i} style={{background:'var(--paper)',padding:'1.25rem 1.5rem'}}>
            <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:8}}>
              <span style={{width:8,height:8,borderRadius:'50%',background:x.color,display:'inline-block'}}/>
              <span style={{fontSize:11,fontFamily:'IBM Plex Mono',letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--muted)'}}>{x.label}</span>
            </div>
            <select className="select-field" value={x.val} onChange={e=>x.set(e.target.value)}>
              {x.regions.map(r=><option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:1,background:'var(--mid)',marginBottom:'2.5rem'}}>
        <div style={{background:'white',padding:'2rem',display:'flex',flexDirection:'column',alignItems:'center',gap:'1rem'}}>
          <ScoreCircle score={cs.total} label={city.name} color="var(--city)"/>
          <div style={{textAlign:'center',padding:'0.5rem 1rem',background:gap>40?'#FDECEA':gap>20?'#FEF3E2':'#EDFBF4',borderRadius:2}}>
            <span style={{fontSize:12,color:gap>40?'var(--danger)':gap>20?'var(--warn)':'var(--land)',fontWeight:500}}>
              {gap>0?`Stadt führt um +${gap} Punkte`:`Gefälle: ${Math.abs(gap)} Punkte`}
            </span>
          </div>
          <ScoreCircle score={ls.total} label={land.name} color="var(--land)"/>
        </div>
        <div style={{background:'white',padding:'2rem'}}>
          <div style={S.eyebrow}>Radar — 6 Dimensionen</div>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData} margin={{top:10,right:30,left:30,bottom:10}}>
              <PolarGrid stroke="#E8E4DC"/>
              <PolarAngleAxis dataKey="dim" tick={{fontSize:10,fontFamily:'IBM Plex Mono',fill:'#9A9489'}}/>
              <Radar name={city.name} dataKey="Stadt" stroke="var(--city)" fill="var(--city)" fillOpacity={0.15} strokeWidth={2}/>
              <Radar name={land.name} dataKey="Land" stroke="var(--land)" fill="var(--land)" fillOpacity={0.15} strokeWidth={2}/>
              <Tooltip contentStyle={{fontSize:11,border:'1px solid var(--mid)',borderRadius:2}}/>
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div style={{background:'white',border:'1px solid var(--mid)'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
          <thead>
            <tr style={{borderBottom:'2px solid var(--ink)'}}>
              <th style={{textAlign:'left',padding:'12px 16px',fontFamily:'IBM Plex Mono',fontSize:10,letterSpacing:'0.1em',textTransform:'uppercase'}}>Kategorie</th>
              <th style={{textAlign:'right',padding:'12px 16px',color:'var(--city)',fontFamily:'IBM Plex Mono',fontSize:10}}>{city.name}</th>
              <th style={{width:120,padding:'12px 16px'}}/>
              <th style={{textAlign:'left',padding:'12px 16px',color:'var(--land)',fontFamily:'IBM Plex Mono',fontSize:10}}>{land.name}</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((m,i)=>{
              const cityW=Math.min(m.cityR/m.max*100,100), landW=Math.min(m.landR/m.max*100,100)
              return (
                <tr key={i} style={{borderBottom:'1px solid var(--mid)',background:i%2===0?'white':'var(--paper)'}}>
                  <td style={{padding:'14px 16px',fontWeight:500,color:'var(--ink)',fontSize:13}}>{m.label}</td>
                  <td style={{textAlign:'right',padding:'14px 16px',color:'var(--city)',fontWeight:600}}>{m.cityV}</td>
                  <td style={{padding:'14px 16px'}}>
                    <div style={{display:'flex',height:4,gap:1}}>
                      <div style={{flex:1,background:'var(--mid)',borderRadius:1,overflow:'hidden',display:'flex',justifyContent:'flex-end'}}>
                        <div style={{width:cityW+'%',background:'var(--city)',height:'100%',borderRadius:1}}/>
                      </div>
                      <div style={{flex:1,background:'var(--mid)',borderRadius:1,overflow:'hidden'}}>
                        <div style={{width:landW+'%',background:'var(--land)',height:'100%',borderRadius:1}}/>
                      </div>
                    </div>
                  </td>
                  <td style={{padding:'14px 16px',color:'var(--land)',fontWeight:600}}>{m.landV}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
