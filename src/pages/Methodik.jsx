const S = { wrap:{maxWidth:760,margin:'0 auto',padding:'3rem 1.5rem'}, eyebrow:{fontFamily:'IBM Plex Mono',fontSize:10,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--muted)',marginBottom:8} }

const dims = [
  { key:'oepnv',    name:'ÖPNV',              weight:22, desc:'Busverbindungen pro Tag (70%) und Anzahl Bahnhöfe (30%). Mobilität ohne eigenes Auto ist auf dem Land oft der größte Unterschied.', range:'5–850 Busse/Tag' },
  { key:'aerzte',   name:'Ärzteversorgung',   weight:22, desc:'Hausärzte pro 10.000 Einwohner (35%), Fachärzte pro 10.000 (35%) und Entfernung zur nächsten Klinik (30%, invertiert — näher ist besser).', range:'2–28 Ärzte/10k, 0,5–36 km' },
  { key:'internet', name:'Internet & 5G',     weight:20, desc:'Download-Geschwindigkeit (40%), Glasfaser-Ausbaugrad (35%) und 5G-Abdeckung (25%).', range:'20–290 Mbit/s' },
  { key:'bildung',  name:'Bildung',           weight:16, desc:'Anzahl Schulen (65%) und Universitäten (35%) in der Region.', range:'5–850 Schulen, 0–10 Unis' },
  { key:'arbeit',   name:'Arbeit',            weight:13, desc:'Durchschnittsgehalt (55%) und Anzahl offener Stellen (45%).', range:'2.200–4.400 €' },
  { key:'wohnen',   name:'Wohnen',            weight:7,  desc:'Durchschnittsmiete pro m² — hier gilt: günstiger ist besser, was Landregionen einen kleinen Bonus gibt.', range:'5–23 €/m²' },
]

export default function Methodik() {
  return (
    <div style={S.wrap}>
      <div style={S.eyebrow}>Transparenz & Berechnung</div>
      <h1 style={{fontFamily:'Cormorant Garamond',fontSize:'2.6rem',fontWeight:500,marginBottom:'1rem',color:'var(--ink)'}}>Methodik</h1>
      <p style={{color:'var(--muted)',fontSize:15,lineHeight:1.7,marginBottom:'2.5rem'}}>
        Der Fairness-Score (0–100) fasst sechs Dimensionen der Lebensqualität zu einem
        einzigen, vergleichbaren Wert zusammen. So funktioniert die Berechnung im Detail.
      </p>

      {/* Schritt 1 */}
      <div style={{marginBottom:'2.5rem'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
          <div style={{width:24,height:24,borderRadius:'50%',background:'var(--ink)',color:'var(--paper)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontFamily:'IBM Plex Mono',flexShrink:0}}>1</div>
          <h2 style={{fontFamily:'Cormorant Garamond',fontSize:'1.6rem',fontWeight:500,color:'var(--ink)'}}>Min-Max-Normalisierung</h2>
        </div>
        <p style={{fontSize:14,color:'var(--muted)',lineHeight:1.7,marginLeft:34}}>
          Jeder Rohwert (z.B. „52 Mbit/s Internet“) wird auf eine Skala von 0 bis 1 projiziert,
          basierend auf realistischen Minimum- und Maximum-Werten aus dem Datensatz.
          Eine Region am unteren Ende eines Bereichs erhält 0, am oberen Ende 1.
        </p>
        <div style={{marginLeft:34,marginTop:14,background:'white',border:'1px solid var(--mid)',padding:'1rem 1.25rem',fontFamily:'IBM Plex Mono',fontSize:12,color:'var(--ink)'}}>
          normalisiert = (wert − min) / (max − min) &nbsp;→&nbsp; auf [0,1] begrenzt
        </div>
      </div>

      {/* Schritt 2 */}
      <div style={{marginBottom:'2.5rem'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
          <div style={{width:24,height:24,borderRadius:'50%',background:'var(--ink)',color:'var(--paper)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontFamily:'IBM Plex Mono',flexShrink:0}}>2</div>
          <h2 style={{fontFamily:'Cormorant Garamond',fontSize:'1.6rem',fontWeight:500,color:'var(--ink)'}}>Gewichtete Dimensionen</h2>
        </div>
        <p style={{fontSize:14,color:'var(--muted)',lineHeight:1.7,marginLeft:34,marginBottom:'1.25rem'}}>
          Die sechs Dimensionen fließen mit unterschiedlichem Gewicht in den Gesamtscore ein —
          ÖPNV und Ärzteversorgung wiegen am stärksten, da sie den Alltag am direktesten beeinflussen.
        </p>
        <div style={{marginLeft:34,display:'flex',flexDirection:'column',gap:1,background:'var(--mid)'}}>
          {dims.map(d=>(
            <div key={d.key} style={{background:'white',padding:'1rem 1.25rem'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:6}}>
                <span style={{fontSize:14,fontWeight:600,color:'var(--ink)'}}>{d.name}</span>
                <span style={{fontFamily:'Cormorant Garamond',fontSize:'1.4rem',fontWeight:500,color:'var(--city)'}}>{d.weight}%</span>
              </div>
              <div style={{height:4,background:'var(--mid)',borderRadius:1,marginBottom:8,overflow:'hidden'}}>
                <div style={{height:'100%',width:d.weight*3+'%',background:'var(--city)',borderRadius:1}}/>
              </div>
              <p style={{fontSize:13,color:'var(--muted)',lineHeight:1.6,marginBottom:4}}>{d.desc}</p>
              <span style={{fontSize:11,fontFamily:'IBM Plex Mono',color:'var(--muted)'}}>Bereich: {d.range}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Schritt 3 */}
      <div style={{marginBottom:'2.5rem'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
          <div style={{width:24,height:24,borderRadius:'50%',background:'var(--ink)',color:'var(--paper)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontFamily:'IBM Plex Mono',flexShrink:0}}>3</div>
          <h2 style={{fontFamily:'Cormorant Garamond',fontSize:'1.6rem',fontWeight:500,color:'var(--ink)'}}>Gesamtscore</h2>
        </div>
        <p style={{fontSize:14,color:'var(--muted)',lineHeight:1.7,marginLeft:34,marginBottom:14}}>
          Die gewichtete Summe aller sechs normalisierten Dimensionen ergibt den finalen
          Fairness-Score zwischen 0 und 100.
        </p>
        <div style={{marginLeft:34,background:'white',border:'1px solid var(--mid)',padding:'1rem 1.25rem',fontFamily:'IBM Plex Mono',fontSize:12,color:'var(--ink)',lineHeight:1.8}}>
          score = Σ (dimension × gewicht) × 100<br/>
          <span style={{color:'var(--muted)'}}>≥ 70 → 🟢 gut versorgt &nbsp;·&nbsp; 45–69 → 🟡 durchschnitt &nbsp;·&nbsp; &lt;45 → 🔴 abgehängt</span>
        </div>
      </div>

      {/* Hinweis */}
      <div style={{background:'#FEF3E2',border:'1px solid #F0DCB8',padding:'1.25rem',borderRadius:2}}>
        <div style={{fontSize:13,fontWeight:600,color:'var(--warn)',marginBottom:6}}>⚠ Aktueller Status: Beispieldaten</div>
        <p style={{fontSize:13,color:'var(--ink)',lineHeight:1.6}}>
          Die aktuellen Werte sind realistische, aber manuell erstellte Beispieldaten (MVP).
          In Phase 2 werden sie durch echte Daten von Destatis GENESIS, dem Breitbandatlas
          der Bundesnetzagentur und OpenStreetMap ersetzt — die Berechnungsmethodik bleibt dabei identisch.
        </p>
      </div>
    </div>
  )
}
