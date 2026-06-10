import { useState, useMemo } from 'react'
import { cityRegions, landRegions, calcFairnessScore } from '../data/regions.js'
import MetricCard from '../components/MetricCard.jsx'
import ScoreRing from '../components/ScoreRing.jsx'

const metricDefs = [
  {
    key: 'internet',
    icon: '🌐',
    title: 'Internetgeschwindigkeit',
    cityFn: m => m.internet.speed + ' Mbit/s',
    landFn: m => m.internet.speed + ' Mbit/s',
    rawFn: m => m.internet.speed,
    max: 280,
  },
  {
    key: 'glasfaser',
    icon: '📡',
    title: 'Glasfaser-Ausbau',
    cityFn: m => m.internet.glasfaser + '%',
    landFn: m => m.internet.glasfaser + '%',
    rawFn: m => m.internet.glasfaser,
    max: 100,
  },
  {
    key: 'oepnv',
    icon: '🚌',
    title: 'Bus-Verbindungen / Tag',
    cityFn: m => m.oepnv.busseProTag,
    landFn: m => m.oepnv.busseProTag,
    rawFn: m => m.oepnv.busseProTag,
    max: 540,
  },
  {
    key: 'aerzte',
    icon: '🏥',
    title: 'Hausärzte / 10.000 Einwohner',
    cityFn: m => m.aerzte.hausaerztePro10k,
    landFn: m => m.aerzte.hausaerztePro10k,
    rawFn: m => m.aerzte.hausaerztePro10k,
    max: 10,
  },
  {
    key: 'klinik',
    icon: '🚑',
    title: 'Entfernung zur nächsten Klinik',
    cityFn: m => m.aerzte.kmZuKlinik + ' km',
    landFn: m => m.aerzte.kmZuKlinik + ' km',
    rawFn: m => Math.max(0, 30 - m.aerzte.kmZuKlinik), // invertiert — näher = besser
    max: 30,
  },
  {
    key: 'miete',
    icon: '🏠',
    title: 'Ø Miete pro m²',
    cityFn: m => m.wohnen.mietePro_m2.toFixed(1) + ' €',
    landFn: m => m.wohnen.mietePro_m2.toFixed(1) + ' €',
    rawFn: m => m.wohnen.mietePro_m2,
    max: 16,
    lowerBetter: true,
  },
]

function GapBadge({ cityScore, landScore }) {
  const gap = cityScore - landScore
  if (gap > 40) return <span className="text-xs px-2.5 py-1 rounded-full bg-red-500/10 text-red-400">Sehr großes Gefälle: +{gap} Punkte</span>
  if (gap > 20) return <span className="text-xs px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400">Mittleres Gefälle: +{gap} Punkte</span>
  return <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400">Geringes Gefälle: +{gap} Punkte</span>
}

export default function Vergleich() {
  const [cityId, setCityId] = useState(cityRegions[0].id)
  const [landId, setLandId] = useState(landRegions[0].id)

  const city = useMemo(() => cityRegions.find(r => r.id === cityId), [cityId])
  const land = useMemo(() => landRegions.find(r => r.id === landId), [landId])
  const cityScore = useMemo(() => calcFairnessScore(city), [city])
  const landScore = useMemo(() => calcFairnessScore(land), [land])

  const internetRatio = Math.round(city.metrics.internet.speed / land.metrics.internet.speed)
  const busRatio = Math.round(city.metrics.oepnv.busseProTag / land.metrics.oepnv.busseProTag)
  const mieteDiff = (city.metrics.wohnen.mietePro_m2 - land.metrics.wohnen.mietePro_m2).toFixed(1)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-zinc-100 mb-2">Direkter Vergleich</h1>
        <p className="text-zinc-500 text-sm">Wähle eine Stadt- und eine Landregion, um sie gegenüberzustellen.</p>
      </div>

      {/* Selector */}
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <div>
          <label className="block text-xs text-zinc-500 mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-city inline-block" />
            Stadtregion
          </label>
          <select
            value={cityId}
            onChange={e => setCityId(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 text-zinc-100 text-sm rounded-lg px-3 py-2.5 focus:border-zinc-500 outline-none"
          >
            {cityRegions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-zinc-500 mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-land inline-block" />
            Landregion
          </label>
          <select
            value={landId}
            onChange={e => setLandId(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 text-zinc-100 text-sm rounded-lg px-3 py-2.5 focus:border-zinc-500 outline-none"
          >
            {landRegions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </div>
      </div>

      {/* Score */}
      <div className="card mb-8">
        <div className="flex flex-wrap items-center justify-around gap-6">
          <ScoreRing score={cityScore} label={city.name} color="city" />
          <div className="text-center">
            <div className="text-xs text-zinc-600 mb-2">Fairness-Score</div>
            <GapBadge cityScore={cityScore} landScore={landScore} />
          </div>
          <ScoreRing score={landScore} label={land.name} color="land" />
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {metricDefs.map(def => (
          <MetricCard
            key={def.key}
            icon={def.icon}
            title={def.title}
            cityName={city.name}
            landName={land.name}
            cityVal={def.cityFn(city.metrics)}
            landVal={def.landFn(land.metrics)}
            cityRaw={def.rawFn(city.metrics)}
            landRaw={def.rawFn(land.metrics)}
            max={def.max}
          />
        ))}
      </div>

      {/* Insights */}
      <div>
        <h2 className="text-sm font-medium text-zinc-400 mb-4">Wichtigste Erkenntnisse</h2>
        <div className="space-y-3">
          <div className="card border-l-2 border-l-blue-500 rounded-l-none">
            <p className="text-sm text-zinc-400 leading-relaxed">
              <span className="text-zinc-200 font-medium">{city.name}</span> hat{' '}
              <span className="text-blue-400 font-medium">{internetRatio}× schnelleres Internet</span> als{' '}
              {land.name}. Für Homeoffice und Digitalisierung ist das ein massiver Nachteil für ländliche Regionen.
            </p>
          </div>
          <div className="card border-l-2 border-l-yellow-500 rounded-l-none">
            <p className="text-sm text-zinc-400 leading-relaxed">
              Im ÖPNV gibt es{' '}
              <span className="text-yellow-400 font-medium">{busRatio}× mehr Verbindungen</span> in{' '}
              {city.name}. Ohne Auto ist das Leben in {land.name} kaum möglich.
            </p>
          </div>
          <div className="card border-l-2 border-l-emerald-500 rounded-l-none">
            <p className="text-sm text-zinc-400 leading-relaxed">
              Wohnen auf dem Land ist deutlich günstiger:{' '}
              <span className="text-emerald-400 font-medium">{mieteDiff} €/m² weniger Miete</span> in{' '}
              {land.name} — ein echter Vorteil für Familien und Pendler.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
