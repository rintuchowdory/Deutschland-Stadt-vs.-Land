import { regions, calcFairnessScore } from '../data/regions.js'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const S = { wrap:{maxWidth:1100,margin:'0 auto',padding:'3rem 1.5rem'}, eyebrow:{fontFamily:'IBM Plex Mono',fontSize:10,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--muted)',marginBottom:8} }

const DIMS = ['internet','oepnv','aerzte','bildung','arbeit','wohnen']
const DIM_LABEL = {internet:'Internet',oepnv:'ÖPNV',aerzte:'Ärzte',bildung:'Bildung',arbeit:'Arbeit',wohnen:'Wohnen'}

export default function Dashboard() {
  const data = regions.map(r => {
    const {total,dims} = calcFairnessScore(r)
    return {name: r.name.length>14 ? r.name.slice(0,13)+'…' : r.name, fullName:r.name, total, type:r.type, ...dims}
  }).sort((a,b)=>b.total-a.total)

  const cityAvg = Math.round(data.filter(d=>d.type==='city').reduce((s,d)=>s+d.total,0)/8)
  const landAvg = Math.round(data.filter(d=>d.type==='land').reduce((s,d)=>s+d.total,0)/8)

  return (
    <div style={S.wrap}>
      <div style={S.eyebrow}>Alle Regionen im Überblick</div>
      <h1 style={{fontFamily:'Cormorant Garamond',fontSize:'2.6rem',fontWeight:500,marginBottom:'0.5rem',color:'var(--ink)'}}>Dashboard</h1>
      <p style={{color:'var(--muted)',fontSize:14,marginBottom:'3rem'}}>Fairness-Score (0–100) für 16 Regionen, aufgeteilt nach 6 Dimensionen.</p>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:1,background:'var(--mid)',marginBottom:'3rem'}}>
        {[{label:'Ø Städte',val:cityAvg,color:'var(--city)'},{label:'Ø Landkreise',val:landAvg,color:'var(--land)'}].map(x=>(
          <div key={x.label} style={{background:'var(--paper)',padding:'1.5rem 2rem',display:'flex',alignItems:'center',gap:'1.5rem'}}>
            <div style={{fontFamily:'Cormorant Garamond',fontSize:'3.5rem',fontWeight:500,color:x.color,lineHeight:1}}>{x.val}</div>
            <div>
              <div style={{fontSize:13,fontWeight:600,color:'var(--ink)'}}>{x.label}</div>
              <div style={{fontSize:12,color:'var(--muted)'}}>Fairness-Score</div>
              <div style={{height:4,background:x.color,width:x.val+'%',marginTop:8,borderRadius:1,maxWidth:160}}/>
            </div>
          </div>
        ))}
      </div>

      <div style={{background:'white',border:'1px solid var(--mid)',padding:'2rem',marginBottom:'3rem'}}>
        <div style={S.eyebrow}>Gesamt-Ranking (Fairness-Score)</div>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} margin={{top:8,right:0,left:-10,bottom:48}}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8E4DC" vertical={false}/>
            <XAxis dataKey="name" tick={{fontSize:10,fontFamily:'IBM Plex Mono',fill:'#9A9489'}} angle={-35} textAnchor="end"/>
            <YAxis domain={[0,100]} tick={{fontSize:10,fill:'#9A9489'}}/>
            <Tooltip contentStyle={{background:'white',border:'1px solid var(--mid)',borderRadius:2,fontSize:12}} formatter={(v,n,p)=>[v, p.payload.fullName]}/>
            <Bar dataKey="total" radius={[1,1,0,0]}>
              {data.map((d,i)=><Cell key={i} fill={d.type==='city'?'#1A3A6B':'#1D6B4A'}/>)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div style={{display:'flex',gap:20,justifyContent:'center',marginTop:8}}>
          <div style={{display:'flex',alignItems:'center',gap:6,fontSize:11,color:'var(--muted)'}}><span style={{width:10,height:10,background:'var(--city)',display:'inline-block',borderRadius:1}}/> Stadt</div>
          <div style={{display:'flex',alignItems:'center',gap:6,fontSize:11,color:'var(--muted)'}}><span style={{width:10,height:10,background:'var(--land)',display:'inline-block',borderRadius:1}}/> Land</div>
        </div>
      </div>

      <div style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
          <thead>
            <tr style={{borderBottom:'2px solid var(--ink)'}}>
              <th style={{textAlign:'left',padding:'8px 12px',fontFamily:'IBM Plex Mono',fontSize:10,letterSpacing:'0.1em',textTransform:'uppercase'}}>Region</th>
              <th style={{textAlign:'center',padding:'8px 8px',fontFamily:'IBM Plex Mono',fontSize:10}}>Score</th>
              {DIMS.map(d=><th key={d} style={{textAlign:'center',padding:'8px 8px',fontFamily:'IBM Plex Mono',fontSize:10,color:'var(--muted)'}}>{DIM_LABEL[d]}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((row,i)=>(
              <tr key={row.name} style={{borderBottom:'1px solid var(--mid)',background:i%2===0?'white':'var(--paper)'}}>
                <td style={{padding:'10px 12px',display:'flex',alignItems:'center',gap:8}}>
                  <span style={{width:6,height:6,borderRadius:'50%',background:row.type==='city'?'var(--city)':'var(--land)',display:'inline-block',flexShrink:0}}/>
                  <span style={{fontWeight:500,color:'var(--ink)'}}>{row.fullName}</span>
                </td>
                <td style={{textAlign:'center',padding:'10px 8px',fontFamily:'Cormorant Garamond',fontSize:'1.3rem',fontWeight:600,color:row.total>=70?'var(--land)':row.total>=45?'var(--warn)':'var(--danger)'}}>{row.total}</td>
                {DIMS.map(d=>(
                  <td key={d} style={{textAlign:'center',padding:'10px 8px'}}>
                    <div style={{height:4,background:'var(--mid)',borderRadius:1,width:48,margin:'0 auto',overflow:'hidden'}}>
                      <div style={{height:'100%',width:row[d]+'%',background:row[d]>=70?'var(--land)':row[d]>=45?'var(--warn)':'var(--danger)',borderRadius:1}}/>
                    </div>
                    <div style={{fontSize:10,color:'var(--muted)',marginTop:2}}>{row[d]}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
